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


const TopBar = () => {
  let boards = useSelector((state) => state.kanban.boards.boards);
  let selected = useSelector((state) => state.kanban.selectedBoard);
  const dispatch = useDispatch();

  const {
    theme,
    setTheme,
    selectedBoard,
    setSelectedBoard,
    setNewBoardModalOpen,
    setShowTopBar,
    showTopBar
  } = useContext(KanbanContext);

  useEffect(() => {
    setSelectedBoard(selected);
  }, [selected]);

  return (
    <div className={` ${showTopBar ? " opacity-100 h-[300px]" : "opacity-0 h-0"} ease-in-out duration-500 z-[100000] w-[70%]  top-[32%] fixed left-1/2 border -translate-y-1/2 -translate-x-1/2 mx-auto bg-white shadow-sm
     dark:bg-gray-dark p-4 rounded-md`}>
      {" "}
      <div className=" text-purple-dark text-[10px] font-bold dark:text-gray-light">
        <h4 className="mb-4 ml-2">ALL BOARDS ({boards.length})</h4>
        <div className="flex flex-col gap-2 font-bold lg:mr-3 dark:text-gray-light">
        {boards.map((board, index) => (
          <div
            onClick={() => dispatch(selectBoard(board)) & setShowTopBar(false)}
            className={`${
              selectedBoard.name === board.name
                ? "bg-purple-dark rounded-r-full text-white"
                : "text-purple-dark dark:text-gray-light"
            } flex text-[10px]  items-center gap-2 p-2 rounded-r-full cursor-pointer hover:bg-purple-light hover:text-white dark:hover:text-white`}
            key={index}
          >
            <Image src={boardIcon} alt="board" className="w-[10px]" />
            <h4 className="cursor-pointer">{board.name}</h4>
          </div>
        ))}
      </div>

      <div 
      onClick={() => setNewBoardModalOpen(true) & setShowTopBar(false) }
      className="flex text-[10px]  dark:hover:text-white mt-2 mb-4 md:mb-0 text-purple-dark  dark:text-gray-light font-bold items-center gap-2 p-1 rounded-r-full cursor-pointer hover:bg-purple-light hover:text-white">
        <Image src={boardIcon} alt="board" className="w-[10px] ml-1" />
        <h4 className="flex items-center gap-1 mb-1 cursor-pointer">
          <span className="text-[18px]">+</span> New Board
        </h4>
      </div>
      <div className="lg:absolute md:absolute flex items-center gap-3 p-2 ml-4  rounded-md justify-center lg:w-[120px] w-[80%] bg-blue-lighter  bottom-28 dark:bg-gray-darker">
        <Image alt="light" src={light} className="w-[12px]" />

        <div
          className="rounded-full relative bg-purple-dark w-[30px] h-[15px] cursor-pointer"
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <span
            className={`${
              theme === "light" ? "left-1 " : "left-[15px]"
            } transition-all duration-500 ease-in-out  bg-white w-[8px] h-[8px]  absolute rounded-full top-[3px]  cursor-pointer`}
            onClick={(e) =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          ></span>
        </div>
        <Image alt="dark" src={dark} className="w-[12px]" />
      </div>

      </div>

    </div>
  );
};

export default TopBar;
