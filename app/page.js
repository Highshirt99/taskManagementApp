"use client";
import { useState, useEffect, useContext } from "react";
import Sidebar from "@/components/Sidebar ";
import Template from "@/components/Template ";
import Header from "@/components/Header ";
import { useSelector } from "react-redux";
import { KanbanContext } from "@/utils/Providers ";
import NewTask from "@/components/Modals/NewTask ";

export default function Home() {
  const { theme, setTheme, newTaskModalOpen } = useContext(KanbanContext);
  const boards = useSelector((state) => state.kanban.boards.boards);
  useEffect(() => {
    // Ensure that the body class matches the current theme mode
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="relative">
      <Header />

      <main className="flex min-h-screen  dark:bg-gray-dark">
        <Sidebar />
        <Template boards={boards} />
      </main>
    </div>
  );
}
