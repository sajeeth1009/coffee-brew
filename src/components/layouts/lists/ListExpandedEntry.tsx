import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./ListExpandedEntry.module.scss";
import iconImage from "./../../../assets/images/large.svg";
import { ListItem } from "../../../api/types/list";

interface ListExpandedEntryProps {
  listItem: ListItem;
  onSelect: (selection: { _id: string; _subSelectionId: string }) => void;
}

const ListExpandedEntry: React.FC<ListExpandedEntryProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (selectedOption !== "") {
      props.onSelect({
        _id: props.listItem._id,
        _subSelectionId: selectedOption,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  if (!props) return null;

  const renderSubList = () => {
    return (
      <React.Fragment>
        <div
          className={clsx(
            styles.subList,
            "mb-2 border-top border-white border-1"
          )}
        ></div>
        <ul className="list-group">
          {props.listItem.subList?.map((subItem) => {
            return renderSubListItem(subItem);
          })}
        </ul>
      </React.Fragment>
    );
  };

  const renderSubListItem = (subItem: ListItem) => {
    return (
      <li
        className={clsx(
          styles.subListItem,
          "p-2 list-group-item bg-shaded-green border-0 mb-1"
        )}
        key={subItem._id}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          onClick={() => setSelectedOption(subItem._id)}
        >
          <span
            className={clsx(
              "d-flex justify-content-start text-wrap text-white"
            )}
          >
            {subItem.value}
          </span>
          <div className="form-check">
            <input
              className="form-check-input bg-shaded-green rounded-circle border-2 border-white m-0"
              type="checkbox"
              name={props.listItem._id}
              id={subItem._id}
              value={subItem._id}
              checked={selectedOption === subItem._id}
              onChange={() => setSelectedOption(subItem._id)}
            />
          </div>
        </div>
      </li>
    );
  };

  return (
    <li
      className={clsx(
        styles.listItem,
        "list-group-item bg-primary border-0 mb-1 rounded"
      )}
      key={props.listItem._id}
    >
      <div
        className="w-100 d-flex justify-content-start align-items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img className="" src={iconImage} alt="icon for extra" />
        <span className={clsx(styles.listText, "text-white text-wrap")}>
          {props.listItem.value}
        </span>
      </div>
      {props.listItem.subList && isExpanded ? renderSubList() : null}
    </li>
  );
};

export default ListExpandedEntry;