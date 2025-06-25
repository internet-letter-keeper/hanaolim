export type uploadedFileType = {
  file: File;
  url: string;
  type: "image" | "video";
};

export type Letter = {
  letterId: number;
  nickname: string | null;
  content: string;
  fileUrl?: string;
  iconId?: number;
  createDate: Date;
  readDate?: Date | null;
  parentLetterId?: number | null;
  receiverId: number;
  senderId: number;
  receiverName: string;
  senderName: string;
  isFavorite: boolean;
};
