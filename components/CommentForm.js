import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

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
