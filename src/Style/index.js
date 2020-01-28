import styled from "styled-components";
import MaskedInput from "react-text-mask";

export const Form = styled.div`
  display: flex;
  padding: ${props => props.pad || 0};
  ${props => (props.marginTop ? "margin: 10px 0px 0px;" : null)};
  align-self: ${props => props.self};
  flex-direction: ${props => props.direction};
  width: ${props => props.w};
  height: ${props => props.h};
  ${props => (props.bg ? `background: ${props.bg}` : null)};
  ${props => (props.fColor ? `color: ${props.fColor}` : null)};
  ${props => (props.content ? `justify-content: ${props.content}` : null)};
  ${props => (props.items ? `align-items: ${props.items}` : null)};
`;
export const CardBlock = styled.div`
  display: flex;
  flex-wrap: ${props => (props.wrap ? "wrap" : null)};
  background: ${props => props.bgColor || "#fff"};
  margin: ${props => props.margin || "10px auto"};
  width: ${props => props.w};
  height: ${props => props.h};
  ${props => (props.overflow ? `overflow: ${props.overflow};` : null)};
  box-shadow: 0px 0px 10px 0.5px rgba(0, 0, 0, 0.1);
`;
export const CardButton = styled.div`
  display: flex;
  flex-wrap: ${props => (props.wrap ? "wrap" : null)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || "#fff"};
  height: ${props =>
    props.size === "small"
      ? "50px"
      : props.size === "md"
      ? "100px"
      : props.size === "high"
      ? "200px"
      : "36px"};
  width: ${props =>
    props.size === "small"
      ? "50px"
      : props.size === "md"
      ? "100px"
      : props.size === "high"
      ? "200px"
      : "36px"};
  border-radius: 5px;
  border: ${props => props.border || "1px solid black"};
  margin: 0px 10px;
  padding: 5px 10px;
  color: ${props => props.fColor || "#333"};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${props => props.hColor || "#333"};
    color: ${props => props.fhColor || "#fff"};
  }

  > span {
    margin-left: 10px;
  }
`;
export const Wrapper = styled.div`
  margin: 2px;
  display: flex;
  height: ${props => props.h};
  width: ${props => props.w};
  justify-content: ${props => props.content || "baseline"};
  align-items: ${props => props.items || "flex-start"};
  flex-wrap: wrap;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: ${props => (props.wrap ? "wrap" : null)};
  margin-right: ${props => props.marginRight || 0};
  background: ${props => props.bgColor || null};
  padding: ${props => props.pad || 0};
  align-self: ${props => props.self};
  align-items: ${props => props.items};
  justify-content: ${props => props.content};
  flex-direction: ${props => props.direction};
  width: ${props => props.w};
  height: ${props => props.h};
  ${props => (props.overflow ? `overflow: ${props.overflow};` : null)};
  ${props =>
    props.shadow ? "box-shadow: 0px 0px 10px .5px rgba(0, 0, 0, 0.1);" : null};
`;
export const Content = styled.div`
  display: flex;
  flex-wrap: ${props => (props.wrap ? "wrap" : null)};
  padding: ${props => props.pad || 0};
  background: ${props => props.bgColor || null};
  align-self: ${props => props.self};
  align-items: ${props => props.items};
  justify-content: ${props => props.content};
  flex-direction: ${props => props.direction};
  width: ${props => props.w};
  height: ${props => props.h};
`;
export const MaskInput = styled(MaskedInput)`
  margin-bottom: 10px;
  ${props => (props.marginLeft ? "margin: 0 10px 10px 0;" : null)};
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  color: #333;
  ${props => (props.borderless ? "border: 0" : "border: 1px solid #999;")};
  ${props =>
    props.bgless ? "background: transparent" : "background: #e6e6e6;"};
  ${props => (props.bold ? "font-weight: bold" : null)};
  width: ${props => props.w};
  padding: ${props => props.pad};
  text-transform: uppercase;

  &:focus {
    border: 1px solid #999;
    border-radius: 4px;
  }
`;
export const Input = styled.input`
  margin-bottom: ${props => props.mBottom || "10px"};
  ${props => (props.marginleft ? "margin: 0 10px 10px 0;" : null)};
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  color: ${props => (props.bg ? `${props.fColor}` : "#333")};
  ${props => (props.borderless ? "border: 0" : "border: 1px solid #999;")};
  ${props =>
    props.bgless ? "background: transparent" : "background: #e6e6e6;"};
  ${props => (props.bg ? `background: ${props.bg}` : null)};
  ${props => (props.bold ? "font-weight: bold" : null)};
  width: ${props => props.w};
  padding: ${props => props.pad};
  text-transform: uppercase;

  &:focus {
    ${props =>
      props.borderfocus ? props.borderfocus : "border: 1px solid #999;"};
    border-radius: 4px;
  }
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  ${props => (props.marginleft ? "margin: 0 10px 10px 0;" : null)};
  font-size: 12px;
  text-align: center;
  height: 37px;
  line-height: 20px;
  color: #333;
  text-transform: uppercase;
  width: ${props => props.w};
  ${props => (props.borderless ? "border: 0" : "border: 1px solid #999;")};
  ${props =>
    props.bgless ? "background: transparent" : "background: #e6e6e6;"};
  ${props => (props.bold ? "font-weight: bold" : null)};

  &:focus {
    border: 1px solid #999;
    border-radius: 4px;
  }
`;
export const TextArea = styled.textarea`
  width: ${props => props.w};
  resize: none;
  margin-bottom: 10px;
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  border: 1px solid #999;
  background: #eee;
  font-size: 12px;
  color: #333;

  &:focus {
    font-size: 14px;
    font-weight: bold;
  }
`;
export const ButtonDefault = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${props =>
    props.size === "small"
      ? "16px"
      : props.size === "md"
      ? "20px"
      : props.size === "high"
      ? "26px"
      : "20px"};
  background: ${props =>
    props.tp === "success"
      ? "#2eb82e"
      : props.tp === "warn"
      ? "#ff0000"
      : props.tp === "action"
      ? "#1a75ff"
      : "#999"};
  height: ${props =>
    props.size === "small"
      ? "28px"
      : props.size === "md"
      ? "36px"
      : props.size === "high"
      ? "48px"
      : "36px"};
  border-radius: 5px;
  border: 0px;
  margin: 0px 10px;
  padding: 5px 10px;
  color: #fff;
  font-weight: bold;
  &:hover {
    background: ${props =>
      props.tp === "success"
        ? "#248f24"
        : props.tp === "warn"
        ? "#b30000"
        : props.tp === "action"
        ? "#0052cc"
        : "#666"};
    background: ${props => (props.hColor ? props.hColor : null)};
    color: #fff;
  }

  > span {
    margin-left: 10px;
  }
