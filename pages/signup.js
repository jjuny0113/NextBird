import { useState, useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";
import wrapper from "../store/configureStore";

const Signup = () => {
  const [email, onChangeEmail] = useInput("");

  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [nickname, onChangeNickname] = useInput("");

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();
  const { me, signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  });

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
  });

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) return setPasswordCheck(true);
    if (!term) return setTermError(true);
    console.log("inSubmit", email, nickname, password);
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | nodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            type="email"
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <PasswordErrorMessage>
              비밀번호가 일치하지 않습니다.
            </PasswordErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            개인정보 제공에 동의하십니까?
          </Checkbox>
          {termError && <TermMessage>약관에 동의하셔야 합니다.</TermMessage>}
        </div>
        <TermButtonDiv>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </TermButtonDiv>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Signup;

const PasswordErrorMessage = styled.div`
  color: red;
`;

const TermMessage = styled.div`
  color: red;
`;

const TermButtonDiv = styled.div`
  margin-top: 10px;
`;
