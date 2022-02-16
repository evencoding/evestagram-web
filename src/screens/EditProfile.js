import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
import NotAuthorized from "./NotAuthorized";

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;

const AvatarBio = styled.div`
  margin-bottom: 30px;
`;

const EditAvatar = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  Input {
    width: 100px;
    line-height: 20px;
    padding: 5px;
    margin-left: 15px;
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const Avatar = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-color: #2c2c2c;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $avatar: Upload
    $lastName: String
    $firstName: String
    $bio: String
    $password: String
  ) {
    editProfile(
      avatar: $avatar
      lastName: $lastName
      firstName: $firstName
      bio: $bio
      password: $password
    ) {
      firstName
      lastName
      bio
      avatar
      ok
      error
    }
  }
`;

function EditProfile() {
  const { username } = useParams();
  const { data } = useUser();

  const updateProfile = (cache, result) => {
    const {
      data: {
        editProfile: { firstName, lastName, bio, avatar, ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `User:${username}`,
        fields: {
          firstName() {
            return firstName;
          },
          lastName() {
            return lastName;
          },
          bio() {
            return bio;
          },
          avatar(prev) {
            return avatar ? avatar : prev;
          },
        },
      });
    }
  };

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update: updateProfile,
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      bio: data?.me?.bio,
      firstName: data?.me?.firstName,
      lastName: data?.me?.lastName,
      isDeveloper: true,
    },
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    editProfile({
      variables: {
        avatar: data?.avatar[0] ? data?.avatar[0] : undefined,
        firstName: data?.firstName.length ? data?.firstName : undefined,
        lastName: data?.lastName.length ? data?.lastName : undefined,
        password: data?.password.length ? data?.password : undefined,
        bio: data?.bio.length ? data?.bio : undefined,
      },
    });
  };
  return (
    <>
      {username === data?.me?.username ? (
        <Container>
          <AvatarBio>
            <EditAvatar>
              <Avatar src={data?.me?.avatar} />
              <Input
                ref={register({
                  mode: "onChange",
                })}
                name="avatar"
                type="file"
              />
            </EditAvatar>
            <Input
              ref={register({
                mode: "onChange",
              })}
              name="bio"
              type="text"
              placeholder="Bio"
            />
          </AvatarBio>
          <Wrapper>
            <PageTitle title={`${username}'s Edit Profile`} />
            <FormBox>
              <HeaderContainer>
                <h1>Edit Profile</h1>
              </HeaderContainer>
              <form
                onSubmit={handleSubmit(onSubmitValid)}
                style={{ marginTop: "-10px" }}
                autoComplete="off"
              >
                <Input
                  name="username"
                  type="text"
                  value={data?.me?.username}
                  disabled={true}
                  style={{ opacity: "0.7" }}
                />
                <Input
                  name="email"
                  type="text"
                  value={data?.me?.email}
                  disabled={true}
                  style={{ opacity: "0.7" }}
                />
                <Input
                  ref={register()}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  hasError={Boolean(errors?.firstName?.message)}
                />
                <FormError message={errors?.firstName?.message} />
                <Input
                  ref={register()}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  hasError={Boolean(errors?.lastName?.message)}
                />
                <FormError message={errors?.lastName?.message} />
                <Input
                  ref={register()}
                  name="password"
                  type="password"
                  placeholder="Password"
                  hasError={Boolean(errors?.password?.message)}
                />
                <FormError message={errors?.password?.message} />
                <Button
                  type="submit"
                  value={loading ? "Loading..." : "Submit"}
                />
                <FormError message={errors?.result?.message} />
              </form>
            </FormBox>
          </Wrapper>
        </Container>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default EditProfile;
