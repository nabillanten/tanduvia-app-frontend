import {LoginForm} from "@/components/login-form";
import {GalleryVerticalEnd} from "lucide-react";
import Image from "next/image";
import React from "react";
import Logo from "@/public/images/logo.png";
import Link from "next/link";

type Props = object;

const StaffLoginPage = (props: Props) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="#"
          className="flex flex-col items-center self-center font-bold text-[#0366a9] text-sm">
          <figure className="w-24">
            <Image src={Logo} alt="Tanduvia Logo" />
          </figure>
          <span> Posyandu Digital</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default StaffLoginPage;
