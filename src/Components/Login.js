import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { Row, Col } from "react-bootstrap";
import { URL } from "./Apis";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);
  const [errorreason, setErrorreason] = useState();
  const [values, setValues] = useState("hidepassword");

  //console.log(localStorage.getItem("mykey"));

  const getformdetails = (e) => {
    setformData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const Formsubmit = async (e) => {
    e.preventDefault();
    const userid = parseInt(formData.userid);
    const password = formData.password.toString();
    const loginrequest = {
      userId: userid,
      password: password,
    };

    console.log(loginrequest);

    try {
      const login_api = await axios.post(`${URL}/api/v1/login`, loginrequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(login_api.data.status);
      // console.log(login_api.data.token);
      if (login_api.data.status === true) {
        sessionStorage.setItem("useridsession", userid);
        window.location = "/Header";
      } else {
        setError(true);
        setErrorreason("Invalid Login Detail please try Again");
      }
    } catch (err) {
      setError(true);
      setErrorreason("Invalid Login Detail Please try Again");
      console.log(err);
    }
  };

  const handleClickShowPassword = () => {
    setValues("showpassword");
  };

  const handleClickhidepassword = () => {
    setValues("hidepassword");
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
            <b>Login</b>
          </center>
          <form onSubmit={Formsubmit} autoComplete="off">
            <div className="box">
              <label>
                <b>Mobile Number</b>
              </label>
              <input
                type="text"
                onChange={getformdetails}
                name="userid"
                placeholder="Enter Your Mobile Number"
                required
                minlength="10"
                maxlength="10"
                size="10"
              ></input>
            </div>

            <div className="box">
              <label >
                <b>Password</b>
              </label>
              {/* <div className="passwordbox"> */}
              <input
                type={values === "showpassword" ? "text" : "password"}
                onChange={getformdetails}
                name="password"
                placeholder="Password"
                required
                minlength="4"
                maxlength="20"
                size="20"
              >
             
              </input>
              {values === "showpassword" ? (
                <span   onClick={handleClickhidepassword}>
                  <AiFillEyeInvisible />
                </span>
              ) : (
                <span  onClick={handleClickShowPassword}>
                  <AiFillEye />
                </span>
              )}
              {/* </div> */}
              
            </div>
            <center>
              <span className="error">{errorreason}</span>
            </center>
            <center>
              <button className="addbnt loginbnt">LOGIN</button>
              <p className="reg">
                <Link to="/Registration"> Create Account </Link>
              </p>

              <p className="reg">
                <Link to="/Changepassword">
                  <small>Forgot Password ??</small>
                </Link>
              </p>
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
