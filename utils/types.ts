export interface PropertyType {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: string;
  image: string;
  featured: boolean;
  date: string;
  tourPreview: string;
  tourRooms: Record<string, string>;
  hotspots: Record<string, Hotspot[]>;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Hotspot {
  pitch: number;
  yaw: number;
  type: string;
  text: string;
  sceneId?: string;
}