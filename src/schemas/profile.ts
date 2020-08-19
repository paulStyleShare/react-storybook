export interface ProfileSchema {
  admin: boolean;
  bio: string;
  birthdate: string;
  collectionsCount: number;
  country: string;
  createdAt: string;
  email: string;
  facebookPublish: boolean;
  feedGroup: null; // TODO: check type
  followersCount: number;
  followingsCount: number;
  gender: 'female' | 'male';
  id: number;
  isOfficial: boolean;
  likesCount: number;
  linkEnabled: boolean;
  locale: string;
  nickname: string;
  occupation: string;
  profileCoverId: number | null; // TODO: check type
  profilePictureId: number | null; // TODO: check type
  uploadedStylesCount: number;
  username: string;
  website: string;
}
