import React from "react";
import { Form, Input } from "antd";
import styled from "styled-components";

const NicknameEditForm = () => {
  return (
    <NicknameFormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </NicknameFormWrapper>
  );
};

export default NicknameEditForm;

const NicknameFormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;
