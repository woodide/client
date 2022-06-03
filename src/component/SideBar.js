import React from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useMatch, useParams } from "react-router-dom";

const StyleSideBar = styled.div`
  width: 230px;
  position: fixed;
  top: 70px;
  left: 20px;
`;

function SideBar({ subjects }) {
  const location = useLocation();
  return (
    <StyleSideBar>
      <ListGroup>
        <ListGroup.Item
          as={"div"}
          style={{ cursor: "default", background: "rgba(0,0,0,0.1)" }}
        >
          수강중인 수업
        </ListGroup.Item>
        {subjects.map((subject, i) => (
          <ListGroup.Item
            as={Link}
            to={subject.link}
            action
            key={`list-${i}`}
            active={location.pathname === subject.link}
          >
            {subject.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </StyleSideBar>
  );
}

export default SideBar;
