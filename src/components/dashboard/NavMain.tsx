import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { routes } from "@/helpers/routes";

interface NavItem {
  route: string;
  text: string;
  icon?: IconType;
  isActive?: boolean;
  subRoutes?: NavItem[];
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const auth = useSession();
  const role = auth.role;
  const [currentRoute, setCurrentRoute] = useState("");

  const isActiveRoute = (route: string) => {
    return pathname.startsWith(route);
  };

  useEffect(() => {
    if (role !== "") {
      let currentPath = "";
      let findRoute = routes[role].find((x) => `${x.route}` === pathname);

      if (pathname.includes("profile")) {
        setCurrentRoute("Meus Dados");
        return;
      }

      if (!findRoute) {
        routes[role].forEach((route) => {
          if (route.subRoutes) {
            const findSubRoute = route.subRoutes.find(
              (subRoute: any) => `${subRoute.route}` === pathname
            );
            if (findSubRoute) {
              currentPath = `${route.text} / ${findSubRoute.text}`;
              findRoute = findSubRoute;
            }
          }
        });
      } else {
        currentPath = findRoute.text;
      }

      if (currentPath) {
        setCurrentRoute(currentPath);
      } else {
        setCurrentRoute("");
      }
    }
  }, [pathname, role]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.route}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible my-2"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.text}
                  className={
                    isActiveRoute(item.route) ? "bg-main-blue text-white" : ""
                  }
                >
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.text}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.subRoutes && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subRoutes.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.route}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.route}
                            className={
                              isActiveRoute(subItem.route)
                                ? "bg-main-blue text-white"
                                : ""
                            }
                          >
                            <span>{subItem.text}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
