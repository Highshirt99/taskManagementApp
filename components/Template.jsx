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
import {
  changeStatus,
  updateTaskStatusDuringDragAndDrop,
} from "@/utils/redux/slice ";
import EditTask from "./Modals/EditTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
    editTaskModalOpen,
    setTask,
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

  // drag and drop
  const handleDragDrop = (results) => {
    const { source, destination, draggableId } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find destination column
    const column = selectedBoard.columns.find((column) => {
      return column.id.toString() === destination.droppableId;
    });

    // Find moved task
    const task = selectedBoard.columns
      .find((column) => column.id.toString() === source.droppableId)
      ?.tasks.find((task) => task.id.toString() === draggableId);

    // Remove task from source column
    const sourceColumn = selectedBoard.columns.find((column) => {
      return column.id.toString() === source.droppableId;
    });

    const tasks = [...column?.tasks];

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    // const [removedTask] = sourceColumn.tasks.splice(sourceIndex, 1);

    // Add task to the destination column
    tasks.splice(destinationIndex, 0, task);

    // Find the status based on destination.dropableId

    const newStatus = selectedBoard?.columns.find(
      (column) => column.id.toString() === destination.droppableId
    )?.name;

    // Update the task status
    const updatedTask = { ...task, status: newStatus };

    // Update the task status in the boards state
    dispatch(
      updateTaskStatusDuringDragAndDrop({
        task_id: task?.id,
        newStatus: updatedTask.status,
      })
    );

    // Update the current board
    const updatedBoard = {
      ...selectedBoard,
      columns: selectedBoard.columns.map((col) =>
        col.id === column?.id ? column : col
      ),
    };
    setSelectedBoard(updatedBoard);
  };

  return (
    <div
      className={` ${
        hideSidebar ? "w-full" : "lg:w-[85%] md:w-[80%] w-[100%]"
      } min-h-screen
      border-l dark:border-l-gray-700 relative font-bold text-[10px] lg:text-[12px]  p-4  bg-blue-lighter dark:bg-gray-darker`}
    >
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 ">
          {selectedBoard?.columns?.map((column, index) => (
            <div
              key={index}
              className="flex flex-col lg:mx-0 md:mx-0 mx-auto md:self-start lg:self-start gap-1 w-[90%] md:w-[250px] lg:w-[230px] h-auto"
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

              <Droppable droppableId={column.id.toString()} type="group">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col mt-2 md:mt-6 lg:mt-8 lg:gap-3"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        key={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            onClick={() => {
                              setShowTaskDetails(true);
                              setTaskId(task.id);
                              setTask(task);
                              dispatch(changeStatus(task.id));
                            }}
                            className="bg-white shadow-md cursor-grab p-2 mb-4 dark:bg-gray-dark  min-h-[70px] rounded-md"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <p className="dark:text-white text-[12px]">
                              {task.title}
                            </p>
                            <p className="text-gray-500 text-[10px] mt-3">
                              {`${checkCompleted(task).length} of ${
                                task.subtasks?.length
                              }`}{" "}
                              subtasks
                            </p>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
        <div
          onClick={() => setHideSidebar(false)}
          className={` ${
            hideSidebar ? "block" : "hidden"
          } bg-purple-dark p-1 cursor-pointer absolute rounded-r-full w-[30px] h-[25px] left-0 bottom-24`}
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
      </DragDropContext>

      {newBoardModalOpen && <NewBoard />}
      {newTaskModalOpen && <NewTask />}
      {showEditBoardModal && <EditBoard />}
      {showTaskDetails && (
        <TaskDetails setShowTaskDetails={setShowTaskDetails} />
      )}
      {editTaskModalOpen && <EditTask />}

      <ToastContainer />
    </div>
  );
};

export default Template;
