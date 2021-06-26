import clsx from "clsx";
import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  title?: string;
  caption?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div>
      <div className="container p-2">
        <p className={clsx(styles.title, "m-0 fw-bold")}>{props.title}</p>
        <p className={clsx(styles.caption, "m-0")}>{props.caption}</p>
      </div>
    </div>
  );
};

export default Header;
