"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative flex items-center justify-center dark:bg-main-dark bg-white border border-main-orange dark:border dark:border-white"
        >
          <Sun className="absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-transform transform dark:rotate-90 dark:scale-0 text-main-orange " />
          <Moon className="absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-transform transform rotate-90 scale-0 dark:rotate-0 dark:scale-100 dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
