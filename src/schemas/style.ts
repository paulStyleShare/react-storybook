import { GoodsOverviewSchema } from './goods';
import { PictureSchema } from './picture';
import { UserOverviewSchema } from './user';

export interface ItemSchema {
  id: number;
  brand: string;
  detail: string;
  category: 'etc' | string;
}

export interface VideoSchema {
  id: number;
  vimeoId: number;
  duration: number;
  originalWidth: number;
  originalHeight: number;
  files: null | { hls: string };
}

export interface StyleOverviewSchema {
  id: number;
  description: string;
  sponsored: boolean;
  createAt: string;
  permalink: string;
  author: UserOverviewSchema;
  pictures: null | PictureSchema[];
  likeCount: number;
  commentCount: number;
  collectCount: number;
  goodsCount: number;
  visitCount: number;
  hasVideo: boolean;
}

export interface StyleSchema extends StyleOverviewSchema {
  type: string;
  items: null | ItemSchema[];
  videos: null | VideoSchema[];
  goods: null | GoodsOverviewSchema[];
  livetv: null | { [key: string]: any };
}

export interface StyleDetailSchema {
  id: number;
  partnership: null;
  createdAt: string;
  authorBio: string | null;
  authorUsername: string;
  authorProfilePictureId: number | number;
  authorNickname: string;
  authorIsOfficial: boolean;
  authorId: number;
  description: string;
  permalink: string;
  pictures: PictureSchema[];
  type: string;
  brands: {
    category: string;
    text: string;
    type: string;
    id: null;
  }[];
  goods: {
    count: number;
    data: GoodsOverviewSchema[];
  };
  items: {
    count: number;
    data: { category: string; brand: string; detail: null }[];
  };
  // 아마도 deprecated
  products: {
    count: number;
    data: any[];
  };
  linkEnabled: boolean;
  livetv: null;
  itemsCount: number;
  productsCount: number;
  collectCount: number;
  commentsCount: number;
  likesCount: number;
  relatedGoodsCount: number;
  goodsCount: number;
  visitCount: number;
}
