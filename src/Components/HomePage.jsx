import React from "react";
import SignupForm from "./SignupForm";
import TableData from "./TableData";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Provider store={store}>
        <SignupForm />
        <TableData />
      </Provider>
    </>
  );
};

export default HomePage;
