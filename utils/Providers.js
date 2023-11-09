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
  const [showSettings, setShowSettings] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false)

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
          setBoards
        }}
      >
        {children}
      </KanbanContext.Provider>
    </Provider>
  );
};
