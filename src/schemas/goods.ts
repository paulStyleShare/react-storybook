import { BrandOverviewSchema } from './brand';
import { CategoryOverviewLegacySchema } from './category';
import { PictureSchema } from './picture';
export interface GoodsOptionSchema {
  id: number;
  names: string[];
  priceOriginal: number;
  price: number;
  stock: number;
  stockHidden: boolean;
}

export interface GoodsPictureSchema extends PictureSchema {
  id: string;
}

export interface GoodsPolicySchema {
  title: string;
  items: string[];
}

export type GoodsStatus = 'normal' | 'runout' | 'unsold' | 'purchasing';

export interface GoodsOverviewSchema {
  id: number;
  status: GoodsStatus;
  isDiscounted: boolean;
  discountRate: number;
  name: string;
  price: number;
  priceOriginal: number;
  reviewsCount?: number;
  likeCount?: number;
  picture: GoodsPictureSchema;
  brand: BrandOverviewSchema;
}

export interface GoodsSchema
  extends Omit<GoodsOverviewSchema, 'isDiscounted' | 'discountRate'> {
  delivery: string;
  policies: GoodsPolicySchema[];
  contents: GoodsContentsSchema;
  categories: CategoryOverviewLegacySchema[];
  optionInfo: {
    optionTitles: string[];
    visible: boolean;
    options: GoodsOptionSchema[];
  };
  couponsCount: number;
  stylesCount?: number;
  rewardPoints: string;
}

export interface GoodsContentsSchema {
  footer: string;
  header: string;
  pictures: PictureSchema[];
}

export interface GoodsRankingSchema {
  goods: GoodsOverviewSchema;
  lastIndex: number;
}

export interface GoodsQnaSchema {
  contents: string;
  createdAt: string;
  id: string;
  mine: boolean;
  reply: string | null;
  secret: boolean;
  userNickname: string;
}

export interface GoodsStyleSchema {
  authorBio: string;
  authorId: number;
  authorIsOfficial: boolean;
  authorNickname: string;
  authorProfilePictureId: number;
  authorUsername: string;
  collectCount: number;
  commentsCount: number;
  createdAt: string;
  description: string;
  goodsCount: number;
  id: number;
  itemsCount: number;
  likesCount: number;
  linkEnabled: boolean;
  livetv: null;
  permalink: string;
  pictures: PictureSchema[];
  productsCount: number;
  relatedGoodsCount: number;
  type: string;
  visitCount: number;
}

export interface GoodsShippingSchema {
  goodsId: number;
  shippingPolicy: string | null;
  expectedExportDate: string;
}
