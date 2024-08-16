


export interface TCourseData {
  module: string;
  linksUrl: { title: string; url: string }[];
  videos: { title: string; url: string }[];
}

export interface TCourse {
  name: string;
  description?: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: string;
  tags?: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisite: { title: string }[];
  reviews?: [];
  courseContent: TCourseData[];
  ratings?: number;
  purchased?: number;
}
