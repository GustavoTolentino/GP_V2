"use client";

import { PasswordChange } from "@/components/PasswordChange";
import { useChangePassword } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { validate } from "@/services/standard";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const auth = useSession();
  const changePassword = useChangePassword();

  useEffect(() => {
    if (auth.isLogged) {
      validate().then((res) => {
        if (!res.isValid) {
          changePassword.openModal(true);
        }
      });
    }
  }, [auth.isLogged]);

  return (
    <div className="p-2">
      teste
      <Dialog
        open={changePassword.isModalOpen}
        onOpenChange={changePassword.openModal}
      >
        <PasswordChange />
      </Dialog>
    </div>
  );
};

export default Page;
