import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Myorders from "./Components/Myorders";
import Success from "./Components/Success";
import OrderDetails from "./Components/OrderDetails";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Myaccount from "./Components/Myaccount";
import Changepassword from "./Components/Changepassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Products" element={<Home />} />
          <Route path="Registration" element={<Registration />} />
          <Route exact path="/Header" element={<Header />} />
          <Route path="/Home/:uid/:cat_name/:company" element={<Home />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Myorders" element={<Myorders />} />
          <Route path="Success" element={<Success />} />
          <Route path="/OrderDetails/:orderid" element={<OrderDetails />} />
          <Route path="Myaccount" element={<Myaccount />} />
          <Route path="Changepassword" element={<Changepassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
