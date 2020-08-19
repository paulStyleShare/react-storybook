export interface CollectionSchema {
  id: number;
  title: string;
  description: string;
  sponsored: boolean;
  createdAt: string;
  stylesCount: number;
  followersCount: number;
  coverId: number;
  creatorId: number;
  titleShowing: boolean;
  titleAlign: string;
  titleValign: string;
  titleFont: any;
  creatorNickname: string;
  creatorProfilePictureId: number;
  creatorIsOfficial: boolean;
  creatorBio: string;
  linkEnabled: boolean;
  relatedPictureIds: number[];
  collaborationType: string;
  type: 'collection';
}
