import { PictureSchema } from '~schemas/picture';

import { UserSchema } from './user';

export enum NotificationScenarioEnum {
  // Comment Scenarios
  CommentStyle = 'someone_commented_on_my_style',
  CommentLivetv = 'someone_commented_on_my_livetv',
  CommentMention = 'someone_mentioned_me_in_comment',
  CommentComment = 'someone_commented_on_style_i_commented',
  CommentQuestion = 'someone_commented_on_my_question',
  CommentCeleb = 'celeb_commented_on_style',
  CommentTagged = 'someone_commented_on_tagged_style',
  // Commerce Scenarios
  CommercePointSaved = 'points_saved',
  CommercePointExpired = 'points_will_be_expired',
  CommerceSellerCommented = 'seller_commented_on_my_question',
  CommerceReviewSuggested = 'suggest_writing_review',
  CommerceCartRemind = 'remind_goods_in_cart',
  CommerceFirstCoupon = 'first_sale_coupon_catalog',
  // Feed Scenarios
  FeedRanked = 'dailylook_ranked',
  FeedFollowing = 'new_style_in_following_feed',
  // Growth
  GrowthExperiment = 'growth_experiment',
  // Like
  LikeStyle = 'someone_liked_my_style', // 내 스타일이 좋아요 받을 때
  LikeStyleGroup = 'someone_liked_my_style_group', // 스타일 좋아요 묶음 알림
  LikeComment = 'someone_liked_my_comment', // 내 댓글이 좋아요 받을 때
  LikeQuestion = 'someone_liked_my_question', // 내 질문이 좋아요 받을 때
  LikeByCeleb = 'celeb_liked_style',
  LikeByThreeCeleb = 'three_celebs_liked_style',
  LikeTagged = 'someone_liked_tagged_style',
  // Live tv
  LivetvStart = 'celeb_started_live',
  // Membership
  MembershipVoucherReceived = 'membership_voucher_received',
  // Style
  StyleCollected = 'someone_collected_my_style',
  StyleBeCollaborator = 'someone_made_me_collaborator',
  StyleBeingCollaborated = 'someone_collaborated_on_my_collection',
  StyleFollowed = 'someone_followed_my_collection',
  StyleCelebFollowed = 'celeb_followed_collection',
  StyleCelebCollected = 'celeb_collected_style',
  StyleCelebUploaded = 'celeb_uploaded_style_into_collection',
  StyleFollowing = 'new_style_in_followed_collection',
  // User
  UserFollowed = 'someone_followed_me',
  UserCelebFollowed = 'celeb_followed_someone',
}
export enum NotificationIconEnum {
  Camera = 'camera',
  Collect = 'collect',
  Heart = 'heart',
  Person = 'person',
  SpeechBubble = 'speechbubble',
}

export type NotificationMessageType =
  | 'author'
  | 'catalog'
  | 'cart'
  | 'celeb'
  | 'collection'
  | 'comment'
  | 'dailylook_feed'
  | 'fan'
  | 'goods'
  | 'goods_export'
  | 'goods_qna'
  | 'livetv'
  | 'look'
  | 'member_spoint_trx'
  | 'membership'
  | 'mkt_admin'
  | 'someone'
  | 'spoint'
  | 'style'
  | 'styleshare'
  | 'user'
  | 'ellipsis';

export interface NotificationThumbnailSchema extends PictureSchema {
  isDefault?: boolean;
  type: 'style' | 'livetv' | 'goods' | 'look' | 'collection' | 'someone';
}

export interface NotificationSchema {
  avatar: null | PictureSchema;
  avatars: null | (PictureSchema | null)[];
  avatarDestination: null | string;
  condition: NotificationScenarioEnum;
  createdAt: string;
  destination: string | null;
  emitter: null | UserSchema;
  icon?: NotificationIconEnum;
  id: string;
  messageTree: (
    | string
    | {
        text: string;
        type: NotificationMessageType;
      }
  )[];
  read: boolean;
  thumbnail: null | NotificationThumbnailSchema;
  thumbnails: null | NotificationThumbnailSchema[];
  thumbnailDestination: null | string;
}

/**
 * 알림 페이지 컴포넌트는 다음의 메소드를 구현해야 함
 */
export interface NotificationPage {
  /** React lifecycle methods */
  /**
   * 앱일 경우 visibilityChange 이벤트 리스너 등록
   */
  componentDidMount(): void;
  /**
   * 앱일 경우 visiblityChange 이벤트 리스너 해제
   */
  componentWillUnmount(): void;
  /** Custom methods */
  fetch(): void;
  upsert(): void;
  handleVisibilityChange(): void;
}
