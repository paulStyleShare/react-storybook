import { PictureSchema } from './picture';

export interface BrandOverviewSchema {
  id: number;
  name: string;
}

export interface BrandSchema extends BrandOverviewSchema {
  status: 'normal' | 'deleted';
  couponsCount: number;
  description: string;
  goodsCount: number;
  updatedAt: string;
  // optional
  imageOnly?: boolean;
  coverImage?: null | PictureSchema;
  coverImageId?: number | null;
  logoImage?: BrandLogoImage;
}

interface BrandLogoImage {
  id: string;
  isDefault: boolean;
  originalHeight: number;
  originalWidth: number;
}

export interface BrandV1Schema {
  status: string;
  followerCount: number;
  description: string | null;
  imageOnly: boolean;
  coverImage: {
    isDefault: boolean;
    id: string | number | null;
    originalHeight: number;
    originalWidth: number;
    __type__: string;
  } | null;
  logoImage: {
    isDefault: boolean;
    id: string | number | null;
    originalHeight: number;
    originalWidth: number;
    __type__: string;
  } | null;
  newGoodsCounts: {
    date: string;
    count: number;
    __type__: string;
  }[];
  updatedAt: string;
  goodsCount: number;
  newGoodsCount: number;
  id: number;
  name: string;
  __type__: string;
}
