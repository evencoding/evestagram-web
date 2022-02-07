import styled from "styled-components";

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  border-radius: 4px;
  &:hover {
    cursor: ${(props) => (props.disabled ? "" : "pointer")};
  }
`;

export default Button;
