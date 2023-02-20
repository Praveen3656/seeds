import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { Row, Col } from "react-bootstrap";
import { URL } from "./Apis";

const Registration = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);
  const [errorreason, setErrorreason] = useState();
  const [message, setMessage] = useState(false);
  const getformdetails = (e) => {
    setError(false);
    setErrorreason("");

    console.log(e.target.value);

    // if (e.target.value.match(0) !== null) {
    //   setError(true);
    //   setErrorreason("Starting 0 Is not Allowed");
    //   document.getElementById("cleartext").value = "";
    // }

    if (e.target.value.match(/^ *$/) !== null) {
      setError(true);
      setErrorreason(
        "The fields should not be is null, empty or has blank spaces"
      );
    }
    setformData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const Formsubmit = async (e) => {
    setError(false);
    setErrorreason();
    setError(false);
    setMessage(false);
    setErrorreason();
    e.preventDefault();

    const userid = parseInt(formData.userid);
    const emailid = formData.email.toString();
    const mobile = parseInt(formData.mobile);
    const passwordmew = formData.password.toString();
    const username = formData.username.toString();

    const number = Number.isInteger(mobile);
    console.log(number);
    if (number === true) {
    
    }else{
      setError(true);
      setErrorreason("Please enter Numbers only");
      document.getElementById("cleartext").value = "";
      return;
    }

    const regrequestdata = {
      userId: mobile,
      email: emailid,
      mobile: mobile,
      password: passwordmew,
      userName: username,
    };

    console.log(regrequestdata);

    try {
      const registration = await axios.post(
        `${URL}/api/v1/register`,
        regrequestdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(registration.data);
      if (registration.status === 200) {
        window.location = "/";
        document.getElementById("cleartext").value = "";
      } else {
        setError(true);
        setErrorreason("Failed Please try Again");
      }
    } catch (err) {
      document.getElementById("cleartext").value = "";
      setError(true);
      setErrorreason("Please try Again");
      console.log(err);
    }
  };
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
      <div className="Loginpage">
        <div className="loginform">
          <center>
            <b>Create Account</b>
          </center>
          <center>
            {error ? (
              <span className="error">
                <small>{errorreason} </small>
                <br />
              </span>
            ) : (
              ""
            )}
          </center>
          <form onSubmit={Formsubmit} autoComplete="on">
            {/* <div className="box">
              <label>
                <b>User ID</b>
              </label>
              <input
                type="text"
                onChange={getformdetails}
                name="userid"
                placeholder="Please Enter Mobile No"
                required
                minlength="10"
                maxlength="10"
                size="10"
                id="cleartext"
              ></input>
            </div> */}

            <div className="box">
              <label>
                <b>Mobile</b>
              </label>
              <input
                type="text"
                onChange={getformdetails}
                name="mobile"
                placeholder="Mobile Number"
                required
                minlength="10"
                maxlength="10"
                size="10"
                id="cleartext"
              ></input>
            </div>

            <div className="box">
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                onChange={getformdetails}
                name="email"
                placeholder="Email"
                required
                minlength="4"
                maxlength="50"
                size="50"
                id="cleartext"
              ></input>
            </div>

            <div className="box">
              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                onChange={getformdetails}
                name="password"
                placeholder="Password"
                required
                minlength="4"
                maxlength="15"
                size="15"
                id="cleartext"
              ></input>
            </div>

            <div className="box">
              <label>
                <b>User Name</b>
              </label>
              <input
                type="text"
                onChange={getformdetails}
                name="username"
                placeholder="User Name"
                required
                minlength="4"
                maxlength="15"
                size="15"
                id="cleartext"
              ></input>
            </div>

            <center>
              <button className="addbnt loginbnt">Create</button>
            </center>
          </form>
          <center>
            <p className="reg">
              <Link to="/"> Click Here to Login </Link>
            </p>
          </center>
        </div>
      </div>
    </>
  );
};

export default Registration;
