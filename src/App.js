import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Forms from "./Components/navbar/Forms";
import Navbar from "./Components/navbar/Navbar";



function App() {
  return (
    <section className="mainSection">
      <Navbar/>

      <Routes>
        <Route path="/registration" element={<Forms/>} ></Route>
        <Route path="/login" element={<LoginForm/>} ></Route>
      </Routes>
    </section>
  );
}

export default App;
