import { FunctionComponent, useState } from "react";
import styled, { css } from "styled-components";
import CheckBox from "../Common/CheckBox";
import { useRecoilState } from "recoil";
import {
  isCheckedState,
  IIsCheckedStateTypes,
} from "./atoms/TermsOfServiceAtoms";
import { onSignup } from "../../apis/users/signup";
import { IUserInfoStateTypes, UserInfoState } from "./atoms/UserInfoAtoms";
import PrivacyPolicyModalComponent from "./PrivacyPolicyModalComponent";
import TermsOfServiceModalComponent from "./TermsOfServiceModalComponent";
type SignUpAgreeModalContentProps = {};

const SignUpAgreeModalContent: FunctionComponent<
  SignUpAgreeModalContentProps
> = () => {
  /** 전체 동의 */
  const [isChecked, setIsChecked] =
    useRecoilState<IIsCheckedStateTypes>(isCheckedState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalType, setOpenModalType] = useState(-1);

  const { isAllChecked } = isChecked;

  /** 사용자 데이터 */
  const [userInfo] = useRecoilState<IUserInfoStateTypes>(UserInfoState);

  const onClickIsAllCheckedHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // 1. 모두 동의 활성화 시 나머지 동의 활성화
    if (!isAllChecked) {
      setIsChecked({
        ...isChecked,
        isAllChecked: true,
        isCollectPersonalInfoChecked: true,
        isTermsAndConditionsChecked: true,
      });
    }
    // 2. 모두 동의 비활성화 시 나머지 동의 비활성화
    if (isAllChecked) {
      setIsChecked({
        ...isChecked,
        isAllChecked: false,
        isCollectPersonalInfoChecked: false,
        isTermsAndConditionsChecked: false,
      });
    }
  };

  const onClickIsCollectPersonalInfoCheckedHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();

    setIsChecked((prevState) => {
      const newCollectPersonalInfoChecked =
        !prevState.isCollectPersonalInfoChecked;

      if (!newCollectPersonalInfoChecked) {
        return {
          ...prevState,
          isAllChecked: false,
          isCollectPersonalInfoChecked: newCollectPersonalInfoChecked,
        };
      } else {
        return {
          ...prevState,
          isCollectPersonalInfoChecked: newCollectPersonalInfoChecked,
        };
      }
    });
  };

  const onClickIsTermsAndConditionsCheckedHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();

    // 3. 나머지 동의 중 비활성화 시 모두 동의 비활성화
    setIsChecked((prevState) => {
      const newTermsAndConditionsChecked =
        !prevState.isTermsAndConditionsChecked;

      if (!newTermsAndConditionsChecked) {
        return {
          ...prevState,
          isAllChecked: false,
          isTermsAndConditionsChecked: newTermsAndConditionsChecked,
        };
      } else {
        // 개인정보 동의 체크 상태를 토글
        return {
          ...prevState,
          isTermsAndConditionsChecked: newTermsAndConditionsChecked,
        };
      }
    });
  };

  const onClickSignUpAgreeButtonHandler = () => {
    const { userEmail, userPassword, userBirth } = userInfo;

    const signupProps = {
      email: userEmail,
      password: userPassword,
      birth: userBirth,
    };

    const result = onSignup(signupProps);

    console.log(result);
  };

  const onClickViewTexts = (type: "term" | "privacy") => {
    if (type == "term") {
      setIsModalOpen(true);
      setOpenModalType(0);
      console.log("term");
    } else {
      setIsModalOpen(true);
      setOpenModalType(1);
      console.log("privacy");
    }
  };

  return (
    <>
      <SignUpAgreeModalContentContainer isModalOpen={isModalOpen}>
        <SignUpAgreeModalContentTitle>
          웰리빙을 쓰려면 동의가 필요해요.
        </SignUpAgreeModalContentTitle>

        <SignUpAgreeCheckGroupContainer>
          <CheckBoxGroupContainer>
            <IsCheckedContainer onClick={onClickIsAllCheckedHandler}>
              <CheckBox isChecked={isChecked.isAllChecked} />
            </IsCheckedContainer>
            <SignUpAgreeCheckText>네, 모두 동의합니다.</SignUpAgreeCheckText>
          </CheckBoxGroupContainer>
        </SignUpAgreeCheckGroupContainer>

        <HorizonDivider />

        <SignUpAgreeCheckGroupContainer>
          <CheckBoxGroupContainer>
            <IsCheckedContainer
              onClick={onClickIsCollectPersonalInfoCheckedHandler}
            >
              <CheckBox isChecked={isChecked.isCollectPersonalInfoChecked} />
            </IsCheckedContainer>
            <SignUpAgreeCheckText>
              (필수) 개인정보 처리방침에 동의
            </SignUpAgreeCheckText>
          </CheckBoxGroupContainer>
          <SignUpAgreeViewText onClick={() => onClickViewTexts("privacy")}>
            보기
          </SignUpAgreeViewText>
        </SignUpAgreeCheckGroupContainer>

        <SignUpAgreeCheckGroupContainer>
          <CheckBoxGroupContainer>
            <IsCheckedContainer
              onClick={onClickIsTermsAndConditionsCheckedHandler}
            >
              <CheckBox isChecked={isChecked.isTermsAndConditionsChecked} />
            </IsCheckedContainer>

            <SignUpAgreeCheckText>(필수) 이용약관에 동의</SignUpAgreeCheckText>
          </CheckBoxGroupContainer>
          <SignUpAgreeViewText onClick={() => onClickViewTexts("term")}>
            보기
          </SignUpAgreeViewText>
        </SignUpAgreeCheckGroupContainer>

        <SignUpAgreeButton onClick={onClickSignUpAgreeButtonHandler}>
          동의
        </SignUpAgreeButton>
      </SignUpAgreeModalContentContainer>
      <CommonModalWrapper>
        <PrivacyPolicyModalWrapper openModalType={openModalType}>
          <PrivacyPolicyModalComponent bottomMargin={0} />
        </PrivacyPolicyModalWrapper>

        <TermsModalWrapper openModalType={openModalType}>
          <TermsOfServiceModalComponent bottomMargin={0} />
        </TermsModalWrapper>
      </CommonModalWrapper>
    </>
  );
};

