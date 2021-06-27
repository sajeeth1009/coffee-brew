export interface ListItem {
  _id: string;
  value: string;
  subList?: ListItem[]
}
