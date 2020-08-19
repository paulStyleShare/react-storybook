export interface CartProductsSchema {
  buyable: CartProductSchema[];
  unbuyable: CartProductSchema[];
}

export interface CartProductSchema {
  goodsList: GoodsListSchema[];
  id: number;
  shippingPolicy: ShippingPolicySchema;
}

export interface ShippingPolicySchema {
  freeCondition: string | null;
  shippingCost: number;
}

export interface GoodsListSchema {
  cartId: number;
  goodsPrice: number;
  id: number;
  name: string;
  options: string[][];
  picture: CartPictureSchema;
  price: number;
  priceOriginal: number;
  providerId: number;
  quantity: number;
  shippingPolicy: string | null;
  status: string;
  stock: number;
}

export interface CartPictureSchema {
  height: number;
  id: string;
  width: number;
}
