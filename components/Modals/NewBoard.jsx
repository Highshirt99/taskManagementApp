import React, { useContext } from "react";
import close from "@/assets/icon-cross.svg ";
import Image from "next/image";
import { KanbanContext } from "@/utils/Providers ";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createBoard } from "@/utils/redux/slice ";

const NewBoard = () => {
  const dispatch = useDispatch();
  const { setNewBoardModalOpen } = useContext(KanbanContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      columns: [
        {
          name: "Todo",
          tasks: [],
        },
        {
          name: "Doing",
          tasks: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const handleAddNewColumn = () => {
    append({
      name: "",
      tasks: [],
    });
  };
  const handleDeleteColumn = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    dispatch(createBoard({ ...data, id: Math.random() * 100000 }));
    toast.success("Board Created successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setNewBoardModalOpen(false);
  };

  return (
    <div
      className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center
  items-center fixed inset-0 z-[100]
   bg-black bg-opacity-10 scrollbar-hide"
    >
      <div className="bg-white dark:bg-gray-dark lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md   absolute top-8">
        <div>
          <h1 className="font-[600] dark:text-white text-[14px]">
            Add New Board
          </h1>
          <Image
            src={close}
            alt="close"
            className="cursor-pointer w-[10px] absolute top-3 right-5"
            onClick={() => setNewBoardModalOpen(false)}
          />
        </div>

        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4">
            <label className="font-[600] dark:text-white text-[12px] text-gray-light">
              Board Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="e.g Web Design"
              className={` border ${
                errors.name ? "border  border-red" : "border-gray-300 "
              } text-[12px] dark:bg-transparent rounded-md p-2 outline-none w-full mt-1 dark:text-white focus:border-purple-dark`}
            />
            {errors.name && (
              <p className=" font-medium text-red text-[11px]">
                Field is required.
              </p>
            )}
          </div>

          <div>
            <label className="font-[600] dark:text-white text-[12px] text-gray-light ">
              Columns
            </label>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-3">
                  <input
                    {...register(`columns.${index}.name`)}
                    autoCapitalize="on"
                    type="text"
                    className={`${
                      errors.columns ? " border-red" : "border-gray-300 "
                    } border text-[12px] dark:bg-transparent dark:text-white  rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
                  />
                  <Image
                    src={close}
                    alt="close"
                    className=" cursor-pointer w-[10px]"
                    onClick={() => handleDeleteColumn(index)}
                  />
                </div>
                {errors.columns && index === 0 && (
                  <p className=" font-medium text-red text-[11px]">
                    Field is required.
                  </p>
                )}
              </div>
            ))}
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
            <span>Create New Board</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBoard;
