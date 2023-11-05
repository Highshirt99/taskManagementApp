"use client";
import React, { useContext, useEffect } from "react";
import Header from "@/components/Header ";
import Image from "next/image";
import show from "@/assets/icon-show-sidebar.svg ";
import { useSelector } from "react-redux";
import { KanbanContext } from "@/utils/Providers ";
import add from "@/assets/icon-add-task-mobile.svg ";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Template = () => {
  const boards = useSelector((state) => state.kanban.boards.boards);
  const { selectedBoard, newTaskModalOpen, hideSidebar, setHideSidebar } =
    useContext(KanbanContext);

  const randomColorByIndex = (index) => {
    const colors = [
      "#EB5757",
      "#F2C94C",
      "#67E2AE",
      "#8471F2",
      "#F2994A",
      "#49C4E5",
      "#F2F2F2",
      "#333333",
    ];
    return colors[index];
  };

  const checkCompleted = (task) => {
    let completedSubtasks = [];
    task.subtasks.forEach((item) => {
      if (item.isCompleted) {
        completedSubtasks.push(item);
      }
    });
    return completedSubtasks;
  };
  return (
    <div
      className={` ${
        hideSidebar ? "w-full" : "lg:w-[85%] w-[80%] "
      } min-h-screen
      border-l dark:border-l-gray-700 relative font-bold text-[10px] lg:text-[12px]  p-4  bg-blue-lighter dark:bg-gray-darker`}
    >
    

      <div className="flex flex-justify-start flex-wrap gap-8">
        {selectedBoard?.columns?.map((column, index) => (
          <div
            key={index}
            className="flex  flex-col self-start gap-1 w-[200px] md:w-[250px] lg:w-[250px] h-auto"
          >
            <div className="flex items-center gap-1">
              <div
                className="rounded-[50%] w-[10px] h-[10px]"
                style={{
                  backgroundColor: randomColorByIndex(index),
                }}
              ></div>
              <p className="text-purple-dark dark:text-gray-500">
                {column.name}
              </p>
              <span className="text-purple-dark dark:text-gray-500">
                ({column.tasks.length})
              </span>
            </div>

            <div className="flex flex-col lg:gap-3 mt-8">
              {column.tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md p-2 mb-4 dark:bg-gray-dark  min-h-[70px] rounded-md"
                >
                  <p className=" dark:text-white text-[12px]">{task.title}</p>
                  <p className="text-gray-500 text-[10px] mt-3">
                    {`${checkCompleted(task).length} of ${
                      task.subtasks?.length
                    }`}{" "}
                    subtasks
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => setHideSidebar(false)}
        className={` ${
          hideSidebar ? "block" : "hidden"
        } bg-purple-dark p-1  cursor-pointer absolute rounded-r-full w-[30px] h-[25px] left-0 bottom-24`}
      >
        <Image src={show} alt="eye" className="mt-1" />
      </div>

      <div
        className="bg-gray-light text-white lg:h-[70vh] md:w-[250px] w-[200px] lg:w-[120px] flex items-center
      justify-center rounded-md lg:absolute h-[60px]  right-4 top-16 cursor-pointer gap-2"
      >
        <Image src={add} alt="add" />
        <span>New Column</span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Template;
