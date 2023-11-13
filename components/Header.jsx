"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import settings from "@/assets/icon-vertical-ellipsis.svg ";
import add from "@/assets/icon-add-task-mobile.svg ";
import Logo from "./Logo";
import { KanbanContext } from "@/utils/Providers ";
import NewTask from "./Modals/NewTask";
import Settings from "./Settings";
import EditBoard from "./Modals/EditBoard";
import arrow_down from "@/assets/icon-chevron-down.svg ";
import arrow_up from "@/assets/icon-chevron-up.svg ";


const Header = () => {
  const {
    setNewTaskModalOpen,
    newTaskModalOpen,
    showEditBoardModal,
    showSettings,
    setShowSettings,
    showTopBar,
    setShowTopBar,
    selectedBoard,
  } = useContext(KanbanContext);

  return (
    <header className="relative flex items-center justify-around md:justify-between lg:justify-between w-full pl-2 pr-4 border-b md:pr-8 lg:pr-12 dark:border-b-gray-700 dark:bg-gray-dark">
      <Logo />
      <div className="flex items-center gap-3">
        <h1 className="lg:text-[14px] font-bold right-4 relative lg:right-[20rem] dark:text-white">
         {selectedBoard.name}
        </h1>
        <Image
          src={showTopBar ? arrow_up : arrow_down}
          alt={showTopBar ? "arrow-up" : "arrow-down"}
          onClick={() => setShowTopBar(!showTopBar)}
          className="cursor-pointer lg:hidden md:hidden"
        />
      </div>
      <div className="flex items-center gap-6 lg:gap-8">
        <button
          onClick={() => setNewTaskModalOpen(true)}
          className="gap-1 p-1 h-[30px] w-[30px] items-center justify-center md:w-[120px] md:rounded-full lg:w-[120px] flex text-white rounded-[50%] lg:rounded-full  text-[12px] bg-purple-dark"
        >
          <Image alt="add" src={add} className="w-[10px]" />
          <span className="hidden lg:block md:block">Add New Task</span>
        </button>
        <Image
          className="cursor-pointer"
          src={settings}
          alt="settings"
          onClick={() => setShowSettings(!showSettings)}
        />
      </div>
      {/* {newTaskModalOpen && <NewTask />}
      {showEditBoardModal && <EditBoard />} */}
      <Settings />
    </header>
  );
};

export default Header;
