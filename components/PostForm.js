import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button, Form, Input, Upload } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const [text, onChangeText, setText] = useInput();

  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text]);

  const onChange = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <FormWrapper encType="mulitpart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 재미있는 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChange}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonStyle type="primary" htmlType="submit">
          짹짹
        </ButtonStyle>
      </div>
      <div>
        {imagePaths.map((v, i) => {
          <imagePathsDiv>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </imagePathsDiv>;
        })}
      </div>
    </FormWrapper>
  );
};

export default PostForm;

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const ButtonStyle = styled(Button)`
  float: right;
`;

const imagePathsDiv = styled.div`
  display: inline-block;
`;
