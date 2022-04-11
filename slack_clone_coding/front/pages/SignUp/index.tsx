import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import useSWR from 'swr';

const SignUp = () => {
  const { data: userData } = useSWR('/api/users', fetcher);
  const [signUpError, setSignUpError] = useState(false); //회원가입 실패
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [mismatchError, setMismatchError] = useState(false); //password === passwordCheck 판별한 bool값

  //useInput Hook을 이용하여 중복 제거
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, setPassword],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      //password와 passwordCheck이 같은지 확인
      setMismatchError(password !== e.target.value);
    },
    [password, setPasswordCheck],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }
      if (!mismatchError) {
        //요청에 대한 결과 state가 있다면 요청 보내기 이전에 꼭 초기화 해주자.
        //그렇지 않으면 이전 요청의 응답 값이 남아있는 문제가 생길 수 있다.
        setSignUpError(false);
        setSignUpSuccess(false);
        //회원가입 요청을 보낸다.
        axios
          .post('/api/users', { email, nickname, password })
          .then(() => {
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response?.data);
            setSignUpError(error.response?.data?.code === 403);
          });
      }
    },
    [email, nickname, password, mismatchError],
  );

  if (userData) {
    return <Redirect to="/workspace/sleact" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {/* bool 값에 따라 출력 여부가 결정되는 것들 */}
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
