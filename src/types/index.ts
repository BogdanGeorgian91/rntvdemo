export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  duration: number;
}

export interface CatalogData {
  items: VideoItem[];
}

export type RootStackParamList = {
  Home: undefined;
  Details: { item: VideoItem };
  Player: { item: VideoItem };
};