declare interface initDataType {
  data?: TransformData;
  searchData: {
    [key: string]: any;
  }[];
  searchKeywords: string;
  searching: boolean;
  optionOnFocus: number | null;
  foldingList: number[];
  hoverIndex: number | null;
}
