import React, { useState, useEffect } from "react";
import {
  Nav,
  Dropdown,
  Navbar,
  NavDropdown,
  Container,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">로고</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="🥬농산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/1")}>
                  배추
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/2")}>
                  시금치
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/3")}>
                  양파
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/4")}>
                  수박
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/5")}>
                  딸기
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="🐄축산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/6")}>
                  돼지고기
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/7")}>
                  소고기
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/8")}>
                  우유
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="🐟수산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/9")}>
                  고등어
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/10")}>
                  갈치
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/11")}>
                  굴
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
