type TextStyleType = 'bold' | null;
type TextActionType = 'copy' | null;
type OrderActionType =
  | 'cancelOrder'
  | 'cancelOrderWithCashRefund'
  | 'copyAccount'
  | 'addToCart'
  | 'returnPage'
  | 'qnaPage'
  | 'faqPage'
  | 'reviewScheme';

export interface OrderButtonSchema {
  label: string;
  action: string; // url or copy data
  actionType: OrderActionType | null;
  type: 'http' | 'page' | 'redirect' | 'copy' | 'scheme';
  method?: 'post' | 'get' | 'put' | 'delete';
  payload?: any;
}

export interface OrderItemSchema {
  goodsId: string;
  status: string;
  title: string;
  subTitle?: {
    label: string;
    text: string;
    textActionType: TextActionType;
    textStyle: TextStyleType;
  };
  pictureId: string;
  name: string;
  options: string[];
  goodsPrice?: string;
  buttons: OrderButtonSchema[] | null;
}

export interface OrderItemListSchema {
  id: string;
  orderedAt: string;
  buttons: OrderButtonSchema[] | null;
  items: OrderItemSchema[];
}

export interface OrderProgressItemSchema {
  label: string;
  count: number;
  stepRange: {
    min: string;
    max: string;
  };
}
export interface OrderProgressSchema {
  progress: OrderProgressItemSchema[];
}

export interface OrderInfoSchema {
  label: string;
  text: string;
  comment: string | null;
  textActionType: TextActionType;
  textStyle: TextStyleType;
}
