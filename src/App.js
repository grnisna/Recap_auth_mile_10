import { Route, Routes } from "react-router-dom";
import Forms from "./Components/navbar/Forms";
import Navbar from "./Components/navbar/Navbar";



function App() {
  return (
    <section className="mainSection">
      <Navbar/>

      <Routes>
        <Route path="/registration" element={<Forms/>} ></Route>
      </Routes>
    </section>
  );
}

export default App;
