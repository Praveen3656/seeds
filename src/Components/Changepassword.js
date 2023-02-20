import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { URL } from "./Apis";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Changepassword = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);
  const [errorreason, setErrorreason] = useState();
  let navigate = useNavigate();
  var getuseridsession = sessionStorage.getItem("useridsession");
  const [values, setValues] = useState("hidepassword");

  const getformdetails = (e) => {
    setformData({ ...formData, [e.target.name]: [e.target.value] });
  };
  const Formsubmit = async (e) => {
    e.preventDefault();
    const userid = parseInt(formData.userid);
    const password = formData.newpassword.toString();

    const changepassworddetails = {
      password: password,
      userId:userid
    };

    if (getuseridsession === "" || getuseridsession === undefined) {
      const getuseridsession = userid;
    }

    console.log(changepassworddetails);

    try {
      fetch(`${URL}/api/v1/users/${userid}`, {
        method: "PUT",
        body: JSON.stringify(changepassworddetails),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      setError(true)
      setErrorreason("Password Changed successfully");
      document.getElementById('cleartext').value='';
      document.getElementById('password').value='';
 
     
    } catch (err) {
      setError(true)
      setErrorreason("Failed please Try again");
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
          </Col>
        </Row>
      </div>
 
      
      <div className="section passwordsection">
      <center>
        <p className="title">Change Password</p>
      </center>

        <center>{error ? (<span className="success">{errorreason},<br/><Link to="/">Go to Login</Link></span>) : ("")}</center>
        <form onSubmit={Formsubmit} autoComplete="off">
          <div className="box">
            <label>
              <b>Mobile Number</b>
            </label>
            <input
            id="cleartext"
              type="text"
              name="userid"
              placeholder="Mobile Number"
              required
              minlength="1"
              maxlength="10"
              size="10"
              onChange={getformdetails}
            ></input>
          </div>
          <div className="box">
            <label>
              <b>New Password</b>
            </label>
            <input
              id="password"
              type={values === "showpassword" ? "text" : "password"}
              name="newpassword"
              placeholder="New Password"
              required
              minlength="4"
              maxlength="15"
              size="15"
              onChange={getformdetails}
            ></input>
             {values === "showpassword" ? (
                <span   onClick={handleClickhidepassword}>
                  <AiFillEyeInvisible />
                </span>
              ) : (
                <span  onClick={handleClickShowPassword}>
                  <AiFillEye />
                </span>
              )}
          </div>
          <center>
            <button className="addbnt loginbnt">Change Password</button>
          </center>
        </form>
        <div className="navheader nomargin">
        <ul>
          <li>
            <center><p classname="back" onClick={() => navigate(-1)}><b>Back</b></p></center>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
};

export default Changepassword;
