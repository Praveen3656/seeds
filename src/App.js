import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Myorders from "./Components/Myorders";
import Success from "./Components/Success";
import OrderDetails from "./Components/OrderDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route path="/Home/:uid" element={<Home />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Myorders" element={<Myorders />} />
          <Route path="Success" element={<Success />} />
          <Route path="/OrderDetails/:orderid" element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
