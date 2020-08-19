const pathnamePairs = {
  category: /^\/categories$/,
  categoryBest: /^\/categories\/best$/,
  categoryDetail: /^\/categories\/\d+$/,
  feed: /^\/feed\/\S+$/,
  feedHome: /^\/feed\/home$/,
  goodsDetail: /^\/goods\/\d+$/,
  goodsDetailStyles: /^\/goods\/\d+\/styles$/,
  livetvDetail: /^\/livetv\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  meDormant: /^\/me\/dormant$/,
  meMessages: /^\/me\/messages$/,
  meNotifications: /^\/me\/notifications$/,
  pictures: /^\/pictures$/,
  root: /^\/$/,
  search: /^\/search$/,
  searchCatalogs: /^\/search\/catalogs$/,
  searchContents: /^\/search\/contents$/,
  searchFilter: /^\/search\/filter$/,
  searchFilterBrand: /^\/search\/filter\/brand$/,
  searchFilterCategory: /^\/search\/filter\/category$/,
  store: /^\/store$/,
  webviewGoodsDetailPictures: /^\/webviews\/goods\/\d+\/pictures$/,
};
export default pathnamePairs;

export const pathnameRegexs = Object.values(pathnamePairs);
