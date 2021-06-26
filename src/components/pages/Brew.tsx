import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCoffeeMenuRequest } from "../../api/coffeeMachineAPI";
import { CoffeeMenu } from "../../api/types/coffeeMenu";
import { useFetchMachineId } from "../../hooks/useFetchMachineId";
import LoadingPlaceholder from "../displays/LoadingScreen";

import Header from "../header/Header";
import ListLayout from "../layouts/lists/ListLayout";

interface BrewProps {}
const Brew: React.FC<BrewProps> = () => {
  const { t } = useTranslation(["brew"]);
  const [loading, setLoading] = useState(false);
  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeMenu>();
  const machineId: string = useFetchMachineId();

  const fetchCoffeeMenu = async () => {
    setLoading(true);
    try {
      const coffeeMenu = (await getCoffeeMenuRequest(machineId)).data;
      setCoffeeMenu(coffeeMenu);
    } catch (e) {
      console.log(`Failed to fetch machine menu ${e}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoffeeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingContent = () => (
    <LoadingPlaceholder color="primary" minHeight={500} />
  );

  return (
    <React.Fragment>
      {loading ? (
        loadingContent()
      ) : (
        <React.Fragment>
          <Header title={t("title")} caption={t("styleCaption")} />
          <ListLayout />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Brew;
