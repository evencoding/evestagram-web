// import sanitizeHtml from "sanitize-html";
import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DeleteBtn = styled.button`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  border: none;
  background-color: inherit;
  cursor: pointer;
  opacity: 0.5;
`;

function Comment({ id, author, payload, isMine, photoId }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  //   const cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
  //     {
  //       allowedTags: ["mark"],
  //     }
  //   );
  return (
    <CommentContainer>
      <div>
        <Link to={`/users/${author}`}>
          <FatText>{author}</FatText>
        </Link>
        <CommentCaption
        // dangerouslySetInnerHTML={{
        //   __html: cleanedPayload,
        // }}
        >
          {payload &&
            payload.split(" ").map((word, index) =>
              /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
                <React.Fragment key={index}>
                  <Link to={`/hashtags/${word}`}>{word} </Link>
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>{word} </React.Fragment>
              )
            )}
        </CommentCaption>
      </div>
      {isMine ? <DeleteBtn onClick={onDeleteClick}>Delete</DeleteBtn> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  isMine: propTypes.bool,
  id: propTypes.number,
  photoId: propTypes.number,
  author: propTypes.string.isRequired,
  payload: propTypes.string,
};

export default Comment;
