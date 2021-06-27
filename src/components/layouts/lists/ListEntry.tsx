import clsx from "clsx";
import React from "react";
import styles from "./ListEntry.module.scss";
import { ListItem } from "../../../api/types/list";
import { getImageUrl } from "../../../utils/ImageUrlUtils";

interface ListEntryProps {
  listItem: ListItem;
  onSelect: (_id: string) => void;
}

const ListEntry: React.FC<ListEntryProps> = (props) => {
  if (!props) return null;
  return (
    <li
      className={clsx(
        styles.listItem,
        "list-group-item bg-primary border-0 mb-1 rounded"
      )}
      key={props.listItem._id}
      onClick={() => props.onSelect(props.listItem._id)}
    >
      <div className="w-100 d-flex justify-content-start align-items-center">
        <img
          className=""
          src={getImageUrl(props.listItem.value)}
          alt="icon for extra"
        />
        <span className={clsx(styles.listText, "text-white text-wrap")}>
          {props.listItem.value}
        </span>
      </div>
    </li>
  );
};

export default ListEntry;
