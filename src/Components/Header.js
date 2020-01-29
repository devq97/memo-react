import React from "react";
import { Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Memorización Show Infantil</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Copyright: <a href="#!">Iglesia Cristiana Aures II</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Header;