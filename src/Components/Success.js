import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
const Success = () => {
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
      <p className="emptycart">
        <center>
          Order place Successfully <br />
          <Link to="/Myorders">Orders</Link>
        </center>
      </p>
    </>
  );
};
export default Success;
