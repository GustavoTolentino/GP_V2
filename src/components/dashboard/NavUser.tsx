"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import Link from "next/link";
import { useTheme } from "next-themes";
import api from "@/services/api";
import { ModeToggle } from "../custom/Toggle-theme";
import { Notification } from "../custom/Notification";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface NavUserProps {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const auth = useSession();
  const { theme, setTheme } = useTheme();

  const email = auth.email;
  const name = auth.name;
  const [avatar, setAvatar] = useState<string>(auth.imageBase64 || "/user.jpg");

  function handleLogout() {
    if (theme !== "light") {
      setTheme("light");
    }
    router.push("/");
    auth.onLogout();
    api.defaults.headers.Authorization = "";
  }

  function handleNavigation(route: string) {
    router.push(route);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        auth.setImageBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedAvatar = auth.imageBase64;
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 text-left text-sm p-2">
                  {/* Torna o Avatar clicável */}
                  <div
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    className="cursor-pointer"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={avatar} alt={name} />
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <DropdownMenuSeparator />
                <div className="flex gap-2 items-center p-2">
                  <ModeToggle />
                  <span>Tema</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Notification />
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <div
                  className="p-2"
                  onClick={() => handleNavigation(`/dashboard/profile`)}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/dashboard/profile`} className="flex gap-2">
                      <BadgeCheck
                        size={24}
                        className="text-main-orange dark:text-white"
                      />
                      Meus Dados
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className="p-2" onClick={handleLogout}>
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                  <LogOut
                    size={24}
                    className="text-main-orange dark:text-white"
                  />
                  Log out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
