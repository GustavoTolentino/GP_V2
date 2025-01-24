"use client";

import LoadingPage from "@/components/custom/loading-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { routes } from "@/helpers/routes";
import useSession from "@/hooks/useSession";
import api from "@/services/api";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const pathname = usePathname();
  const { role, isLogged, token } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLogged) {
      if (token !== "" && !api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      role && router.push(routes[role][0].route);
    } else {
      setIsLoading(false);
    }

    if (pathname === "/_not-found") {
      router.push("/");
    }
  }, [routes, role]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="w-full h-screen grid grid-cols-1 xl:grid-cols-2 bg-[url('/bg1.webp')] bg-center bg-no-repeat bg-cover py-2 xl:py-8 xl:px-20">
        <div className="flex items-center justify-center xl:col-span-2 xl:justify-end">
          <ScrollArea className="w-full md:w-[70%] lg:w-[50%] xl:w-[30%] bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 md:p-8 mx-4 max-h-[90vh] md:max-h-[85vh] border-b-0">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/logo-blue.png"
                width={300}
                height={80}
                alt="logo"
                className="mb-16"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
