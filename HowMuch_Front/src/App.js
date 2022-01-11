import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import LoginPage from "./components/LoginPage";
import Account from "./components/Account";
import Welcome from "./components/Welcome";
import BoardMain from "./components/BoardMain";
import Register from "./components/Register";
import Modify from "./components/Modify";
import DetailBoard from "./components/DetailBoard";
import Mypage from "./components/Mypage";
import TestLogin from "./components/TestLogin";
import HotBoardMain from "./components/HotBoardMain";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/:login" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/boardmain" element={<BoardMain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:bno" element={<DetailBoard />} />
        <Route path="/modify/:bno" element={<Modify />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/hotboard" element={<HotBoardMain />} />
      </Routes>
    </div>
  );
}

export default App;
