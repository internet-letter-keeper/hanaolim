export type uploadedFileType = {
  file: File;
  url: string;
  type: "image" | "video";
};

type Letter = {
  letterId: number;
  nickname?: string;
  content: string;
  fileUrl?: string;
  iconId?: number;
  createDate: string;
  readDate?: string | null;
  parentLetterId?: number | null;
  receiverId: number;
  senderId: number;
  Favorite: {
    isFavorite: boolean;
    userId: number;
  }[];
};

export type ReceivedTotalLetter = { unreadLetter: number; totalLetter: number };
