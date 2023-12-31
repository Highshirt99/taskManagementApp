import { KanbanContext } from "@/utils/Providers ";
import React from "react";
import { useContext } from "react";

const ConfirmDelete = ({
  handleDeleteBoard,
  setShowConfirmBox,
  setShowSettings,
}) => {
  const { selectedBoard } = useContext(KanbanContext);
  return (
    <div
      className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center
  items-center fixed inset-0 z-[50]
   bg-black bg-opacity-10 scrollbar-hide"
    >
      <div className="dark:bg-gray-dark flex flex-col gap-3 dark:text-white bg-white lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md dark:border absolute top-[10%]">
        <h1 className="text-red font-bold">Delete this board?</h1>
        <p className="text-[12px] text-gray-light">
          Are you sure you want to delete the{" "}
          <span className="text-red font-bold">{selectedBoard.name}</span> board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex items-center mt-3 justify-center gap-8">
          <button
            className="bg-red p-1 hover:bg-red-light text-white rounded-[30px]  w-[150px]"
            onClick={handleDeleteBoard}
          >
            Delete
          </button>
          <button
            className="hover:bg-purple-light hover:text-white text-purple-dark p-1 bg-blue-lightest rounded-[30px]  w-[150px]"
            onClick={() => setShowConfirmBox(false) & setShowSettings(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
