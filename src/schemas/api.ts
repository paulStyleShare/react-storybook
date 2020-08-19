export interface ApiListResponseBase {
  paging: {
    next: string | null;
    prev?: string | null;
  };
  total?: number;
}

export interface ListSchema<T> {
  items: T[];
  listUrl: null | string;
  title: string;
  __type__: 'List';
}
