"use client";
import { useEffect, createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/utils/redux/store ";
import { useSelector } from "react-redux";

export const KanbanContext = createContext(null);

export const Providers = ({ children }) => {

  // (useSelector((state) => state.kanban.selectedBoard))
  const [theme, setTheme] = useState("light");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false)
  const [hideSidebar, setHideSidebar] = useState(false);


  


  return (
    <Provider store={store}>
      <KanbanContext.Provider
        value={{ theme, setTheme, selectedBoard, setSelectedBoard, hideSidebar, setHideSidebar, newTaskModalOpen, setNewTaskModalOpen }}
      >
        {children}
      </KanbanContext.Provider>
    </Provider>
  );
};
