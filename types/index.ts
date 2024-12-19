export interface Image {
  id: string;
  url: string;
  prompt: string;
  seed: number;
  size: string;
  model: string;
  steps: number;
  sampler: string;
  cfgScale: number;
  width: number;
  height: number;
  clipSkip: number;
  denoisingStrength: number;
  karras: boolean;
  hiResFix: boolean;
  isPublic: boolean;
  createdAt: Date;
  userId: string;
  likes: number;
  postProcessing?: string[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  imageId: string;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  userId: string;
  images: Image[];
}

export type GenerationType = 'text2img' | 'img2img' | 'controlnet';

export interface GenerationForm {
  prompt: string;
  seed: number;
  size: string;
  model: string;
  steps: number;
  sampler: string;
  cfgScale: number;
  width: number;
  height: number;
  clipSkip: number;
  denoisingStrength: number;
  karras: boolean;
  hiResFix: boolean;
  isPublic: boolean;
  postProcessing: string[];
}
