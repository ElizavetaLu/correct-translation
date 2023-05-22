import { Navigate, Route, Routes } from "react-router-dom";
import NoMatch from "./pages/no-match/NoMatch";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

const isAuth = localStorage.getItem("token");

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      < Route path="/" element={isAuth ? < RootLayout /> : <Navigate to="/login" />}>
        <Route index element={<Home />} />
      </Route >

      <Route path='*' element={<NoMatch />} />
    </Routes >
  );
}

export default App;
