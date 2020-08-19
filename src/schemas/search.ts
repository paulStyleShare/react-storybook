import { UserOverviewSchema } from './user';

export enum SearchResultTab {
  Overall = 'overall',
  Goods = 'goods',
  Style = 'style',
  User = 'user',
}

export enum ContentTypeEnum {
  Article = 'ArticleSearchOverview',
  Collection = 'CollectionSearchOverview',
}

export interface PagingSchema {
  next: string | null;
}

export interface SearchCollectionSchema {
  __type__: ContentTypeEnum.Collection;
  title: string;
  id: number;
  coverImage: {
    id: number | null;
  };
  relatedPictures: {
    id: number | null;
  }[];
}

export interface SearchCatalogSchema {
  __type__: ContentTypeEnum.Article;
  title: string;
  id: number;
  coverImage: {
    id: number | null;
  };
  representativeGoodsPicture: {
    id: number | null;
  };
}

export interface SearchArticleSchema {
  __type__: ContentTypeEnum.Article;
  title: string;
  id: number;
  coverImage: {
    id: number | null;
  };
}

export enum SearchStyleTypeEnum {
  Style = 'style',
  Review = 'review',
  TaggedGoods = 'tagged_goods',
  Secondhand = 'secondhand',
  Video = 'video',
  Qna = 'qna',
}

export interface StyleSearchOverview {
  id: number;
  type: SearchStyleTypeEnum;
  author: UserOverviewSchema;
  pictures: {
    id: number;
  }[];
}

export enum SearchSortEnum {
  Popular = 'score-desc',
  PriceAsc = 'price-asc',
  PriceDesc = 'price-desc',
  Sales = 'sales-desc',
  DateDesc = 'date-desc',
}

export interface SearchBrand {
  id: number;
  name: string;
  picture?: { id: number };
}

export interface SearchRelatedBrand {
  id: number;
  name: string;
  picture?: {
    id?: number;
  };
}

export interface SearchCategory {
  id: number;
  name: string;
  children: SearchCategory[];
}

export interface SearchKeyword {
  original: string;
  replacement?: string;
  correction?: string;
}
