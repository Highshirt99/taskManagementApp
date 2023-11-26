"use client";
import { useState, useEffect, useContext } from "react";
import Sidebar from "@/components/Sidebar ";
import Template from "@/components/Template ";
import Header from "@/components/Header ";
import { useDispatch, useSelector } from "react-redux";
import { KanbanContext } from "@/utils/Providers ";
import { setId } from "@/utils/redux/slice ";
import TopBar from "@/components/TopBar ";

export default function Home() {
  const dispatch = useDispatch();
  const { theme, showTopBar } = useContext(KanbanContext);
  const boards = useSelector((state) => state.kanban.boards.boards);

  useEffect(() => {
    dispatch(setId());
  }, []);

  useEffect(() => {
    // Ensure that the body class matches the current theme mode
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="relative scrollbar-hide">
      <Header />

      <main className="min-h-screen lg:flex md:flex dark:bg-gray-dark">
        {showTopBar ? <TopBar /> : <Sidebar />}
        <Template boards={boards} />
      </main>
    </div>
  );
}
