export const VIDEO_EXTENSIONS = [".mov", ".mp4", ".webm"] as const;

export const isVideoFile = (url: string): boolean => {
  const lowerUrl = url.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lowerUrl.endsWith(ext));
};
