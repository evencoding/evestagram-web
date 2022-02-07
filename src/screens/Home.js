import styled from "styled-components";
import { logUserOut } from "../apollo";
import { useHistory } from "react-router";

const Title = styled.h1``;

const Container = styled.div``;

function Home() {
  const history = useHistory();
  return (
    <Container>
      <Title>Welcome we did it!</Title>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </Container>
  );
}

export default Home;
