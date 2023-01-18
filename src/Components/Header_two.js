import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
const Header_two = () => {
  return (
    <>
      <div className="Header">
        <Row className="section-row">
          <Col lg={6}>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
            <div>
              <div className="carticon">
                <NavLink to="/Cart">Cart</NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Header_two;
