import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#000" }}>
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center text-sm-start">
            <p
              style={{
                fontSize: "2.0rem", // Increase font size
                fontWeight: "bold", // Make the text bold
                color: "#f8f8f8", // Light color for dark background
                marginBottom: "20px", // Add some margin below
                letterSpacing: "1px", // Slightly increase letter spacing
              }}
            >
              Thanks For Visiting
            </p>
          </Col>
          <Col size={12} sm={6} className="d-flex justify-content-end">
            <div>
              <p className="contact-text">
                Contact me at:{" "}
                <a className="email-link" href="mailto:bhawsard75@gmail.com">
                  bhawsard75@gmail.com
                </a>
              </p>
              <p>Copyright 2025. All Rights Reserved</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
