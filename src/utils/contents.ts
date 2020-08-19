import {
  ContentTypeEnum,
  SearchArticleSchema,
  SearchCollectionSchema,
} from '../schemas/search';

export const getContentImageId = (
  data: SearchCollectionSchema | SearchArticleSchema,
): number | null => {
  if (
    data.__type__ === ContentTypeEnum.Collection &&
    (!data.relatedPictures ||
      !data.relatedPictures[0] ||
      !data.relatedPictures[0].id) &&
    !data.coverImage.id
  ) {
    return null;
  }

  if (data.__type__ === ContentTypeEnum.Article && !data.coverImage.id) {
    return null;
  }

  if (data.__type__ === ContentTypeEnum.Collection) {
    return data.coverImage.id ? data.coverImage.id : data.relatedPictures[0].id;
  }

  return data.coverImage.id;
};
