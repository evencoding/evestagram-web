import { useReactiveVar } from "@apollo/client";
import {
  faCompass,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import DarkMode from "./DarkMode";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 0 15px 0 15px;
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  h1 {
    font-size: 30px;
    font-weight: 600;
    font-family: "Tangerine", cursive;
  }
`;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <h1>Evestagram</h1>
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <IconsContainer>
                <Icon>
                  <Link to={routes.upload}>
                    <FontAwesomeIcon icon={faPlusSquare} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <Link to={routes.home}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  {/* <FontAwesomeIcon icon={faCompass} size="lg" /> */}
                  <DarkMode />
                </Icon>
                <Icon>
                  <Link to={`/users/${data?.me?.username}`}>
                    <Avatar url={data?.me?.avatar} />
                  </Link>
                </Icon>
              </IconsContainer>
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
