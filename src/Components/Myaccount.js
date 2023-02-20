import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { URL } from "./Apis";

const Myaccount = () => {
  let navigate = useNavigate();

  var getuseridsession = sessionStorage.getItem("useridsession");

  const [userdetails, setUserdetails] = useState({});

  console.log(getuseridsession);
  useEffect(() => {
    fetch(`${URL}/api/v1/users/${getuseridsession}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setUserdetails(json));
  }, [0]);

  console.log(userdetails);
  return (
    <>
      <div className="Header">
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
      <center>
        <p className="title">My Profile</p>
      </center>
      <div className="section">
        <div className="navheader profilenomargin">
          <ul>
            <li>
              <p onClick={() => navigate(-1)}>Back</p>
            </li>
          </ul>
        </div>

        <div className="userdetails">
          <div className="userlabel">Name</div>
          <div className="userlabel">{userdetails.userName}</div>
          <div className="userlabel">User ID</div>
          <div className="userlabel">{userdetails.userId}</div>
          <div className="userlabel">Mobile </div>
          <div className="userlabel">{userdetails.mobile}</div>
          <div className="userlabel">Email</div>
          <div className="userlabel">{userdetails.email}</div>
          <div className="userlabel">User Role</div>
          <div className="userlabel">{userdetails.userType}</div>
          <div className="userlabel">state</div>
          <div className="userlabel">{userdetails.state}</div>
        </div>
      </div>
    </>
  );
};

export default Myaccount;
