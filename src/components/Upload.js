import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import routes from "../routes";
import Button from "./auth/Button";
import PageTitle from "./PageTitle";

const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      hashtags {
        id
      }
      comments {
        id
      }
      commentNumber
      isMine
      isLiked
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
  const createFeedPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
    }
  };
  const history = useHistory();
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO);
  const { register, handleSubmit, getValues } = useForm();
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { file, caption } = getValues();
    uploadPhoto({
      variables: {
        file: file[0],
        caption,
      },
      update: createFeedPhoto,
    });
    history.push(routes.home);
  };
  return (
    <Container>
      <PageTitle title="Upload" />
      <Wrapper>
        <div>
          <form onSubmit={handleSubmit(onSubmitValid)} autoComplete="off">
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
