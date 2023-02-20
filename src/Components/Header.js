import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { URL } from "./Apis";
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Accordion,
} from "react-bootstrap";
import { NavLink ,Link } from "react-router-dom";
import logo from "../images/logo.png";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { useNavigate } from "react-router-dom";
const Header = () => {

  
  const gettoken = sessionStorage.getItem("token");
  console.log(gettoken);
  const [getcategory, setGetcategory] = useState([]);
  const [getcategory_two, setGetcategory_two] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/v1/categories/1`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setGetcategory(json));
  }, [0]);

  useEffect(() => {
    fetch(`${URL}/api/v1/categories/2`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setGetcategory_two(json));
  }, [0]);

  let navigate = useNavigate();
  const homepage = (e, catname) => {
    navigate(`/Home/cat_id=${e}/cat_name=${catname}/company=Srikar Seeds`);
  };

  const homepage_two = (e, catname) => {
    navigate(`/Home/cat_id=${e}/cat_name=${catname}/company=Srikar BioTect`);
  };

  return (
    <>
      <div className="Header1">
        <Row className="section-row">
          <Col lg={6}>
          <Link to="/"><span className="logout">Logout</span></Link>
            <div className="logo">
              <img src={logo} alt="logo">
              </img>
             
            </div>
          </Col>
        </Row>
      </div>

      <Row className="section-row">
        <div className="sidemenu">
          <CDBSidebar textColor="#fff" backgroundColor="#ccc">
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <Accordion defaultActiveKey="1">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span className="navname">
                        <div className="menutitle">Srikar Seeds</div>
                      </span>
                    </Accordion.Header>

                    {getcategory.map((item, id) => {
                      return (
                        <Accordion.Body key={id}>
                          <span
                            value={item.categoryId}
                            onClick={() =>
                              homepage(item.categoryId, item.categoryName)
                            }
                          >
                            {item.categoryName}
                          </span>
                        </Accordion.Body>
                      );
                    })}
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span className="navname">
                        <div className="menutitle">Srikar Biotech</div>
                      </span>
                    </Accordion.Header>
                    {getcategory_two.map((item, id) => {
                      return (
                        <Accordion.Body key={id}>
                          <span
                            value={item.categoryId}
                            onClick={() =>
                              homepage_two(item.categoryId, item.categoryName)
                            }
                          >
                            {item.categoryName}
                          </span>
                        </Accordion.Body>
                      );
                    })}
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <span className="navname">
                        <div className="menutitle">Orders</div>
                      </span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <NavLink exact to="/"></NavLink>
                    </Accordion.Body>
                    <Accordion.Body>
                      <NavLink exact to="/Myorders">
                        My Orders
                      </NavLink>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <span className="navname">
                        <div className="menutitle">Profile</div>
                      </span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <NavLink exact to="/"></NavLink>
                    </Accordion.Body>
                    <Accordion.Body>
                      <NavLink exact to="/Myaccount">
                        My Account
                      </NavLink>
                    </Accordion.Body>
                    <Accordion.Body>
                      <NavLink exact to="/Changepassword">
                        Change password
                      </NavLink>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </CDBSidebarMenu>
            </CDBSidebarContent>
          </CDBSidebar>
        </div>
      </Row>
    </>
  );
};

export default Header;
