import React from "react";
import { ListItem } from "../../api/types/list";
import Header from "../header/Header";
import ListLayout from "./lists/ListLayout";

interface CoffeeGenericLayoutProps {
  title: string;
  caption: string;
  backEnabled?: boolean;
  listItems: ListItem[];
  onSelect?: (_id: string) => void;
  back?: () => void;
  isExpandableList?: boolean;
  onExpandedSelect?: (selection: {
    _id: string;
    _subSelectionId: string;
  }) => void;
}

const CoffeeGenericLayout: React.FC<CoffeeGenericLayoutProps> = (props) => {
  return (
    <React.Fragment>
      <Header
        title={props.title}
        caption={props.caption}
        backEnabled={props.backEnabled}
        back={props.back}
      />
      <ListLayout
        listItems={props.listItems}
        onSelect={props.onSelect}
        onExpandedSelect={props.onExpandedSelect}
        isExpandableList={props.isExpandableList}
      />
    </React.Fragment>
  );
};

export default CoffeeGenericLayout;
