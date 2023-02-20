import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { URL } from "./Apis";
const Myorders = () => {

  var getuseridsession = sessionStorage.getItem("useridsession");

  const [orders, setOrders] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    fetch(`${URL}/api/v1/orders/${getuseridsession}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setOrders(json));
  }, [0]);

  const orderdetails = (e,oid) =>{
    const orderid = oid;
    //navigate(`/Home/cat_id=${e}`);
    navigate(`/OrderDetails/orderid=${orderid}`);
    }

  console.log(orders);
  return (
    <>
      <div className="Header">
        <Row className="section-row">
          <Col lg={6}>
          <Link to="/"><span className="logout">Logout</span></Link>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
            <div></div>
          </Col>
        </Row>
      </div>
      <div className="orders">
        <center><p className="title">My Orders</p></center>
        <span className="back">
          <Link to="/Header">Home</Link>
        </span>
      </div>
      
      <div className="Orderdetals">
        {orders.map((oitem) => {
          return (
            <>
              <div className="details">
                <p className="orderid">
                  <span>User</span> :<span>{oitem.userId}</span>
                </p>
                <p className="orderid">
                  <span>Order ID</span> :<span>{oitem.orderId}</span>
                </p>
                <p className="orderid">
                  <span>Ordered Date</span> :<span>{oitem.orderCreatedAt}</span>
                </p>
                <p className="orderid">
                  <span>Status</span> :<span>{oitem.orderCurrentStatus}</span>
                </p>
                <p className="orderid detailsclick" onClick={ (e) => orderdetails(e,oitem.orderId)}>Details</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Myorders;
