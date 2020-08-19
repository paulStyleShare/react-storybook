import { getContentImageId } from './contents';
import { ContentTypeEnum, SearchCollectionSchema } from '../schemas/search';

const getDummyArticleData = (coverImageId: number | null) => ({
  __type__: ContentTypeEnum.Article as ContentTypeEnum.Article,
  coverImage: {
    id: coverImageId,
  },
  id: 1234,
  title: 'title',
});

const getDummyCollectionData = (
  imageObj: Pick<SearchCollectionSchema, 'coverImage' | 'relatedPictures'>,
) => ({
  ...imageObj,
  __type__: ContentTypeEnum.Collection as ContentTypeEnum.Collection,
  id: 1234,
  title: 'title',
});

describe('utils|contents', () => {
  it('return null when content type is collection and coverImage, relatedPictrues is null', () => {
    const data = getDummyCollectionData({
      coverImage: { id: null },
      relatedPictures: [{ id: null }],
    });
    expect(getContentImageId(data)).toEqual(null);
  });

  it('return null when content type is article and coverImage id is null', () => {
    const data = getDummyArticleData(null);
    expect(getContentImageId(data)).toEqual(null);
  });

  it('retrun coverImageId when type is collection and coverImageId exsists', () => {
    const coverImageId = 1234;
    const data = getDummyCollectionData({
      coverImage: { id: coverImageId },
      relatedPictures: [{ id: null }],
    });
    expect(getContentImageId(data)).toEqual(coverImageId);
  });

  it('retrun first relatedPicture id when type is collection and no coverImage exsists and relatedPictures exsist', () => {
    const relatedPictureId = 1234;
    const data = getDummyCollectionData({
      coverImage: { id: null },
      relatedPictures: [{ id: relatedPictureId }],
    });
    expect(getContentImageId(data)).toEqual(relatedPictureId);
  });

  it('retrun coverImageId when type is article and coverImage exsists', () => {
    const coverImageId = 1234;
    const data = getDummyArticleData(coverImageId);
    expect(getContentImageId(data)).toEqual(coverImageId);
  });
});
