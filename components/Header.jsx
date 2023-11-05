"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import settings from "@/assets/icon-vertical-ellipsis.svg ";
import add from "@/assets/icon-add-task-mobile.svg ";
import Logo from "./Logo";
import { KanbanContext } from "@/utils/Providers ";
import NewTask from "./Modals/NewTask";

const Header = () => {
  const {setNewTaskModalOpen,newTaskModalOpen} = useContext(KanbanContext)
  return (
    <header className="flex items-center justify-between w-full pl-2 border-b lg:pr-12 dark:border-b-gray-700 dark:bg-gray-dark">
      <Logo />

      <h1 className="lg:text-[14px] font-bold right-4 relative lg:right-[20rem] dark:text-white">
        Platform Launch
      </h1>
      <div className="flex items-center gap-6 lg:gap-8">
        <button onClick={() => setNewTaskModalOpen(true)}  className="gap-1 p-1 h-[30px] w-[30px] items-center justify-center lg:w-[120px] flex text-white rounded-[50%] lg:rounded-full  text-[12px] bg-purple-dark">
          <Image alt="add" src={add} className="w-[10px]"  />
          <span className="hidden lg:block" >Add New Task</span>
        </button>
        <Image className="cursor-pointer" src={settings} alt="settings" />
      </div>
      {
        newTaskModalOpen && <NewTask/>
      }
    </header>
  );
};

export default Header;
