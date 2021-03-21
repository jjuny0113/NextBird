import React,{useCallback}  from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <NicknameFormWrapper>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </NicknameFormWrapper>
  );
};

export default NicknameEditForm;

const NicknameFormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;
