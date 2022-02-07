import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SFacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function FacebookLogin() {
  return (
    <SFacebookLogin>
      <FontAwesomeIcon icon={faFacebookSquare} />
      <span>Log in with Facebook</span>
    </SFacebookLogin>
  );
}

export default FacebookLogin;
