export type uploadedFileType = {
  file: File;
  url: string;
  type: "image" | "video";
};

export type Letter = {
  id: number;
  writer: string;
  content: string;
  createDt: string;
  isFavorite?: boolean;
  fileUrl?: string;
  parentId?: number;
};
