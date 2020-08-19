export interface CategoryOverviewLegacySchema {
  id: number;
  name: string;
}
export interface CategoryOverviewSchema {
  displayName: string;
  id: number;
  __type__: 'CategoryOverview';
}
export interface CategorySchema
  extends Omit<CategoryOverviewSchema, '__type__'> {
  status: string;
  createdAt: string;
  __type__: 'Category';
}
