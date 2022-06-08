import React, { ReactNode, useCallback, useMemo, useState } from "react";

import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Link,
  Box,
  Button,
  Portal,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CgTrees } from "react-icons/cg";
import { GrChapterAdd, GrAdd } from "react-icons/gr";
import { RiFileListLine } from "react-icons/ri";
import { BsChatLeftDots } from "react-icons/bs";
import { TbLogin, TbLogout } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

import { useRecoilState } from "recoil";
import { professorState } from "../atom/user";

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

const LinkItems = [
  { name: "과목 관리", icon: FiSettings, to: "/professor" },
  { name: "과목 생성", icon: GrAdd, to: "/professor/create_subject" },
  { name: "과제 출제", icon: GrChapterAdd, to: "/professor/add_assignment" },
  // {name: '출제된 과제 현황', icon: RiFileListLine, to: "/professor/assignment"},
  // {name: '과제 채팅 관리', icon: BsChatLeftDots, to: "/professor/chat"},
];
export const NavItem = ({
  icon,
  children,
  as,
  to,
  select,
  onClick,
  ...rest
}) => {
  return (
    <Link
      as={as}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        bg={select && "blue.400"}
        color={select && "white"}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarContent = ({ ...rest }) => {
  const [professor, setProfessor] = useRecoilState(professorState);
  const location = useLocation();
  const [menuShow, setMenuShow] = useState(0);
  const { data: subjectList } = useQuery(["professor", "subject"]);

  const subjectSubMenu = useCallback(
    (type) =>
      subjectList?.map((subject, idx) => (
        <MenuItem
          as={ReactLink}
          key={`subject-${idx}`}
          to={`/professor/${type}/${subject.code}`}
        >
          {subject.name} ({subject.code})
        </MenuItem>
      )) ?? [],
    [subjectList]
  );

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        cursor={"default"}
        userSelect={"none"}
      >
        <CgTrees fontSize={"2rem"} className={"mr-1.5"} />
        <Text fontSize="2l" fontWeight="bold" display={"flex"}>
          WOOD IDE Admin
        </Text>
      </Flex>
      {professor && (
        <>
          <Text textAlign={"center"} marginBottom={5} fontWeight={"bold"}>
            {professor.username} 교수님 환영합니다
          </Text>
          {LinkItems.map((link) => (
            <NavItem
              as={ReactLink}
              key={link.name}
              icon={link.icon}
              to={link.to}
              onClick={() => setMenuShow(0)}
              select={menuShow === 0 && location.pathname === link.to}
            >
              {link.name}
            </NavItem>
          ))}{" "}
          <Menu placement="right">
            <NavItem
              as={MenuButton}
              icon={RiFileListLine}
              onClick={() => setMenuShow(1)}
              select={menuShow === 1}
            >
              출제된 과제 현황
            </NavItem>
            <Portal>
              {subjectSubMenu.length > 0 ? (
                <>
                  <MenuList>{subjectSubMenu("assignment")}</MenuList>
                </>
              ) : (
                <>
                  <MenuList>
                    <Text marginLeft={5}>과목 없음</Text>
                  </MenuList>
                </>
              )}
            </Portal>
          </Menu>
          <Menu placement="right">
            <NavItem
              as={MenuButton}
              icon={BsChatLeftDots}
              onClick={() => setMenuShow(2)}
              select={menuShow === 2}
            >
              과제 채팅 관리
            </NavItem>
            <Portal>
              {subjectSubMenu.length > 0 ? (
                <>
                  <MenuList>{subjectSubMenu("chat")}</MenuList>
                </>
              ) : (
                <>
                  <MenuList>
                    <Text marginLeft={5}>과목 없음</Text>
                  </MenuList>
                </>
              )}
            </Portal>
          </Menu>
        </>
      )}

      {!professor ? (
        <>
          <NavItem
            as={ReactLink}
            key={"로그인"}
            icon={TbLogin}
            to={"/professor/login"}
          >
            로그인
          </NavItem>
          <NavItem
            as={ReactLink}
            key={"회원가입"}
            icon={AiOutlineUserAdd}
            to={"/professor/register"}
          >
            회원가입
          </NavItem>
        </>
      ) : (
        <NavItem
          as={"button"}
          key={"로그아웃"}
          icon={TbLogout}
          position={"absolute"}
          left={0}
          bottom={5}
          onClick={() => {
            setProfessor(null);
            delete localStorage["professor"];
          }}
        >
          로그아웃
        </NavItem>
      )}
    </Box>
  );
};

function MainSideBar() {
  return <SidebarContent display={{ base: "none", md: "block" }} />;
}

export function SideBar({ title, subjects }) {
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

export default MainSideBar;
