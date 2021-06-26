import clsx from "clsx";
import React from "react";
import styles from "./ListLayout.module.scss";
import iconImage from "./../../../assets/images/large.svg";

interface ListLayoutProps {
  isExpandableList?: boolean;
  simpleList?: string;
  expandedList?: string;
}

const ListLayout: React.FC<ListLayoutProps> = (props) => {
  const times = [1, 2];
  return (
    <div>
      <div className="container px-2">
        <ul className="list-group">
          {times.map((i) => {
            return (
              <li
                className={clsx(
                  styles.listItem,
                  "list-group-item bg-primary border-0 mb-1 rounded"
                )}
                key={i}
              >
                <div className="w-100 d-flex justify-content-start align-items-center">
                  <img className="" src={iconImage} alt="icon for extra" />
                  <span
                    className={clsx(styles.listText, "text-white text-wrap")}
                  >
                    Item {i}
                  </span>
                </div>
                <React.Fragment>
                  <div
                    className={clsx(
                      styles.subList,
                      "mb-2 border-top border-white border-1"
                    )}
                  ></div>
                  <div>
                    <ul className="list-group">
                      <li
                        className={clsx(
                          styles.subListItem,
                          "p-2 list-group-item bg-shaded-green border-0"
                        )}
                        key={i}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={clsx(
                              "d-flex justify-content-start text-wrap text-white"
                            )}
                          >
                            Dairy
                          </span>
                          <div className="form-check">
                            <input
                              className="form-check-input bg-shaded-green rounded-circle border-2 border-white m-0"
                              type="checkbox"
                              name="inlineRadioOptions"
                              id="inlineRadio3"
                              value="option3"
                            />
                          </div>
                        </div>
                      </li>
                      <li
                        className={clsx(
                          styles.subListItem,
                          "p-2 list-group-item bg-shaded-green border-0 mt-1"
                        )}
                        key={i}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={clsx(
                              "d-flex justify-content-start text-wrap text-white"
                            )}
                          >
                            Soy
                          </span>
                          <div className="form-check">
                            <input
                              className="form-check-input bg-shaded-green rounded-circle border-2 border-white m-0"
                              type="checkbox"
                              name="inlineRadioOptions"
                              id="inlineRadio3"
                              value="option3"
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ListLayout;
