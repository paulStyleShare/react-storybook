export interface OnBoardingMissionProgressSchema {
  completed: number;
  goal: number;
}
export enum OnBoardingMissionIdentifierEnum {
  FOLLOW = 'follow', // 팔로우 5명
  LIKE = 'like', // 좋아요 5개
  STYLE_UPLOAD = 'style_upload', // 스타일 업로드 1개
  BONUS = 'bonus', // 모든 미션을 완료하면 완료되는 미션
}

export interface OnBoardingMissionSchema {
  createdAt: string;
  isCompleted: boolean;
  isRewarded: boolean;
  progress: OnBoardingMissionProgressSchema;
  reward: number;
  status: null | string;
  title: string;
  type: OnBoardingMissionIdentifierEnum;
  __type__: 'UserMission';
}
