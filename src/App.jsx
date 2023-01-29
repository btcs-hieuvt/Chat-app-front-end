import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SetAvatar = lazy(() => import("./pages/SetAvatar"));
const SetUsername = lazy(() => import("./pages/SetUsername"));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/set-avatar" element={<SetAvatar />} />
            <Route path="/" element={<Chat />} />
            <Route path="/setusername" element={<SetUsername />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}
