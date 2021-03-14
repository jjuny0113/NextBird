import React, { useCallback, useEffect } from "react";

import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, []);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItem>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <ButtonPostition type="primary" htmlType="submit">
          삐약
        </ButtonPostition>
      </FormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const ButtonPostition = styled(Button)`
  position: "absolute";
  right: 0;
  bottom: -40;
`;
