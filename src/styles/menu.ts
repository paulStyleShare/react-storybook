export interface MenuTheme {
  active: {
    bold: boolean;
    color: string;
  };
  focus:
    | false
    | {
        background: string;
      };
  hover: {
    bold: boolean;
    color: string;
  };
  normal: {
    bold: boolean;
    color: string;
  };
}
