import React, {ReactNode} from 'react';

import styled from "styled-components";
import {ListGroup} from "react-bootstrap";
import {Link as ReactLink, useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {
    IconButton,
    Link,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {CgTrees} from "react-icons/cg";
import {GrChapterAdd, GrAdd} from "react-icons/gr";
import {RiFileListLine} from "react-icons/ri";
import {BsChatLeftDots} from "react-icons/bs";
import {TbLogin, TbLogout} from "react-icons/tb";
import {AiOutlineUserAdd} from "react-icons/ai";
import {useRecoilState} from "recoil";
import {professorState} from "../atom/user";

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
    {name: '메인', icon: FiHome, to: "/professor"},
    {name: '과목 생성', icon: GrAdd, to: "/professor/create_subject"},
    {name: '과제 출제', icon: GrChapterAdd, to: "/professor/add_assignment"},
    {name: '출제된 과제 현황', icon: RiFileListLine, to: "/professor/assignment"},
    {name: '과제 채팅 관리', icon: BsChatLeftDots, to: "/professor/chat"},
];
const NavItem = ({icon, children, as, to, ...rest}) => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Link as={as} to={to} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                bg={location.pathname === to && 'cyan.400'}
                color={location.pathname === to && 'white'}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const SidebarContent = ({...rest}) => {
    const [professor, setProfessor] = useRecoilState(professorState);

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" cursor={"default"}
                  userSelect={"none"}>
                <Text fontSize="2xl" fontWeight="bold" display={"flex"}>
                    <CgTrees fontSize={"2rem"} className={"mr-1.5"}/>
                    WOOD IDE
                </Text>
            </Flex>
            {professor && LinkItems.map((link) => (
                <NavItem as={ReactLink} key={link.name} icon={link.icon} to={link.to}>
                    {link.name}
                </NavItem>
            ))}
            {!professor ? (<>
                <NavItem as={ReactLink} key={"로그인"} icon={TbLogin} to={"/professor/login"}>
                    로그인
                </NavItem>
                <NavItem as={ReactLink} key={"회원가입"} icon={AiOutlineUserAdd} to={"/professor/register"}>
                    회원가입
                </NavItem>
            </>) : <NavItem as={"button"} key={"로그아웃"} icon={TbLogout} to={"/logout"} onClick={() => {
                    setProfessor(null);
                    delete localStorage['professor'];
            }
            }>
                로그아웃
            </NavItem>
            }
        </Box>
    );
};

function MainSideBar() {
    return (
            <SidebarContent
                display={{base: 'none', md: 'block'}}
            />
    )
}

export function SideBar({title, subjects}) {
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
