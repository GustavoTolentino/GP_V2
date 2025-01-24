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
import { useNotification } from "@/hooks/useModal";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FaBell } from "react-icons/fa";
import { Separator } from "@radix-ui/react-separator";
import { Alert } from "../ui/alert";
import { IoNotifications, IoNotificationsOffSharp } from "react-icons/io5";

interface INotification {
  id: number;
  title: string;
  description: string;
}

export function Notification() {
  const notificationModal = useNotification();

  const [recentNotifications, setRecentNotifications] = React.useState<
    INotification[]
  >([
    {
      id: 1,
      title: "Exames",
      description: "Seus exames estão prontos para serem visualizados.",
    },
    {
      id: 2,
      title: "Visitas",
      description: "Você tem uma visita marcada para hoje.",
    },
    {
      id: 3,
      title: "Medicamentos",
      description: "Você tem medicamentos para retirar.",
    },
    {
      id: 4,
      title: "Exames",
      description: "Seus exames estão prontos para serem visualizados.",
    },
    {
      id: 5,
      title: "Visitas",
      description: "Você tem uma visita marcada para hoje.",
    },
  ]);

  const handleNotification = () => {
    notificationModal.openModal(true);
  };

  const [notificationCount, setNotificationCount] = React.useState<number>(
    recentNotifications.length
  );
  const [oldNotifications, setOldNotifications] = React.useState<
    INotification[]
  >([]);

  const handleNotificationConfirm = React.useCallback(
    (id: number) => {
      const confirmedNotification = recentNotifications.find(
        (n) => n.id === id
      );

      if (confirmedNotification) {
        setOldNotifications((prev) => [...prev, confirmedNotification]);
        setRecentNotifications((prev) => prev.filter((n) => n.id !== id));
        setNotificationCount((prev) => prev - 1);
      }
    },
    [recentNotifications]
  );

  const deleteNotification = (id: number) => {
    setRecentNotifications(
      recentNotifications.filter((notification) => notification.id !== id)
    );
    setNotificationCount((prev) => prev - 1);
  };

  const markAllAsRead = () => {
    setOldNotifications([...oldNotifications, ...recentNotifications]);
    setRecentNotifications([]);
    setNotificationCount(0);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <Sheet
        open={notificationModal.isModalOpen}
        onOpenChange={notificationModal.openModal}
      >
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative flex items-center justify-center dark:bg-main-dark bg-white border border-main-orange dark:border dark:border-white"
            onClick={handleNotification}
          >
            <FaBell className="h-[1.2rem] w-[1.2rem] text-main-orange dark:text-white" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {notificationCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white dark:bg-main-dark text-zinc-600 dark:text-zinc-400 rounded-l-2xl">
          <SheetHeader className="bg-white dark:bg-main-dark">
            <SheetTitle className="text-main-orange dark:text-white text-xl flex items-center">
              <span>Notificações</span>
              <span
                className="text-xs text-main-orange hover:text-black dark:hover:text-white cursor-pointer ml-10"
                onClick={markAllAsRead}
              >
                Marcar todos como lidos
              </span>
            </SheetTitle>
            <SheetDescription className="hidden" />
          </SheetHeader>

          <Separator className="my-4 bg-main-orange dark:bg-main-orange" />

          <div className="flex flex-col h-[calc(100vh-12rem)] px-2 overflow-y-auto scrollbar-custom">
            <div className="text-sm w-full pb-2 mb-2">Novas</div>
            <div className="grid grid-cols-1 gap-2">
              {recentNotifications.length === 0 ? (
                <div className="text-sm text-center">
                  Nenhuma notificação recente
                </div>
              ) : (
                recentNotifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    icon={<IoNotifications className="h-6 w-6" />}
                    title={notification.title}
                    description={notification.description}
                    onConfirm={() => handleNotificationConfirm(notification.id)}
                    onCancel={() => deleteNotification(notification.id)}
                  />
                ))
              )}
            </div>

            <Separator className="my-5 bg-main-orange dark:bg-main-orange" />

            <div className="text-sm w-full pb-2">Lidas</div>
            <div className="grid grid-cols-1 gap-2 mb-5">
              {oldNotifications.length === 0 ? (
                <div className="text-sm text-center">
                  Nenhuma notificação lida
                </div>
              ) : (
                oldNotifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    icon={<IoNotificationsOffSharp className="h-6 w-6" />}
                    title={notification.title}
                    description={notification.description}
                    hideCancel
                    hideConfirm
                  />
                ))
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <span>Notificações</span>
    </div>
  );
}
