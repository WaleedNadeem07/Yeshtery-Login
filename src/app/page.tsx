"use client"; 
import { Provider } from "react-redux";
import { store } from "./store";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}
