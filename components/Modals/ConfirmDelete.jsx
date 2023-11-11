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
      <div className="dark:bg-gray-dark flex flex-col gap-12 dark:text-white bg-white lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md dark:border absolute top-[10%]">
        <p>
          Are you sure you want to delete the{" "}
          <span className="text-red font-bold">{selectedBoard.name}</span> board?
        </p>
        <div className="flex items-center justify-center gap-8">
          <button
            className="bg-red p-2 hover:bg-red-light text-white rounded-md  w-[120px]"
            onClick={handleDeleteBoard}
          >
            Delete
          </button>
          <button
            className="bg-purple-light text-white p-2 hover:bg-blue-lightest rounded-md  w-[120px]"
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
