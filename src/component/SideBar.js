import React from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

const StyleSideBar = styled.div`
  width: 230px;
  position: fixed;
  top: 70px;
  left: 20px;
`;

export const Main = styled.div`
  margin-left: 260px;
  height: 100%;
  padding: 14px;
`;

function SideBar({ title, subjects }) {
  const location = useLocation();

  const { data: list } = useQuery(["student", "subject"]);
  console.log(list);
  return (
    <StyleSideBar>
      <ListGroup>
        <ListGroup.Item
          as={"div"}
          style={{ cursor: "default", background: "#F7F7F7" }}
        >
          {title}
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
