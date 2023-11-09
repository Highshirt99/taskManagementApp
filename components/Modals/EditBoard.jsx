import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import close from "@/assets/icon-cross.svg ";
import { KanbanContext } from "@/utils/Providers ";
import { useDispatch } from "react-redux";
import { editBoard } from "@/utils/redux/slice ";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditBoard = () => {
  let boards = useSelector((state) => state.kanban.boards.boards);

  const { setShowEditBoardModal,selectedBoard, setBoards} =
    useContext(KanbanContext);
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    watch,
    onChange,

    formState: { errors },
  } = useForm({
    defaultValues: selectedBoard,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const handleAddNewColumn = () => {
    append({ name: "",
  tasks: []});
  };

  const handleDeleteColumn = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    dispatch(editBoard(data));
    setShowEditBoardModal(false);
    setBoards(boards)
    toast.success("Task Updated successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
     
    })
    // console.log(data);
  };

  return (
    <div
      className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center
    items-center fixed inset-0 z-[50]
     bg-black bg-opacity-10 scrollbar-hide"
    >
      <div className="bg-white lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md  bottom-[80px] absolute top-8">
        <div>
          <h1 className="font-[600] text-[14px]">Edit Board</h1>
          <Image
            src={close}
            alt="close"
            className="cursor-pointer w-[10px] absolute top-3 right-5"
            onClick={() => setShowEditBoardModal(false)}
          />
        </div>
        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4">
            <label className="font-[600] text-[12px] text-gray-light">
              Board Name
            </label>
            <input
              {...register("name", {
                required: true,
              })}
              className={`${
                errors.title ? " border-red" : "border-gray-300 "
              } border text-[12px]  rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
            />
             {errors.name && (
              <p className=" font-medium text-red text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <div>
            <label className="font-[600] text-[12px] text-gray-light ">
              Columns
            </label>
            {fields.map((field, index) => (
              <div className="flex items-center gap-3" key={field.id}>
                <input
                  id={`columns.${index}.value`}
                  {...register(`columns.${index}.name`, {required: true})}
                  className={`${
                    errors.columns ? " border-red" : "border-gray-300 "
                  } border text-[12px]  rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
                />
                <Image
                  src={close}
                  alt="close"
                  className=" cursor-pointer w-[10px]"
                  onClick={() => handleDeleteColumn(index)}
                />
              </div>
            ))}
             {errors.columns && (
              <p className=" font-medium text-red text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <div
            onClick={handleAddNewColumn}
            className="text-purple-dark hover:bg-purple-dark
             hover:text-white ease-in-out duration-500
              bg-blue-lightest p-2 font-[500] mt-3 rounded-full text-center text-[12px] cursor-pointer"
          >
            <p>+ Add New Column</p>
          </div>

          <button className=" hover:bg-purple-light text-white ease-in-out duration-500 bg-purple-dark p-2 font-[500] mt-3 rounded-full text-center text-[12px] cursor-pointer">
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
