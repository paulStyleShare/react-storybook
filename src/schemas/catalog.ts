export enum CatalogTypeEnum {
  Hot = 'hot',
  Issue = 'issue',
  Default = 'default',
}
export enum CatalogThemeEnum {
  A = 'a',
  B = 'b',
  C = 'c',
}
export enum CatalogStatusEnum {
  Normal = 'normal',
  Deleted = 'deleted',
  Draft = 'draft',
  Finished = 'finished',
}

interface CatalogPictureLinkInterface {
  percentY: number;
  percentX: number;
  destination: string | null;
  percentWidth: number;
  percentHeight: number;
}

export interface CatalogPicturesInterface {
  link: CatalogPictureLinkInterface[] | null;
  destination: string | null;
  originalWidth: number;
  originalHeight: number;
  id: number;
}

/**
 * 카탈로그 Schema
 */
export interface CatalogSchema {
  colorCode: string;
  couponsCount: number;
  coverHidden: boolean;
  coverImageId: number;
  description: string | null;
  detailDescription: string | null;
  detailTitle: string | null;
  defaultSharePicture: CatalogPicturesInterface;
  goodsCount: number;
  id: number;
  label: string;
  landingUrl: string;
  pictures: CatalogPicturesInterface[];
  promotion: { subtitle: string | null; title: string | null };
  status: CatalogStatusEnum;
  theme: CatalogThemeEnum;
  title: string;
  type: CatalogTypeEnum;
}
