import React, { useContext } from "react";
import Image from "next/image";
import logo_light from "@/assets/logo-light.svg ";
import logo_dark from "@/assets/logo-dark.svg ";
import { KanbanContext } from "@/utils/Providers ";

const Logo = () => {
  const {theme} = useContext(KanbanContext)
  return (
    <div className="py-6 lg:w-[15.1%] w-[31.4%]  border-r  dark:border-r-gray-700">
      <Image
        src={theme === "dark" ? logo_light : logo_dark}
        width={80}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
