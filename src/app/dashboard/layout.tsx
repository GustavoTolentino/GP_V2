"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import api from "@/services/api";
import { routes } from "@/helpers/routes";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/dashboard/SideBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ReactNode } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import LoadingPage from "@/components/custom/loading-page";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role, isLogged, token } = useSession();
  const pathname = usePathname(); // Usando usePathname para detectar mudanças na URL
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { text: string; link: string }[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isLogged) {
      setIsLoading(false);
      router.push("/");
    } else {
      if (token !== "" && !api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }
      setIsLoading(false);
    }
  }, [isLogged, token, router, pathname]);

  useEffect(() => {
    if (isLogged && role && pathname === "/" && isClient) {
      router.push(routes[role][0].route);
    }
  }, [pathname, isLogged, role, router, isClient]);

  useEffect(() => {
    if (isClient) {
      const pathSegments = pathname.split("/").filter(Boolean);
      const breadcrumbData: { text: string; link: string }[] = [];

      let currentRoute = "";
      let lastAddedRoute = "";

      pathSegments.forEach((segment, index) => {
        const route = routes[role]?.find((route) =>
          route.route.includes(segment)
        );

        if (route && route.route !== lastAddedRoute) {
          currentRoute = route.route;
          breadcrumbData.push({
            text: route.text,
            link: currentRoute,
          });
          lastAddedRoute = route.route;

          if (route.subRoutes) {
            const subRoute = route.subRoutes.find(
              (sub: { route: string | string[] }) =>
                sub.route.includes(pathSegments[index + 1])
            );
            if (subRoute && subRoute.route !== lastAddedRoute) {
              breadcrumbData.push({
                text: subRoute.text,
                link: subRoute.route,
              });
              lastAddedRoute = subRoute.route;
            }
          }
        }
      });

      setBreadcrumbItems(breadcrumbData);
    }
  }, [pathname, role, isClient]);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isClient) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex w-full h-screen md:overflow-hidden md:bg-main-blue py-2">
          <AppSidebar />

          <div className="w-full rounded-l-xl bg-background dark:bg-main-dark overflow-auto">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList className="flex items-center space-x-2">
                  {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem key={index} className="flex items-center">
                      <BreadcrumbLink>{item.text}</BreadcrumbLink>
                      {index < breadcrumbItems.length - 1 && (
                        <BreadcrumbSeparator className="mx-1" />
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            <div className="px-4 lg:px-10 py-4 lg:py-8 w-full h-full">
              {isLoading ? (
                <>
                  <LoadingPage />
                </>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
