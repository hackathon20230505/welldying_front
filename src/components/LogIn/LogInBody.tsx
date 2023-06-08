import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onSignIn } from "../../apis/users/signIn";
import axios, { AxiosError } from "axios";
import {
  isValidUserEmailFunc,
  isValidUserPasswordFunc,
} from "../../utils/isValid/isValidUserData";
import CommonContentContainer from "../Common/CommonContentContainer";
import { accessTokenState } from "../../state/tokenState";
import { useRecoilState } from "recoil";
import { getRefreshToken } from "../../utils/interceptors/getRefreshToken";

type LogInBodyProps = {};

const LogInBody: FunctionComponent<LogInBodyProps> = () => {
  const [tokenState, setTokenState] = useRecoilState(accessTokenState);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [isValidUserEmail, setIsValidUserEmail] = useState<boolean>(true);
  const [isValidUserPassword, setIsValidUserPassword] = useState<boolean>(true);

  const navigate = useNavigate();

  /** user email input 값 설정 */
  const onChangeUserEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currValue = event.target.value;

    if (currValue === null) return;

    setUserEmail(currValue);

    if (isValidUserEmailFunc(currValue) === true) {
      setIsValidUserEmail(true);
    } else {
      setIsValidUserEmail(false);
    }
  };

  /** user password input 값 설정 */
  const onChangeUserPasswordHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const currValue = event.target.value;
    if (currValue === null) return;
    setUserPassword(currValue);

    if (isValidUserPasswordFunc(currValue) === true) {
      setIsValidUserPassword(true);
    } else {
      setIsValidUserPassword(false);
    }
  };

  const onClickLogInButtonHandler = async () => {
    console.log("hello");
    try {
      const loginProps = {
        username: userEmail,
        password: userPassword,
      };

      const result = await onSignIn(loginProps);

      console.log(`result`, result);

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정

      // setTokenState(result?.data?.accessToken);

      if (result) {
        alert("로그인되었습니다.");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError);
      }
    }
  };

  console.log(`axios`, axios.defaults.headers.common["Authorization"]);

  return (
    <CommonContentContainer xPadding="5%">
      <LogInInputGroupContainer>
        <LogInInputLabel htmlFor="userEmail">이메일</LogInInputLabel>
        <LogInInput
          id="userEmail"
          type="text"
          placeholder="예) pmr7348.naver.com"
          isValidUserEmail={isValidUserEmail}
          value={userEmail}
          onChange={onChangeUserEmailHandler}
        />
        {isValidUserEmail === false && (
          <NotValidText>이메일 주소를 확인하세요.</NotValidText>
        )}
      </LogInInputGroupContainer>
      <LogInInputGroupContainer>
        <LogInInputLabel htmlFor="userPassword">비밀번호</LogInInputLabel>
        <LogInInput
          id="userPassword"
          type="password"
          placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
          isValidUserPassword={isValidUserPassword}
          value={userPassword}
          onChange={onChangeUserPasswordHandler}
        />
        {isValidUserPassword === false && (
          <NotValidText>
            계정이 존재하지 않거나 비밀번호가 옳바르지 않습니다.
          </NotValidText>
        )}
      </LogInInputGroupContainer>
      <LogInButton onClick={onClickLogInButtonHandler}>로그인</LogInButton>
      <FindPWContainer>
        <FindPWDescription>비밀번호를 잊으셨나요?</FindPWDescription>
        <Link to="/findpw/1">비밀번호 찾기 {">"}</Link>
      </FindPWContainer>
    </CommonContentContainer>
  );
};

export default LogInBody;

const LogInBodyContainer = styled.div`
  margin-top: 40px;
`;

const LogInInputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;
`;

const LogInInputLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

interface ILogInInputTypes {
  isValidUserEmail?: boolean;
  isValidUserPassword?: boolean;
}

const LogInInput = styled.input<ILogInInputTypes>`
  padding: 13px 12px 14px 12px;

  border-bottom: ${({ isValidUserEmail, isValidUserPassword }) =>
    isValidUserEmail
      ? "1px solid var(--strong-purple-800)"
      : isValidUserPassword
      ? "1px solid var(--strong-purple-800)"
      : "1px solid #F31919"};
  border-radius: 0px;

  ::placeholder {
    color: var(--gray-purple);
  }
`;

const LogInButton = styled.button`
  width: 100%;
  height: 56px;

  margin-bottom: 12px;

  background-color: var(--main-color);
  border-radius: 4px;

  font-weight: 700;
`;

const FindPWContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > a {
    color: var(--white);
    font-size: 14px;
    font-weight: 500;
  }
`;

const FindPWDescription = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #999999;
`;

const NotValidText = styled.p`
  margin-top: 6px;

  font-weight: 400;
  font-size: 12px;
  color: #f31919;
`;
