export type uploadedFileType = {
  file: File;
  url: string;
  type: "image" | "video";
};

export type Letter = {
  letterId: number;
  nickname: string;
  content: string;
  fileUrl?: string;
  iconId?: number;
  createDate: string;
  readDate?: string | null;
  parentLetterId?: number | null;
  receiverId: number;
  senderId: number;
  receiverName: string;
  senderName: string;
  isFavorite: boolean;
};

export type ReceivedTotalLetter = { unreadLetter: number; totalLetter: number };
