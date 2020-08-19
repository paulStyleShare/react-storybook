export type RecommendationFeedResponse<
  T = RecommendationFeedStyle | RecommendationFeedGoods
> = {
  data: RecommendationFeedSection<T>[];
  msg: string;
};

export type RecommendationFeedSection<
  T = RecommendationFeedStyle | RecommendationFeedGoods
> = {
  data: T[];
  componentType: RecommendationFeedComponentType;
  input: string;
  recType: string;
  subtitle: string;
  title: string;
  viewAllTargetUrl: string | null;
};

export type RecommendationFeedComponentType =
  | 'goods_carousel'
  | 'goods_column'
  | 'goods_column_2'
  | 'goods_column_3'
  | 'goods_column_square'
  | 'styles_carousel'
  | 'styles_column_square'
  | 'styles_column'
  | 'styles_column_2'
  | 'styles_column_3'
  | 'style_grid_2';

export type RecommendationFeedStyle = {
  author: {
    id: number;
    nickname: string;
    profilePicture: {
      id: number | null;
    };
    username: string;
  };
  commentcount: number;
  description: string;
  id: number;
  likecount: number;
  pictures: { id: string }[];
  username: string;
};

export type RecommendationFeedGoods = {
  brand: {
    id: number;
    name: string;
  };
  discount: number;
  discountrate: number;
  id: number;
  isdiscounted: boolean;
  name: string;
  picture: {
    id: string;
  };
  price: number;
  priceoriginal: number;
  reviewcount: number;
};
