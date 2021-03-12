import React, { useCallback, useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const imageInput = useRef();

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
   
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <FormWrapper encType="mulitpart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 재미있는 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonStyle type="primary" htmlType="submit">
          짹짹
        </ButtonStyle>
      </div>
      <div>
        {imagePaths.map((v) => {
          <imagePathsDiv>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
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