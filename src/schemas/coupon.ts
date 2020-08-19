export interface CouponSchema {
  colorCode: string;
  displayName: string;
  endDate: string | null;
  id: number;
  linkStatus: 'normal';
  maxSalePrice: number | null;
  minPurchasingPrice: number;
  name: string;
  note: string;
  saleType: 'percent' | 'won';
  saleValue: number;
  status: 'usable' | 'unauthorized' | 'unusable' | 'receivable';
  startDate: string;
  syncedAt: string;
}
