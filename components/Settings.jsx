import React, { useContext } from "react";
import { KanbanContext } from "@/utils/Providers ";
import { deleteBoard } from "@/utils/redux/slice ";
import { useDispatch } from "react-redux";
import ConfirmDelete from "./Modals/confirmDelete";
import { useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const {
    setShowSettings,
    showSettings,
    setShowEditBoardModal,
    selectedBoard,
  } = useContext(KanbanContext);

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(selectedBoard.id));
    setShowConfirmBox(false)
    setShowSettings(false);
    toast.success("Board Deleted successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <>
      <div
        className={`${
          showSettings ? "opacity-100  h-[80px]" : "opacity-0 h-0"
        } bg-white z-[100000]
      text-center p-3 rounded-md text-[12px] w-[150px] dark:text-gray-500 dark:bg-black transition-all duration-500 border top-12
       right-4 shadow-sm absolute`}
      >
        <p
          onClick={() => {
            setShowEditBoardModal(true);
          
          }}
          className="text-gray-light w-full mb-2 hover:font-bold cursor-pointer"
        >
          Edit board
        </p>

        <p
          onClick={() => setShowConfirmBox(true) &  setShowSettings(false)}
          className="text-red cursor-pointer w-full hover:font-bold mt-4"
        >
          Delete board
        </p>
      </div>
      {showConfirmBox && 
      <ConfirmDelete setShowSettings = {setShowSettings} handleDeleteBoard = {handleDeleteBoard} setShowConfirmBox={setShowConfirmBox}/>}
    </>
  );
};

export default Settings;
