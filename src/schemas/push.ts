export enum PushIdentifierEnum {
  ClickReviewStyle = 'review_style_clicked', // 누군가 내가 업로드한 리뷰를 클릭했을 때
  ClickReviewStyleGroup = 'review_style_clicked_group', // 리뷰 클릭 알림 묶음
  CollectionFollowing = 'new_style_in_followed_collection', // 팔로잉 콜렉션에 스타일이 추가되었을 때
  CommentArticle = 'someone_mentioned_me_in_article_comment', // 누군가가 아티클에서 나를 언급할 때
  CommentLivetv = 'someone_commented_on_my_livetv',
  CommentMention = 'someone_mentioned_me_in_comment', // 누군가가 내 이야기를 할 때
  CommentStyle = 'someone_commented_on_my_style', // 내 스타일에 댓글이 달릴 때
  CommentStyleGroup = 'someone_commented_on_my_style_group', // 스타일 댓글 묶음 알림
  CommentTagged = 'someone_commented_on_tagged_style', // 내가 태그된 스타일에 댓글이 달릴 때
  CommentQuestion = 'someone_commented_on_my_question', // 내 질문에 댓글이 달렸을 때
  CommerceCartRemind = 'remind_goods_in_cart', // 장바구니에 상품이 오랫동안 있었을 때
  CommerceFirstCoupon = 'first_sale_coupon_catalog', // 첫구매 응원 쿠폰이 발급되었을 때
  CommercePointExpired = 'points_will_be_expired', // 단추 만료 알림
  CommercePointSaved = 'points_saved', // 단추가 적립 되었을 때
  CommerceReviewSuggested = 'suggest_writing_review', // 리뷰 유도
  CommerceSellerCommented = 'seller_commented_on_my_question', // 상품문의에 답변이 달렸을 때
  DailylookRanked = 'dailylook_ranked', // 데일리룩 피드 TOP 30에 선정되었을 때
  DailylookRankedV2 = 'dailylook_ranked_v2',
  FeedFollowing = 'new_style_in_following_feed', // 팔로잉 피드에 새로운 스타일이 올라왔을 때
  GrowthExperiment = 'growth_experiment',
  LikeComment = 'someone_liked_my_comment',
  LikeStyle = 'someone_liked_my_style',
  LikeQuestion = 'someone_liked_my_question',
  LivetvStart = 'celeb_started_live',
  MembershipVoucherReceived = 'membership_voucher_received',
  StyleFollowed = 'someone_followed_my_collection', // 누가 나의 콜렉션을 팔로우할 때
  StyleCelebFirstUpload = 'celeb_uploaded_first_style', // 팔로우하는 친구의 첫 스타일을 확인해보세요
  StyleCollected = 'someone_collected_my_style', // 내 스타일을 누가 콜렉트할 때
  StyleCollectedGroup = 'someone_collected_my_style_group', // 스타일 콜렉트 묶음 알림
  UserFollowed = 'someone_followed_me', // 누가 나를 팔로우할 때
  Marketing = 'marketing',
}

export interface PushConfigScheme {
  idnetifier: PushIdentifierEnum;
  icon: string;
  direct: boolean;
  default: boolean;
  configurable: boolean;
  subscribingState: boolean;
  verbose: string;
}
