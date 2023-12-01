import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import ConfirmDeleteTask from "./Modals/ConfirmDeleteTask";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteTask } from "@/utils/redux/slice ";
import { KanbanContext } from "@/utils/Providers ";

const TaskSettings = ({ showTaskSettings, setShowTaskSettings, task }) => {
  const dispatch = useDispatch();
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const { setShowTaskDetails, setEditTaskModalOpen } = useContext(KanbanContext);

  const handleDeleteTask = () => {
    dispatch(deleteTask(task?.id));
    setShowConfirmBox(false);
    setShowTaskSettings(false);
    toast.success("Board deleted successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setShowTaskDetails(false);
  };

  return (
    <>
      <div
        className={`${
          showTaskSettings ? "opacity-100  h-[80px]" : "opacity-0 h-0"
        } bg-white z-[100000]
      text-center p-3 rounded-md text-[12px] w-[150px] dark:text-gray-500 dark:bg-gray-dark transition-all duration-500 border top-16
       right-4 shadow-sm absolute`}
      >
        <p
          onClick={() => {
            setEditTaskModalOpen(true);
            setShowTaskSettings(false);
            setShowTaskDetails(false);  
          }}
          className="w-full mb-2 cursor-pointer text-gray-light hover:font-bold"
        >
          Edit task
        </p>

        <p
          onClick={() => setShowTaskSettings(false) & setShowConfirmBox(true)}
          className="w-full mt-4 cursor-pointer text-red hover:font-bold"
        >
          Delete task
        </p>
      </div>
      {showConfirmBox && (
        <ConfirmDeleteTask
          setShowTaskSettings={setShowTaskSettings}
          handleDeleteTask={handleDeleteTask}
          setShowConfirmBox={setShowConfirmBox}
          task={task}
        />
      )}
    </>
  );
};

export default TaskSettings;
