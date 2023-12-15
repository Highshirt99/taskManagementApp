"use client";
import { createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/utils/redux/store ";

export const KanbanContext = createContext(null);

export const Providers = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [boards, setBoards] = useState([]);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);

  // Update the selected task's status during a drag and drop operation
  // const updateTaskStatusDuringDragAndDrop = (task_id, newStatus) => {
  //   setBoards((prev) => 
  //      prev.map((board) => {
  //       if (board.id !== selectedBoard.id) return board;

  //       const oldColumnIndex = board.columns.findIndex((column) =>
  //         column.tasks.some((task) => task.id === task_id)
  //       );

  //       const newColumnIndex = board.columns.findIndex(
  //         (column) => column.name === newStatus
  //       );

  //       if (oldColumnIndex === -1 || newColumnIndex === -1) return board;

  //       const updatedColumns = [...board.columns];
  //       const oldColumn = updatedColumns[oldColumnIndex];
  //       const newColumn = updatedColumns[newColumnIndex];

  //       const taskIndex = oldColumn.tasks.findIndex(
  //         (task) => task.id === task_id
  //       );

  //       if (taskIndex === -1) return board;

  //       // Find and update the task's status
  //       const updatedTask = {
  //         ...oldColumn.tasks[taskIndex],
  //         status: newStatus,
  //       };

  //       // Remove the task from the old column and add it to the new column
  //       oldColumn.tasks.splice(taskIndex, 1);
  //       newColumn.tasks.push(updatedTask);

  //       return {
  //         ...board,
  //         columns: updatedColumns,
  //       };
  //     })
  //   );
  // };

  return (
    <Provider store={store}>
      <KanbanContext.Provider
        value={{
          theme,
          setTheme,
          selectedBoard,
          setSelectedBoard,
          hideSidebar,
          setHideSidebar,
          newTaskModalOpen,
          setNewTaskModalOpen,
          showSettings,
          setShowSettings,
          showEditBoardModal,
          setShowEditBoardModal,
          boards,
          setBoards,
          newBoardModalOpen,
          setNewBoardModalOpen,
          showTopBar,
          setShowTopBar,
          showTaskDetails,
          setShowTaskDetails,
          taskId,
          setTaskId,
          editTaskModalOpen,
          setEditTaskModalOpen,
          task,
          setTask,
          
        }}
      >
        {children}
      </KanbanContext.Provider>
    </Provider>
  );
};
