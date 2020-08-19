export interface QnaGoodsItemSchema {
  id: string;
  createdAt: string;
  status: string;
  goodsId: string;
  pictureId: string;
  title: string;
  contents: string;
  repliedAt: string;
  replyContents: string | null;
}
