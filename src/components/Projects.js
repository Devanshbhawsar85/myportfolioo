import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap"; // Ensure these are imported
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png"; // New image
import projImg5 from "../assets/img/project-img5.png"; // New image
import projImg6 from "../assets/img/project-img6.png"; // New image
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Code Room ",
      description:
        "A real time code editor with compiler for collabrative programming",
      imgUrl: projImg1,
    },
    {
      title: "Peers Connect",
      description:
        "A peer-to-peer communication platform with WebRTC for video, audio, and text chat.",
      imgUrl: projImg2,
    },
    {
      title: "Mapify",
      description:
        "A fitness tracking app for fitness tracking and maintaining a fitness record ",
      imgUrl: projImg3,
    },
    {
      title: "Code Room",
      description:
        "A real time code editor with compiler for collabrative programming",
      imgUrl: projImg4, // New image
    },
    {
      title: "Peers Connect",
      description:
        "A peer-to-peer communication platform with WebRTC for video, audio, and text chat.",
      imgUrl: projImg5, // New image
    },
    {
      title: "Mapify",
      description:
        "A fitness tracking app for fitness tracking and maintaining a fitness record ",
      imgUrl: projImg6, // New image
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Projects</h2>
                  <p>
                    I’ve worked on several innovative projects, including a
                    real-time code editor that allows multiple users to
                    collaboratively code with live previews and syntax
                    highlighting. I also developed PeersConnect, a peer-to-peer
                    communication platform built with WebRTC, enabling secure,
                    low-latency video/audio and text chat. Additionally, I
                    created a WebRTC-based audio chat application, offering
                    seamless, real-time voice communication with automatic
                    network adaptation for optimal audio quality.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>
                          CODE ROOM a Real-Time Code Editor is a collaborative
                          platform where multiple users can join a shared coding
                          environment, make code changes in real-time, and
                          execute code together. Built with Node.js, Express,
                          and Socket.io, this application allows users to join
                          coding rooms, see others' code updates, and chat while
                          coding. It integrates with Monaco Editor for a rich
                          code editing experience and uses Axios to interact
                          with the Piston API for executing code in different
                          programming languages such as JavaScript, Python, C++,
                          and Java. The platform supports features like language
                          switching, live code compilation, real-time typing
                          indicators, and user management, providing a seamless
                          collaborative coding environment. The app also handles
                          user authentication, room management, and sends
                          real-time code changes and execution results to all
                          connected users in the room.
                        </p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>
                          PeersConnect is a real-time communication platform
                          that leverages WebRTC (Web Real-Time Communication) to
                          enable direct peer-to-peer audio and video calls. It
                          allows users to connect with each other without
                          requiring any plugins or third-party software,
                          providing seamless communication. The app is built
                          using JavaScript, React, and Node.js, with WebRTC for
                          handling real-time media streaming and Socket.io for
                          signaling and connection establishment. PeersConnect
                          offers features like user authentication, dynamic peer
                          connections, and a user-friendly interface for
                          initiating and managing calls, making it a lightweight
                          yet powerful tool for online communication.
                        </p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="Background"
      />
    </section>
  );
};
