import { useRecoilState } from "recoil";
import { studentState } from "../atom/user";
import { Link as ReactLink, useLocation } from "react-router-dom";
import React, { useCallback, useState, useMemo } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CgTrees } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";
import { BsChatLeftDots } from "react-icons/bs";
import { TbLogin, TbLogout } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { NavItem } from "./SideBar";

const SidebarContent = ({ ...rest }) => {
  const [student, setStudent] = useRecoilState(studentState);
  const location = useLocation();
  const { data: subjectList } = useQuery(["student", "subject"]);

  const subjectSubMenu = useMemo(
    () =>
      subjectList?.map((subject, idx) => (
        <NavItem
          as={ReactLink}
          key={`subject-${idx}`}
          to={`/subject/${subject.code}`}
          select={location.pathname === `/subject/${subject.code}`}
        >
          {subject.name} ({subject.code})
        </NavItem>
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
        cursor={"default"}
        userSelect={"none"}
      >
        <CgTrees fontSize={"2rem"} className={"mr-1.5"} />
        <Text fontSize="2l" fontWeight="bold" marginLeft={3} display={"flex"}>
          WOOD IDE
        </Text>
      </Flex>
      {!student ? (
        <>
          <NavItem as={ReactLink} key={"로그인"} icon={TbLogin} to={"/login"}>
            로그인
          </NavItem>
          <NavItem
            as={ReactLink}
            key={"회원가입"}
            icon={AiOutlineUserAdd}
            to={"/register"}
          >
            회원가입
          </NavItem>
        </>
      ) : (
        <>
          <Text textAlign={"center"} marginBottom={5} fontWeight={"bold"}>
            {student.username}님 환영합니다.
          </Text>
          <Text textAlign={"center"} marginBottom={2} fontWeight={"bold"}>
            수강중인 과목
          </Text>
          {subjectSubMenu}
          <NavItem
            as={"button"}
            key={"로그아웃"}
            icon={TbLogout}
            position={"absolute"}
            bottom={5}
            onClick={() => {
              setStudent(null);
              delete localStorage["student"];
            }}
          >
            로그아웃
          </NavItem>
        </>
      )}
    </Box>
  );
};

function StudentSideBar() {
  return <SidebarContent display={{ base: "none", md: "block" }} />;
}

export default StudentSideBar;
