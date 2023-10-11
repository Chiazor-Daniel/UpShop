import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



const Container = styled.div`
position: "relative";
background-color: "#232D3F";
transition: ease-in-out 2s;
top: 0;
z-index: 99;
width: 100%;
${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 0px 30px 0px 30px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 2px solid lightgray;
  display: flex;
  width: 300px;
  gap: 10px;
  height: 30px;
  border-radius: 20px;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  height: 100%;
  width: 96%;
  color: white;
  &:focus{
    outline: none;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 24 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
            <Logo>UpShop</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/register" style={{textDecoration: "none", color: "inherit"}}>
              <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{textDecoration: "none", color: "inherit"}}>
              <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/cart" style={{textDecoration: "none", color: "inherit"}}>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
