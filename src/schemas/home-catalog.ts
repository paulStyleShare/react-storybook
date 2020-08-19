import { GoodsOverviewSchema } from './goods';
import { PictureSchema } from './picture';

export enum HomeCatalogTypeEnum {
  Hot = 'hot',
  Issue = 'issue',
  Default = 'default',
}
export enum HomeCatalogThemeEnum {
  A = 'a',
  B = 'b',
  C = 'c',
}
export enum HomeCatalogStatusEnum {
  Normal = 'normal',
  Deleted = 'deleted',
  Draft = 'draft',
  Finished = 'finished',
}
export interface HomeCatalogImageSchema extends PictureSchema {
  destination: string | null;
  links: string; // not sure
  __type__: 'CatalogImage';
}

/**
 * 트렌드 카탈로그 Schema
 */
export interface HomeCatalogSchema {
  categoryId: number | null;
  colorCode: string;
  couponsCount: number;
  coverHidden: boolean;
  coverImageId: number;
  description: string | null;
  detailDescription: string | null;
  detailTitle: string | null;
  goodsCount: number;
  goodsList: GoodsOverviewSchema[];
  id: number;
  label: string;
  landingUrl: string;
  mobileImages: HomeCatalogImageSchema[];
  pcImages: HomeCatalogImageSchema;
  promotion: { subtitle: string | null; title: string | null };
  status: HomeCatalogStatusEnum;
  theme: HomeCatalogThemeEnum;
  title: string;
  type: HomeCatalogTypeEnum;
  __type__: 'Catalog';
}
