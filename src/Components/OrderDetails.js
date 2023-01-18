import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { uid } = useParams();
  const [orders, setOrders] = useState([]);
  const { orderid } = useParams();
  console.log(orderid);
  const order_id = orderid.split("orderid=");
  const get_order_id = order_id[1];

  //console.log(order_id);

    useEffect(() => {
        fetch(`http://18.60.186.245:8080/api/v1/orderdetails/orderid/${get_order_id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => setOrders(json));
    }, [0]);

  console.log(orders);
  return (
    <>
      <div className="Header">
        <Row className="section-row">
          <Col lg={6}>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
            <div></div>
          </Col>
        </Row>
      </div>
      <div className="orders">
        <p className="title">Order Details</p>
        <span className="back">
          <Link to="/Myorders">Back</Link>
        </span>
      </div>
      <div className="Orderdetals">
        {orders.length === 0 ? (
          <p className="emptycart">
            <center>
                No Orders Found <br />
              <Link to="/Myorders">My Orders</Link>
            </center>
          </p>
        ) : (
          ""
        )}

        {orders.map((oitem) => {
          return (
            <>
              <div className="details">
                <p className="orderid">
                  <span>OrderID</span> :<span>{oitem.orderId}</span>
                </p>
                <p className="orderid">
                  <span>Quantity</span> :<span>{oitem.orderQuantity}</span>
                </p>
                <p className="orderid">
                  <span>Billing Price PerUnit</span> :
                  <span>{oitem.billingPricePerUnit}</span>
                </p>
                <p className="orderid">
                  <span>orderPlaced</span> :<span>{oitem.orderPlaced}</span>
                </p>
                <p className="orderid">
                  <span>Status</span> :<span>{oitem.orderApproved}</span>
                </p>
                <p className="orderid">
                  <span>Shipped</span> :<span>{oitem.orderShipped}</span>
                </p>
                <p className="orderid">
                  <span>Approved BY</span> :<span>{oitem.orderApprovedBy}</span>
                </p>
                <p className="orderid">
                  <span>Approved Quantity</span> :
                  <span>{oitem.approvedQuantity}</span>
                </p>
                <p className="orderid">
                  <span>Total Shipped Quantity</span> :
                  <span>{oitem.totalShippedQuantity}</span>
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default OrderDetails;
