import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header_two = () => {
  let navigate = useNavigate();

  
  return (
    <>
      <div className="Header1">
        <Row className="section-row">
          <Col lg={6}>
            <Link to="/">
              <span className="logout">Logout</span>
            </Link>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Header_two;
