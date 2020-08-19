export enum EventTypeEnum {
  ClickPictureOn = 'Click Picture On',
}
export enum EventVaraintEnum {
  var1 = 'var1',
  var2 = 'var2',
  var3 = 'var3',
  var4 = 'var4',
}

export interface EventParamSchema {
  owner: string;
  variant?: EventVaraintEnum;
  param?: string;
}
