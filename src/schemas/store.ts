import { CategoryOverviewSchema } from './category';
import { GoodsOverviewSchema, GoodsRankingSchema } from './goods';

export interface StoreBannerSchema {
  colorCode: string;
  destination: string;
  id: number;
  imageId: number;
  imageOnly: boolean;
  label: string;
  legacy: boolean;
  mobileImageId: number;
  pcImageId: number;
  subText: string;
  text: string;
  title: string;
  webDestination: string;
}

export interface KeywordRankingSchema {
  __type__: 'KeywordRanking';
  keyword: string;
  data: GoodsOverviewSchema[];
}

export interface CategoryGoodsRankingSchema {
  category: CategoryOverviewSchema;
  data: GoodsRankingSchema[];
  __type__: 'CategoryGoodsRanking';
}

export interface FeaturedGoodsSchema {
  category: {
    displayName: string;
    id: number | string;
  };
  goodsList: GoodsOverviewSchema[];
}
