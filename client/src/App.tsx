import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NoMatch from "./pages/NoMatch";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";


const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      < Route path="/" element={< RootLayout />}>
        <Route index element={<Home />} />
      </Route >
      <Route path='*' element={<NoMatch />} />
    </Routes >
  );
}

export default App;