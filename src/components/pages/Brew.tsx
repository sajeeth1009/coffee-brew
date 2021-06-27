import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getCoffeeMenuRequest } from "../../api/coffeeMachineAPI";
import {
  CoffeeMenu,
  CoffeeSize,
  CoffeeType,
  SelectedCoffeeExtra,
} from "../../api/types/coffeeMenu";
import { ListItem } from "../../api/types/list";
import { useFetchMachineId } from "../../hooks/useFetchMachineId";
import LoadingPlaceholder from "../displays/LoadingScreen";
import Header from "../header/Header";
import ListLayout from "../layouts/lists/ListLayout";

interface BrewProps {}
const Brew: React.FC<BrewProps> = () => {
  const { t } = useTranslation(["brew"]);

  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeMenu>();
  const [coffeeType, setCoffeeType] = useState<CoffeeType>();
  const [coffeeSize, setCoffeeSize] = useState<CoffeeSize>();
  const [coffeeExtras, setCoffeeExtras] = useState<SelectedCoffeeExtra[]>([]);
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
  }, [machineId]);

  useEffect(() => {
    setOrderCompleted(coffeeExtras.length === coffeeType?.extras.length);
    printOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeExtras, orderCompleted]);

  const printOrderDetails = () => {
    if (orderCompleted) {
      console.log(
        `Completed Order: \n Type: ${coffeeType?.name} \n Size: ${coffeeSize?.name} \n Extras: \n`
      );
      coffeeExtras.forEach((extra) => {
        console.log(
          `|Name: ${extra.name}, selection: ${extra.subselections.name}| \n `
        );
      });
    }
  };

  const loadingContent = () => (
    <LoadingPlaceholder color="primary" minHeight="vh-100" />
  );

  const resetType = () => {
    setCoffeeType(undefined);
  };

  const resetSize = () => {
    setCoffeeSize(undefined);
  };

  const selectCoffeeType = (selectedType: string) => {
    const selectedCoffee = coffeeMenu?.types.find(
      (type) => type._id === selectedType
    );
    setCoffeeType(selectedCoffee);
  };

  const selectCoffeeSize = (selectedSize: string) => {
    const size = coffeeMenu?.sizes.find((size) => size._id === selectedSize);
    setCoffeeSize(size);
  };

  const selectCoffeeExtras = (selectedExtra: {
    _id: string;
    _subSelectionId: string;
  }) => {
    const menuExtra = coffeeMenu?.extras.find(
      (extra) => extra._id === selectedExtra._id
    );
    const selectedSubSelection = menuExtra?.subselections.find(
      (sub) => sub._id === selectedExtra._subSelectionId
    );
    if (menuExtra && selectedSubSelection) {
      let currentExtras = [...coffeeExtras].filter((extra) => {
        return extra._id !== selectedExtra._id;
      });
      currentExtras.push({
        _id: menuExtra._id,
        name: menuExtra.name,
        subselections: selectedSubSelection,
      } as SelectedCoffeeExtra);
      setCoffeeExtras(currentExtras);
    }
  };

  const renderMenu = () => {
    if (!coffeeMenu) return null;
    if (!coffeeType) {
      return (
        <React.Fragment>
          <Header title={t("title")} caption={t("styleCaption")} />
          <ListLayout
            listItems={coffeeMenu.types.map((type) => {
              return { _id: type._id, value: type.name } as ListItem;
            })}
            onSelect={selectCoffeeType}
          />
        </React.Fragment>
      );
    }
    if (!coffeeSize) {
      return (
        <React.Fragment>
          <Header
            title={t("title")}
            caption={t("sizeCaption")}
            backEnabled={true}
            back={resetType}
          />
          <ListLayout
            listItems={coffeeMenu.sizes
              .filter((size) => coffeeType.sizes.includes(size._id))
              .map((size) => {
                return { _id: size._id, value: size.name } as ListItem;
              })}
            onSelect={selectCoffeeSize}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header
          title={t("title")}
          caption={t("extrasCaption")}
          backEnabled={true}
          back={resetSize}
        />
        <ListLayout
          listItems={coffeeMenu.extras
            .filter((extra) => coffeeType.extras.includes(extra._id))
            .map((extra) => {
              return {
                _id: extra._id,
                value: extra.name,
                subList: extra.subselections.map((selection) => {
                  return {
                    _id: selection._id,
                    value: selection.name,
                  } as ListItem;
                }),
              } as ListItem;
            })}
          onExpandedSelect={selectCoffeeExtras}
          isExpandableList={true}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>{loading ? loadingContent() : renderMenu()}</React.Fragment>
  );
};

export default Brew;
