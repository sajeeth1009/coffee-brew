import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../header/Header";

interface BrewProps {}
const Brew: React.FC<BrewProps> = () => {
  const { t, i18n } = useTranslation(["brew"]);

  return (
    <React.Fragment>
      <Header title={t("title")} caption={t("styleCaption")} />
    </React.Fragment>
  );
};

export default Brew;
