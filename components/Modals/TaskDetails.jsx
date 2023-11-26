import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import close from "@/assets/icon-cross.svg ";
import check from "@/assets/icon-check.svg ";
import settings from "@/assets/icon-vertical-ellipsis.svg ";
import { changeStatus, markCompleted } from "@/utils/redux/slice ";
import { useDispatch } from "react-redux";
import { KanbanContext } from "@/utils/Providers ";
import TaskSettings from "../TaskSettings";

const TaskDetails = ({ setShowTaskDetails }) => {
  const { taskId, selectedBoard } = useContext(KanbanContext);
  const [task, setTask] = useState(null);
  const [showTaskSettings, setShowTaskSettings] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    selectedBoard.columns.forEach((column) => {
      column.tasks.find((task) => {
        if (task.id === taskId) {
          setTask(task);
        }
      });
    });
  }, [selectedBoard]);

  const checkIsCompleted = () => {
    let completedSubtasks = [];
    task?.subtasks?.forEach((subtask) => {
      if (subtask.isCompleted) {
        completedSubtasks.push(subtask);
      }
    });
    return completedSubtasks;
  };

  const markSubtaskCompleted = (subtask) => {
    dispatch(markCompleted(subtask));
    dispatch(changeStatus(taskId));
  };

  const setDefaultValue = () => {
    selectedBoard.columns.forEach((column) => {
      if (column.name === task?.status) {
        return task?.status;
      }
    });
  };
  return (
    <div
      className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center
items-center fixed inset-0 z-[100]
 bg-black bg-opacity-10 scrollbar-hide"
    >
      <div className="bg-white min-h-[250px] dark:bg-gray-dark lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md   absolute top-8">
        <Image
          src={close}
          alt="close"
          className="cursor-pointer w-[10px] absolute top-3 right-3"
          onClick={() => setShowTaskDetails(false)}
        />

        <h1 className="font-[600] w-[80%] dark:text-white text-[14px] mt-4">
          {task?.title}
        </h1>

        <Image
          className="cursor-pointer w-[4px] absolute right-4 top-10"
          src={settings}
          alt="settings"
          onClick={() => setShowTaskSettings(!showTaskSettings)}
        />
        <p className="text-gray-400 w-[80%] my-4 text-[10px]">
          {task?.description}
        </p>

        <div className="text-gray-500">
          <p>
            {`Substasks ( ${checkIsCompleted().length} of ${
              task?.subtasks?.length
            }
            )`}
          </p>
          {task?.subtasks.map((subtask, index) => (
            <div
              key={index}
              onClick={() => markSubtaskCompleted(subtask)}
              className={` ${
                subtask.isCompleted ? "bg-blue-lightest" : "bg-blue-lighter"
              } ease-in-out cursor-pointer duration-300 flex hover:text-black hover:bg-purple-light items-center gap-4 p-2 mt-3 rounded-md`}
            >
              <div className="border w-[15px] relative h-[15px] flex  rounded-sm cursor-pointer">
                {subtask.isCompleted && (
                  <div className="flex items-center justify-center w-[15px] h-[15px] rounded-sm  bg-purple-dark">
                    <Image src={check} alt="check" />
                  </div>
                )}
              </div>
              <span
                className={`${
                  subtask.isCompleted ? "line-through" : ""
                } text-[10px]`}
              >
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-gray-500">Current Status</p>
        <select
          name=""
          id=""
          defaultValue={setDefaultValue()}
          className="w-full p-2 mt-3 border rounded-md outline-none cursor-pointer border-purple-light"
        >
          {selectedBoard?.columns?.map((column, index) => (
            <option
              key={index}
              // selected={column.name === task?.status }
            >
              {column.name}
            </option>
          ))}
        </select>
        <TaskSettings
          showTaskSettings={showTaskSettings}
          setShowTaskSettings={setShowTaskSettings}
          task={task}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
