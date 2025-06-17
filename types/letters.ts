export type uploadedFileType = {
  file: File;
  url: string;
  type: "image" | "video";
};

export type ReceivedTotalLetter = { unreadLetter: number; totalLetter: number };
