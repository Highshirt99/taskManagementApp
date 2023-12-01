"use client";
import { useEffect, createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/utils/redux/store ";

export const KanbanContext = createContext(null);

export const Providers = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [boards, setBoards] = useState("");
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
