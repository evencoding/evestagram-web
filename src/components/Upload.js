import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./auth/Button";
import PageTitle from "./PageTitle";

const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      # user
      # file
      # caption
      # likes
      # comments
    }
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
  input {
    margin-bottom: 10px;
  }
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 35px 40px 25px 40px;
  background-color: ${(props) => props.theme.boxColor};
`;

function Upload() {
  const [uploadPhoto] = useMutation(UPLOAD_PHOTO);
  const { register, handleSubmit, getValues } = useForm();
  const onSubmitValid = () => {
    const { file, caption } = getValues();
    uploadPhoto({
      variables: {
        file: file[0],
        caption,
      },
    });
  };
  return (
    <Container>
      <PageTitle title="Upload" />
      <Wrapper>
        <div>
          <form onSubmit={handleSubmit(onSubmitValid)} autocomplete="off">
            <input
              ref={register}
              name="file"
              type="file"
              required
              accept="image/png, image/jpeg"
            />
            <input
              ref={register}
              name="caption"
              type="text"
              placeholder="Write a caption..."
            />
            <Button type="submit" />
          </form>
        </div>
      </Wrapper>
    </Container>
  );
}

export default Upload;
