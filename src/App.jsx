import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>{<Outlet />}</main>
    </>
  );
}

export default App;
