"use client";

import * as React from "react";
import {
  AudioWaveform,
  GalleryVerticalEnd,
  Command,
  LifeBuoy,
  Send,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { routes } from "@/helpers/routes";
import Image from "next/image";
import { NavSecondary } from "./NavSecondary";

const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "https://chamados.viveo.com.br/tas/public/login/form",
      icon: LifeBuoy,
    },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: Send,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navItems = Object.values(routes).flat();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-center p-2">
          <Image
            src={`/Logo.svg`}
            width={200}
            height={200}
            alt="logo"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