`;
export const Table = styled.table`
  align-self: stretch;
  width: 100%;
  height: ${props => props.h};
  border-radius: 4px;
  background: ${props => props.bgColor || "#fff"};

  thead th {
    ${props =>
      props.titlenoborder ? "border: 0" : "border-bottom: 1px solid #eee"};
  }
  thead th {
    background: ${props => props.titleBgColor || "#fff"};
    color: ${props => props.titleColor || "#999"};
    text-align: ${props => props.titleAlign};
    padding: 12px;
    text-transform: uppercase;
  }
  tbody {
    width: 100%;
  }
  tbody {
    overflow-y: scroll;
  }
  tbody tr:not(:last-of-type) td {
    border-bottom: 1px solid #eee;
  }
  tbody tr td {
    text-transform: ${props => props.upper};
    padding: 12px;
    text-align: ${props => props.textAlign || "center"};
    vertical-align: middle;
    font-weight: bold;
    color: ${props => props.textColor || "#666"};
    font-size: ${props => props.fontSize};
    text-transform: uppercase;
  }
  tbody tr td:${props => props.childDefinied || "first"}-child {
    display: flex;
    justify-content: ${props => props.lastRowAlign || "flex-start"};
    flex-direction: row;
  }
`;
export const Link = styled.a`
  color: ${props => props.color || "#0052cc"};
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: ${props => props.fSize};

  &:hover {
    color: ${props => props.hColor || "#003380"};
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 15px;
`;
export const Desc = styled.h2`
  font-size: 18px;
  color: #999;
  margin-bottom: 15px;
`;
export const LinkDropdown = styled.div`
  margin: 0px 50px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    background-color: #0052cc;
  }

  li a,
  .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover,
  .dropdown:hover .dropbtn {
    background-color: red;
  }

  li.dropdown {
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;
