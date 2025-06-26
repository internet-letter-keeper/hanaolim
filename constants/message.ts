export const SUCCESS_MESSAGES = {
  COMMON: {
    SUCCESS: "요청이 성공적으로 처리되었습니다.",
  },
  AUTH: {
    LOGIN_SUCCESS: "로그인되었습니다.",
  },
  SOLDIER: {
    DATE_UPDATE_SUCCESS: "입대일/전역일이 변경되었습니다.",
  },
  LETTER: {
    POST_SUCCESS: "편지가 성공적으로 작성되었습니다.",
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    LOGIN_REQUIRED: "로그인이 필요합니다.",
  },
  DATA: {
    NOT_FOUND: "요청한 데이터를 찾을 수 없습니다.",
    FETCH_FAILED: "정보를 가져오는데 실패했습니다.",
  },
  SOLDIER: {
    NOT_FOUND: "해당하는 군인을 찾을 수 없습니다.",
    DATE_UPDATE_FAILED: "입대일/전역일 변경에 실패했습니다.",
  },
  LETTER: {
    INVALID_INPUT: "입력이 잘못되었습니다.",
    POST_FAILED: "편지 작성에 실패했습니다.",
    NOT_FOUND: "편지를 찾을 수 없습니다.",
    MISSING_REQUIRED_IDS: "필수 아이디가 누락되었습니다.",
  },
} as const;
