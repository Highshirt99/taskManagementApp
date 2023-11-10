"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import dark from "@/assets/icon-dark-theme.svg ";
import light from "@/assets/icon-light-theme.svg ";
import hide from "@/assets/icon-hide-sidebar.svg ";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "@/assets/icon-board.svg ";
import { KanbanContext } from "@/utils/Providers ";
import { selectBoard } from "@/utils/redux/slice ";
import NewBoard from "./Modals/NewBoard";

const Sidebar = () => {
  let boards = useSelector((state) => state.kanban.boards.boards);
  let selected = useSelector((state) => state.kanban.selectedBoard);
  const dispatch = useDispatch();

  const {
    theme,
    setTheme,
    selectedBoard,
    setSelectedBoard,
    hideSidebar,
    setHideSidebar,
    newBoardModalOpen,
    setNewBoardModalOpen
  } = useContext(KanbanContext);

  useEffect(() => {
    setSelectedBoard(selected);
  }, [selected]);
 

  return (
    <div
      className={`${
        hideSidebar ? "w-0" : "lg:w-[15%] w-[50%] md:w-[30%]"
      } ease-in-out duration-500
    relative min-h-screen`}
    >
      <div className=" py-6 ml-6 text-purple-dark text-[10px] font-bold dark:text-gray-light">
        <h4>ALL BOARDS ({boards.length})</h4>
      </div>

      <div className="flex flex-col gap-2 font-bold lg:mr-3 dark:text-gray-light">
        {boards.map((board, index) => (
          <div
            onClick={() => dispatch(selectBoard(board))}
            className={`${
              selectedBoard.name === board.name
                ? "bg-purple-dark rounded-r-full text-white"
                : "text-purple-dark dark:text-gray-light"
            } flex text-[10px] lg:text-[12px] items-center gap-2 p-2 rounded-r-full cursor-pointer hover:bg-purple-light hover:text-white dark:hover:text-white`}
            key={index}
          >
            <Image src={boardIcon} alt="board" className="w-[10px]" />
            <h4 className="cursor-pointer">{board.name}</h4>
          </div>
        ))}
      </div>

      <div 
      onClick={() => setNewBoardModalOpen(true)}
      className="flex text-[10px]  dark:hover:text-white lg:text-[12px] mt-2 text-purple-dark  dark:text-gray-light font-bold items-center gap-2 p-1 lg:mr-2 rounded-r-full cursor-pointer hover:bg-purple-light hover:text-white">
        <Image src={boardIcon} alt="board" className="w-[10px] ml-1" />
        <h4 className="flex items-center gap-1 mb-1 cursor-pointer">
          <span className="text-[18px]">+</span> New Board
        </h4>
      </div>
      <div className="absolute flex items-center gap-3 p-2 ml-4  rounded-md justify-center lg:w-[120px] w-[80%] bg-blue-lighter  bottom-28 dark:bg-gray-darker">
        <Image alt="light" src={light} className="w-[12px]" />

        <div
          className="rounded-full relative bg-purple-dark w-[30px] h-[15px] cursor-pointer"
          onClick={(e) =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <span
            className={`${
              theme === "light" ? "left-1 " : "left-[15px]"
            } transition-all duration-500 ease-in-out  bg-white w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] absolute rounded-full top-[3px] lg:top-[2.3px]  cursor-pointer`}
            onClick={(e) =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          ></span>
        </div>
        <Image alt="dark" src={dark} className="w-[12px]" />
      </div>

      <div
        onClick={() => setHideSidebar(true)}
        className="absolute 
         dark:text-gray-light ml-4 text-purple-dark flex items-center gap-2   bottom-20 text-[10px] cursor-pointer"
      >
        <Image
          alt="hide"
          src={hide}
          className={`${hideSidebar ? "mt-1 ml-1" : ""} w-[12px]`}
        />
        <span>Hide sidebar</span>
      </div>
      {newBoardModalOpen && <NewBoard/>}
    </div>
  );
};

export default Sidebar;
