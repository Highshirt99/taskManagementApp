import React, { useContext } from "react";
import Image from "next/image";
import logo_light from "@/assets/logo-light.svg ";
import logo_dark from "@/assets/logo-dark.svg ";
import logo_mobile from "@/assets/logo-mobile.svg ";
import { KanbanContext } from "@/utils/Providers ";

const Logo = () => {
  const {theme} = useContext(KanbanContext)
  return (
    <div className="py-6 lg:w-[15.1%] md:w-[27.8%] md:border-r lg:border-r  dark:border-r-gray-700">
      <Image
        src={theme === "dark" ? logo_light : logo_dark}
        width={80}
        alt="logo"
        className="hidden lg:block md:block"
      />
      <Image src = {logo_mobile} alt="logo" className="lg:hidden md:hidden" />
    </div>
  );
};

export default Logo;
