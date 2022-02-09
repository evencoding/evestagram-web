import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/Avatar";
import { FatText } from "../../components/shared";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import propTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { FEED_QUERY } from "../../screens/Home";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: while;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 10px;
  max-width: 615px;
  border-radius: 10px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-self: center;
    font-size: 23px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      // cache.codify()
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
      // const fragment = gql`
      //   fragment BSName on Photo {
      //     isLiked
      //     likes
      //   }
      // `;
      // const result = cache.readFragment({
      //   id: fragmentId,
      //   fragment,
      // });
      // if ("isLiked" in result && "likes" in result) {
      //   const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
      //   cache.writeFragment({
      //     id: fragmentId,
      //     fragment,
      //     data: {
      //       isLiked: !cacheIsLiked,
      //       likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
      //     },
      //   });
      // }
      // cache.writeFragment({
      //   id: fragmentId,
      //   fragment,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1,
      //   },
      // });
    }
  };
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
    // 프로토타입
    // refetchQueries: [{ query: FEED_QUERY }],
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar lg url={user.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile alt="" src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: propTypes.number.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    username: propTypes.string.isRequired,
  }),
  caption: propTypes.string,
  file: propTypes.string.isRequired,
  isLiked: propTypes.bool.isRequired,
  likes: propTypes.number.isRequired,
  commentNumber: propTypes.number.isRequired,
};

export default Photo;
