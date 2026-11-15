export interface JensenClip {
  id: string;
  title: string;
  theme: string;
  duration: string;
  description: string;
  reviewNote?: string;
  sourceTitle: string;
  sourcePublisher: string;
  sourceTime: string;
  sourceUrl: string;
  video: string;
  poster: string;
  captions: string;
  transcript: string[];
  featured: boolean;
  sharedOnX: boolean;
  xUrl: string | null;
}
