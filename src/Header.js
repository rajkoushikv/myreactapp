import React from "react";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <Container>
      <header>
        <h2
          className="text-center"
          style={{ backgroundColor: "#ccc", padding: "2vh" }}
        >
          VRK Blogspot
        </h2>
      </header>
    </Container>
  );
};

export default Header;
