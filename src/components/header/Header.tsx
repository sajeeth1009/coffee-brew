import clsx from "clsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

interface HeaderProps {
  title?: string;
  caption?: string;
  backEnabled?: boolean;
  back?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  /**
   * Header back button based on sent props
   */
  const renderBackButton = () => {
    return (
      <span
        className={clsx(
          styles.backIcon,
          "d-flex align-items-center justify-content-center"
        )}
        onClick={props.back}
      >
        <FontAwesomeIcon size="1x" icon={faChevronLeft}></FontAwesomeIcon>
      </span>
    );
  };

  return (
    <div>
      <div className="container p-2">
        <p
          className={clsx(
            styles.title,
            "d-flex align-items-center m-0 fw-bold"
          )}
        >
          {props.backEnabled ? renderBackButton() : null}
          <span>{props.title}</span>
        </p>
        <p className={clsx(styles.caption, "m-0")}>{props.caption}</p>
      </div>
    </div>
  );
};

export default Header;
