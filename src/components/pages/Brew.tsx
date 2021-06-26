import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../header/Header";
import ListLayout from "../layouts/lists/ListLayout";

interface BrewProps {}
const Brew: React.FC<BrewProps> = () => {
  const { t } = useTranslation(["brew"]);

  return (
    <React.Fragment>
      <Header title={t("title")} caption={t("styleCaption")} />
      <ListLayout />
    </React.Fragment>
  );
};

export default Brew;
