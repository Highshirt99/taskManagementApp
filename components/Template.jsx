"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import show from "@/assets/icon-show-sidebar.svg ";
import { useSelector, useDispatch } from "react-redux";
import { KanbanContext } from "@/utils/Providers ";
import add from "@/assets/icon-add-task-mobile.svg ";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewBoard from "./Modals/NewBoard";
import NewTask from "./Modals/NewTask";
import EditBoard from "./Modals/EditBoard";
import TaskDetails from "./Modals/TaskDetails";
import { changeStatus } from "@/utils/redux/slice ";

const Template = () => {
  let boards = useSelector((state) => state.kanban.boards.boards);
  const dispatch = useDispatch();

  const {
    selectedBoard,
    hideSidebar,
    setSelectedBoard,
    setHideSidebar,
    setShowEditBoardModal,
    newBoardModalOpen,
    newTaskModalOpen,
    showEditBoardModal,
    showTaskDetails,
    setShowTaskDetails,
    setTaskId,
  } = useContext(KanbanContext);

  useEffect(() => {
    boards?.forEach((board) => {
      if (board.id === selectedBoard.id) {
        setSelectedBoard(board);
      }
    });
  }, [boards]);

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
        hideSidebar ? "w-full" : "lg:w-[85%] md:w-[80%] w-[100%] "
      } min-h-screen
      border-l dark:border-l-gray-700 relative font-bold text-[10px] lg:text-[12px]  p-4  bg-blue-lighter dark:bg-gray-darker`}
    >
      <div className="flex flex-col gap-8 lg:flex-row md:flex-row md:flex-wrap">
        {selectedBoard?.columns?.map((column, index) => (
          <div
            key={index}
            className="flex flex-col lg:mx-0 md:mx-0 mx-auto md:self-start lg:self-start gap-1 w-[90%] md:w-[250px] lg:w-[250px] h-auto"
          >
            <div className="flex items-center gap-1">
              <div
                className="rounded-[50%] w-[10px] h-[10px]"
                style={{
                  backgroundColor: randomColorByIndex(index),
                }}
              ></div>
              <p className="text-purple-dark uppercase tracking-[1px] dark:text-gray-500">
                {column.name}
              </p>
              <span className="text-purple-dark dark:text-gray-500">
                ({column.tasks.length})
              </span>
            </div>

            <div className="flex flex-col mt-2 md:mt-6 lg:mt-8 lg:gap-3">
              {column.tasks.map((task, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setShowTaskDetails(true);
                    setTaskId(task.id);
                    dispatch(changeStatus(task.id));
                  }}
                  className="bg-white shadow-md cursor-grab p-2 mb-4 dark:bg-gray-dark  min-h-[70px] rounded-md"
                >
                  <p className="dark:text-white text-[12px]">{task.title}</p>
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
        className="bg-gray-light mx-auto text-white lg:h-[70vh] md:w-[250px] w-[90%] lg:w-[120px] flex items-center
      justify-center rounded-md lg:absolute h-[60px]   right-4 top-16 cursor-pointer gap-2"
        onClick={() => {
          setShowEditBoardModal(true);
        }}
      >
        <Image src={add} alt="add" />
        <span>New Column</span>
      </div>
      {newBoardModalOpen && <NewBoard />}
      {newTaskModalOpen && <NewTask />}
      {showEditBoardModal && <EditBoard />}
      {showTaskDetails && (
        <TaskDetails setShowTaskDetails={setShowTaskDetails} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Template;
