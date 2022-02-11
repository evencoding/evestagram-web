import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";

const DarkModeBtn = styled.span`
  cursor: pointer;
  font-size: 18px;
`;

function DarkMode() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
    </DarkModeBtn>
  );
}

export default DarkMode;
