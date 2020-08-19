import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiListResponseBase } from '~schemas/api';
import { BrandSchema, BrandV1Schema } from '~schemas/brand';
import { CouponSchema } from '~schemas/coupon';
import { GoodsOverviewSchema } from '~schemas/goods';
import { baseApiClient, growthProxyConfig } from '~utils/apiClient';
/**
 * Get brand
 *
 * @param {number} id brand id
 * @param {Object=} config axios request config
 */
export function getBrand(
  id: number,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetBrandResponse>> {
  return baseApiClient.get<GetBrandResponse>(`/brands/${id}`, config);
}
export type GetBrandResponse = BrandSchema;

/**
 * Get goods in brand
 *
 * @param {number} id brand id
 * @param {Object=} params parameters
 * @param {number=} params.limit
 * @param {number=} params.offset
 * @param {string=} params.sort
 * @param {Object=} config axios request config
 */
export const getBrandGoods = (
  id: number,
  params?: GetBrandGoodsParams,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetBrandGoodsReponse>> =>
  baseApiClient.get<GetBrandGoodsReponse>(`/brands/${id}/goods`, {
    params,
    ...config,
  });
export interface GetBrandGoodsParams {
  limit?: number;
  offset?: number;
  sort?: 'score-desc' | 'date-desc' | 'price-asc' | 'price-desc' | 'rate-desc';
}

export interface GetBrandGoodsReponse extends ApiListResponseBase {
  data: GoodsOverviewSchema[];
}

export function getBrandInfo(
  id: number,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetBrandInfoResponse>> {
  return baseApiClient.get<GetBrandInfoResponse>(
    `/api/v1/brands/${id}`,
    config,
  );
}

export const getBrandInfoProxy = (
  id: number,
): ReturnType<typeof getBrandInfo> => getBrandInfo(id, growthProxyConfig);

export interface GetBrandInfoResponse {
  data: BrandV1Schema;
}

export function getFollowingBrands(
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetFollowingBrandsResponse>> {
  return baseApiClient.get<GetFollowingBrandsResponse>(
    '/api/v1/brands/followings/collections',
    config,
  );
}

export const getFollowingBrandsProxy = (): ReturnType<
  typeof getFollowingBrands
> => getFollowingBrands(growthProxyConfig);

export interface GetFollowingBrandsResponse {
  total: number;
  data: BrandV1Schema[];
  paging: {
    next: string | null;
    prev?: string | null;
  } | null;
}

export function getBrandNewArrivalGoods(
  id: number,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetBrandNewArrivalGoodsResponse>> {
  return baseApiClient.get<GetBrandNewArrivalGoodsResponse>(
    `/api/v1/brands/${id}/new-arrivals/goods`,
    config,
  );
}

export const getBrandNewArrivalGoodsProxy = (
  id: number,
): ReturnType<typeof getBrandNewArrivalGoods> =>
  getBrandNewArrivalGoods(id, growthProxyConfig);

export interface GetBrandNewArrivalGoodsResponse {
  title: string;
  data: GoodsOverviewSchema[];
}

/**
 * brand가 발급가능한 쿠폰 리스트 추출
 * @param {number} id brandId
 */
export function getBrandCoupon(
  id: number,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetGoodsCouponsResponse>> {
  return baseApiClient.get<GetGoodsCouponsResponse>(
    `/api/v1/brands/${id}/coupons`,
    config,
  );
}

export const getBrandCouponProxy = (
  id: number,
): ReturnType<typeof getBrandCoupon> => getBrandCoupon(id, growthProxyConfig);

export interface GetGoodsCouponsResponse {
  data: CouponSchema[];
}
