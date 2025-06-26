export const ERROR_MESSAGES = {
  // 인증 관련 에러 메시지
  AUTH: {
    LOGIN_REQUIRED: "로그인이 필요합니다.",
  },

  // 일반 에러 메시지
  COMMON: {},

  // 데이터 관련 에러 메시지
  DATA: {
    NOT_FOUND: "요청한 데이터를 찾을 수 없습니다.",
    NOT_FOUND_SOLDIER: "해당하는 군인을 찾을 수 없습니다.",
    FETCH_FAILED: "정보를 가져오는데 실패했습니다.",
  },

  // 편지 관련 에러 메세지
  LETTER: {
    INVALID_INPUT_DATA: "입력이 잘못되었습니다.",
    LETTER_POST_FAILED: "편지 작성에 실패했습니다.",
    NOT_FOUND_LETTER: "편지를 찾을 수 없습니다.",
    MISSING_REQUIRED_IDS: "군인 아이디 또는 편지 아이디가 존재하지 않습니다.",
    MISSING_SENDER_ID: "senderId가 존재하지 않습니다.",
  },
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type AuthErrorMessageKey = keyof typeof ERROR_MESSAGES.AUTH;
export type CommonErrorMessageKey = keyof typeof ERROR_MESSAGES.COMMON;
export type DataErrorMessageKey = keyof typeof ERROR_MESSAGES.DATA;
