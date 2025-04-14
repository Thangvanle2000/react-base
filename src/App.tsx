import "./assets/scss/_styles.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./layouts/DefaultLayout";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};
