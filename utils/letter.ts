/**
 * 편지 데이터를 컴포넌트에서 사용할 수 있는 형태로 변환
 */
export const formatLetterData = (letterData: any) => ({
  ...letterData,
  hasReply: !!letterData.hasReply,
});
