// 이름 검증
export const checkNameValidation = (name: string | "") => {
  // 길이 검증
  if (name.length < 2 || name.length > 8) {
    return {
      valid: false,
      message: "한글 2글자 이상 8자 이하로 입력해주세요.",
    };
  }

  // 한글만 허용 (영어, 숫자, 특수문자 불가)
  const koreanOnlyRegex = /^[가-힣]+$/;
  if (!koreanOnlyRegex.test(name)) {
    return {
      valid: false,
      message: "영어, 숫자, 특수문자, 독립된 자음/모음 사용 불가합니다",
    };
  }

  return { valid: true, message: "" };
};

// 이메일 검증
export const checkEmailValidation = (email: string | "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
};

// 비밀번호 검증
export const checkPasswordValidation = (password: string | "") => {
  if (password.length < 8 || password.length > 20) {
    return {
      valid: false,
      message: "비밀번호의 길이가 8~20자가 되어야 합니다.",
    };
  }
  const compositionRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  if (!compositionRegex.test(password)) {
    return {
      valid: false,
      message: "영문자, 숫자, 특수문자를 모두 포함해야 합니다.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};