export default SignUpAgreeModalContent;

interface ISignUpAgreeModalContentContainerProps {
  isModalOpen: boolean;
}

const SignUpAgreeModalContentContainer = styled.div<ISignUpAgreeModalContentContainerProps>`
  ${({ isModalOpen }) =>
    isModalOpen
      ? "min-height: 100vh; opacity: 0;"
      : "min-height: 0vh; opacity: 1;"};
  transition: min-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const SignUpAgreeModalContentTitle = styled.p`
  margin: 20px 0;

  font-weight: 700;
  font-size: 18px;
`;

const SignUpAgreeCheckGroupContainer = styled.div`
  margin: 24px 0;

  display: flex;
  justify-content: space-between;
`;

const CheckBoxGroupContainer = styled.div`
  display: flex;
`;

const SignUpAgreeCheckText = styled.span`
  margin-left: 8px;

  font-weight: 400;
  font-size: 14px;
  color: var(--white);
`;

const SignUpAgreeViewText = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
`;

const SignUpAgreeButton = styled.button`
  width: 100%;
  height: 56px;

  margin-bottom: 12px;

  background-color: var(--main-color);
  border-radius: 4px;

  font-weight: 700;
`;

const HorizonDivider = styled.hr`
  color: var(--dark-pink-700);
  border: 1px solid var(--dark-pink-700);
`;

const IsCheckedContainer = styled.div``;

interface IModalWrapperProps {
  openModalType: number;
}

const modalWrapperCommon = css`
  max-height: 0vh;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const CommonModalWrapper = styled.div`
  background-color: white;
`;

const TermsModalWrapper = styled.div<IModalWrapperProps>`
  ${modalWrapperCommon}
  ${({ openModalType }) =>
    openModalType == 0
      ? "max-height: 100vh; opacity: 1;"
      : "max-height: 0vh; opacity: 0;"}
`;

const PrivacyPolicyModalWrapper = styled.div<IModalWrapperProps>`
  ${modalWrapperCommon}
  ${({ openModalType }) =>
    openModalType == 1
      ? "max-height: 100vh; opacity: 1;"
      : "max-height: 0vh; opacity: 0;"};
`;