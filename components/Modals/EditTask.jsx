import React, { useContext } from "react";
import Image from "next/image";
import { KanbanContext } from "@/utils/Providers ";
import close from "@/assets/icon-cross.svg ";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editTask } from "@/utils/redux/slice ";
import { toast } from "react-toastify";

const EditTask = () => {
  const dispatch = useDispatch();
  const { setEditTaskModalOpen, selectedBoard, task } =
    useContext(KanbanContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: task,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  // Add new subtask
  const handleAddNewSubtask = () => {
    append({ title: "", isCompleted: false,
  id: Math.random() * 1000000 });
  };

  // Delete subtask
  const handleDeleteSubtask = (index) => {
    if (index !== 0) {
      remove(index);
    }
  };

  const onSubmit = (data) => {
    dispatch(editTask({data: data,
    id: task.id,
  }));

    setEditTaskModalOpen(false);
    toast.success("Task updated successfully.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div
      className="backdrop-blur-sm overflow-scroll shadow-md flex justify-center
     items-center fixed inset-0 z-[50]
      bg-black bg-opacity-10 scrollbar-hide"
    >
      <div className="bg-white dark:bg-gray-dark lg:w-[400px] md:w-[350px] h-fit w-[80%] p-4 rounded-md relative top-2">
        <div>
          <h1 className="font-[600] dark:text-white text-[14px]">Edit Task</h1>
          <Image
            src={close}
            alt="close"
            className=" cursor-pointer w-[10px]  absolute top-3 right-5"
            onClick={() => setEditTaskModalOpen(false)}
          />
        </div>
        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="font-[600] dark:text-white text-[12px] text-gray-light">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Read my books."
              {...register("title", { required: true })}
              className={`${
                errors.title ? " border-red" : "border-gray-300 "
              } border text-[12px] dark:bg-transparent dark:text-white  rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
            />
            {errors.title && (
              <p className=" font-medium text-red text-[11px]">
                Field is required.
              </p>
            )}
          </div>
          <div>
            <label className="font-[600] dark:text-white text-[12px] text-gray-light">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="e.g. I need to read my books before lecture free week."
              className="border dark:bg-transparent dark:text-white border-gray-300 focus-none focus:border focus:border-purple-dark rounded-md p-2 outline-none w-full h-[100px] mt-1 text-[12px]"
            />
          </div>
          <div>
            <label className="font-[600] dark:text-white text-[12px] text-gray-light">
              Subtasks
            </label>

            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center gap-3">
                  <input
                    id={`subtasks.${index}.value`}
                    autoCapitalize="on"
                    placeholder={
                      index === 0
                        ? "e.g. Make coffee"
                        : index === 1
                        ? "e.g. Drink coffee & smile"
                        : ""
                    }
                    {...register(`subtasks.${index}.title`, {
                      required: index === 0,
                    })}
                    className={`${
                      errors.subtasks && index === 0
                        ? " border-red"
                        : "border-gray-300 "
                    } border text-[12px] dark:bg-transparent dark:text-white rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
                  />

                  <Image
                    src={close}
                    alt="close"
                    className=" cursor-pointer w-[10px]"
                    onClick={() => handleDeleteSubtask(index)}
                  />
                </div>
                {errors.subtasks && index === 0 && (
                  <p className=" font-medium text-red text-[11px]">
                    Field is required.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div
            onClick={() => handleAddNewSubtask()}
            className="text-purple-dark hover:bg-purple-dark hover:text-white ease-in-out duration-500 bg-blue-lightest p-2 font-[500] mt-3 rounded-full text-center text-[12px] cursor-pointer"
          >
            <p>+ Add a new new substask</p>
          </div>
          <div className="mt-2">
            <label className="font-[600] text-[12px] text-gray-light">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className={`${
                errors.status ? " border-red" : "border-gray-300  "
              } border text-[12px] cursor-pointer dark:bg-transparent dark:text-white rounded-md p-2 outline-none w-full mt-1 focus:border-purple-dark`}
            >
              {selectedBoard.columns.map((column, index) => (
                <option
                  key={index}
                  value={column.name}
                  className="dark:text-black"
                >
                  {column.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className=" font-medium text-red text-[11px]">
                Field is required.
              </p>
            )}
          </div>
          <button className=" hover:bg-purple-light text-white ease-in-out duration-500 bg-purple-dark p-2 font-[500] mt-3 rounded-full text-center text-[12px] cursor-pointer">
            <span>Update task</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
