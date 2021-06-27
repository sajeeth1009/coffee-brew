import React, { useState } from "react";
import { ListItem } from "../../../api/types/list";
import ListEntry from "./ListEntry";
import ListExpandedEntry from "./ListExpandedEntry";

interface ListLayoutProps {
  isExpandableList?: boolean;
  listItems: ListItem[];
  onSelect?: (_id: string) => void;
  onExpandedSelect?: (selection: {
    _id: string;
    _subSelectionId: string;
  }) => void;
}

const ListLayout: React.FC<ListLayoutProps> = (props) => {
  const renderSimpleList = () => {
    return props.listItems.map((item) => {
      if (!props.onSelect) return null;
      return (
        <ListEntry listItem={item} onSelect={props.onSelect} key={item._id} />
      );
    });
  };

  const renderExpandableList = () => {
    return props.listItems.map((item) => {
      if (!props.onExpandedSelect) return null;
      return (
        <ListExpandedEntry
          listItem={item}
          onSelect={props.onExpandedSelect}
          key={item._id}
        />
      );
    });
  };

  if (!props) return null;
  return (
    <div>
      <div className="container px-2">
        <ul className="list-group">
          {props.isExpandableList ? renderExpandableList() : renderSimpleList()}
        </ul>
      </div>
    </div>
  );
};

export default ListLayout;
