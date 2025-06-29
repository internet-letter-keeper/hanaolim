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
  FRIENDS: {
    ADD_SUCCESS: "친구가 추가되었습니다.",
    DELETE_SUCCESS: "성공적으로 삭제되었습니다.",
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    LOGIN_REQUIRED: "로그인이 필요합니다.",
    WRONG_PASSWORD: "현재 비밀번호 확인에 실패했습니다.",
    CHANGE_PASSWORD_FAILED: "비밀번호 변경에 실패했습니다.",
  },
  DATA: {
    NOT_FOUND: "요청한 데이터를 찾을 수 없습니다.",
    FETCH_FAILED: "정보를 가져오는데 실패했습니다.",
    USER_ID_NUMBER: "유저 ID는 숫자여야 합니다.",
  },
  COMMON: {
    UPDATE_FAILED: "정보 업데이트에 실패했습니다.",
    SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  SOLDIER: {
    NOT_FOUND: "해당하는 군인을 찾을 수 없습니다.",
    DATE_UPDATE_FAILED: "입대일/전역일 변경에 실패했습니다.",
    INVALID_ACCOUNT: "계좌번호를 불러오지 못했습니다. 다시 시도해주세요.",
  },
  LETTER: {
    INVALID_INPUT: "입력이 잘못되었습니다.",
    POST_FAILED: "편지 작성에 실패했습니다.",
    NOT_FOUND_OR_ACCESS_DENIED: "편지를 찾을 수 없거나 접근 권한이 없습니다.",
    MISSING_REQUIRED_IDS: "필수 아이디가 누락되었습니다.",
    UPDATE_READ_DATE_FAILED: "편지 읽은 날짜 업데이트에 실패했습니다.",
    ID_IS_NUMBER: "편지 ID는 숫자여야 합니다.",
  },
  POINT: {
    FETCH_FAILED: "포인트 내역을 가져오는 데 실패했습니다.",
  },
  FRIENDS: {
    INVALID_CODE: "코드를 다시 확인해주세요",
    ALREADY_FRIEND: "이미 친구입니다.",
    ADD_FAILED: "친구 추가에 실패했습니다. 다시 시도해주세요.",
    DELETE_FAILED: "삭제 도중 문제가 생겼습니다 다시 시도해 주세요",
  },
  FILE: {
    UPLOAD_FAILED: "파일 업로드에 실패했습니다. 다시 시도해주세요.",
    UNAUTHORIZED_UPLOAD: "업로드 권한이 없습니다. 다시 시도해주세요.",
    FILE_TOO_LARGE: "파일 크기가 너무 큽니다.",
    S3_UPLOAD_FAILED: "S3 업로드에 실패했습니다.",
  },
} as const;
