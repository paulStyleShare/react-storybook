import { PictureId, PictureSchema } from './picture';

export interface UserSchema {
  bio: string;
  collectionsCount: number;
  country: string;
  createdAt: string;
  facebookPublish: boolean;
  followersCount: number;
  followingsCount: number;
  gender: 'female' | 'male';
  id: number;
  isDormant?: boolean;
  isOfficial: boolean;
  likesCount: number;
  linkEnabled: boolean;
  nickname: string;
  profileCover: PictureSchema;
  profileCoverId: number;
  profilePicture: PictureSchema;
  profilePictureId: number;
  uploadedStylesCount: number;
  username: string;
  website: string;
}

export interface UserOverviewSchema {
  id: number;
  nickname: string;
  username: string;
  profilePicture: PictureSchema;
}

export interface UserOverviewOnlyPictureIdSchema {
  id: number;
  nickname: string;
  username: string;
  profilePictureId: PictureId;
}
