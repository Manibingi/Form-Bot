import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Header } from "./components/home/header/Header";
import FolderDashboard from "./pages/dashboard/FolderDashboard";
import FormWorkspace from "./pages/formWorkspace/FormWorkspace";
import Settings from "./pages/settings/Settings";
import ChatBot from "./pages/chatBot/ChatBot";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/folder" element={<FolderDashboard />} />
        <Route path="/form/:folderId/:formId" element={<FormWorkspace />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/formbot/:linkId" element={<ChatBot />} />
      </Routes>
    </>
  );
};

export default App;
