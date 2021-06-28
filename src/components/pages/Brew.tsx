import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { getCoffeeMenuRequest } from "../../api/coffeeMachineAPI";
import {
  CoffeeExtras,
  CoffeeMenu,
  CoffeeSize,
  CoffeeType,
  SelectedCoffeeExtra,
} from "../../api/types/coffeeMenu";
import { ListItem } from "../../api/types/list";
import { useFetchMachineId } from "../../hooks/useFetchMachineId";
import Dialog from "../displays/Dialog";
import LoadingPlaceholder from "../displays/LoadingScreen";
import CoffeeGenericLayout from "../layouts/GenericLayout";

interface BrewProps {}
const Brew: React.FC<BrewProps> = (props) => {
  const { t } = useTranslation(["brew"]);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeMenu>();
  const [coffeeType, setCoffeeType] = useState<CoffeeType>();
  const [coffeeSize, setCoffeeSize] = useState<CoffeeSize>();
  const [coffeeExtras, setCoffeeExtras] = useState<SelectedCoffeeExtra[]>([]);

  const [displayOrder, setDisplayOrder] = useState(false);
  const machineId: string = useFetchMachineId();

  /**
   * Call to fetch Menu based on Machine ID
   */
  const fetchCoffeeMenu = async () => {
    setLoading(true);
    try {
      const menu = (await getCoffeeMenuRequest(machineId)).data;
      setCoffeeMenu(menu);
    } catch (e) {
      console.log(`Failed to fetch machine menu ${e}`);
    }
    setLoading(false);
  };

  /**
   * Call the menu API method when machineId changes
   */
  useEffect(() => {
    fetchCoffeeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineId]);

  /**
   * Test if order is complete and print result to dialog.
   */
  useEffect(() => {
    setOrderCompleted(coffeeExtras.length === coffeeType?.extras.length);
    showOrderCompletedDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeExtras, orderCompleted]);

  /**
   * Helper method to toggle completed order dialog.
   */
  const showOrderCompletedDialog = () => {
    if (orderCompleted) {
      setDisplayOrder(true);
    }
  };

  /**
   * Placeholder loading screen while API is called.
   */
  const loadingContent = () => (
    <LoadingPlaceholder color="primary" minHeight="vh-100" />
  );

  /**
   * Handle back button on Select Size page
   */
  const resetType = () => {
    setCoffeeType(undefined);
  };

  /**
   * Handle back button on Select extras page.
   */
  const resetSize = () => {
    setCoffeeSize(undefined);
    setCoffeeExtras([]);
  };

  /**
   * Callback function on selection of Coffee Type
   * Filters through the types in menu and sets the selectedCoffeeType state
   * based on the Id sent from the List
   * @param selectedType Id of the selected Type
   */
  const selectCoffeeType = (selectedType: string) => {
    const selectedCoffee = coffeeMenu?.types.find(
      (type) => type._id === selectedType
    );
    setCoffeeType(selectedCoffee);
  };

  /**
   * Callback function on selection of Coffee Size
   * Filters through the sizes in menu and sets the selectedCoffeeSize state
   * based on the Id sent from the List
   * @param selectedSize Id of the selected Size
   */
  const selectCoffeeSize = (selectedSize: string) => {
    const size = coffeeMenu?.sizes.find((size) => size._id === selectedSize);
    setCoffeeSize(size);
  };

  /**
   * Callback function on the selection of an individual subitem in the extras page.
   * Fetches the extra and the subitem that was selected based on
   * @param selectedExtra._id selected Extra ID
   * @param selectedExtra._subSelectionId selected sub item in the extra
   */
  const selectCoffeeExtras = (selectedExtra: {
    _id: string;
    _subSelectionId: string;
  }) => {
    const extra = findExtraInMenu(selectedExtra._id);
    const selectedSubSelection = findSubSelectionInExtra(
      extra,
      selectedExtra._subSelectionId
    );
    if (extra && selectedSubSelection) {
      // remove extra if already present and update
      let currentExtras = [...coffeeExtras].filter((extra) => {
        return extra._id !== selectedExtra._id;
      });
      currentExtras.push({
        _id: extra._id,
        name: extra.name,
        subselections: selectedSubSelection,
      } as SelectedCoffeeExtra);
      setCoffeeExtras(currentExtras);
    }
  };

  const findExtraInMenu = (extraId: string) => {
    return coffeeMenu?.extras.find((extra) => extra._id === extraId);
  };

  const findSubSelectionInExtra = (
    extra: CoffeeExtras | undefined,
    subSelectionId: string
  ) => {
    return extra?.subselections.find((sub) => sub._id === subSelectionId);
  };

  const closeModal = () => {
    setDisplayOrder(false);
  };

  const resetState = () => {
    setOrderCompleted(false);
    setCoffeeType(undefined);
    setCoffeeSize(undefined);
    setCoffeeExtras([]);
    setDisplayOrder(false);
  };

  const confirmModal = () => {
    resetState();
    history.push("/");
  };

  /**
   * Generate Layouts for Select Type page, Select Size Page and Select Extras page
   */
  const renderMenu = () => {
    if (!coffeeMenu) return null;
    if (!coffeeType) {
      return (
        <CoffeeGenericLayout
          title={t("title")}
          caption={t("styleCaption")}
          // GET TYPES OF COFFEE FROM MENU
          listItems={coffeeMenu.types.map((type) => {
            return { _id: type._id, value: type.name } as ListItem;
          })}
          onSelect={selectCoffeeType}
        />
      );
    }
    if (!coffeeSize) {
      return (
        <CoffeeGenericLayout
          title={t("title")}
          caption={t("sizeCaption")}
          backEnabled={true}
          back={resetType}
          // GET SIZE OF COFFEE FROM MENU BASED ON SELECTED COFFEE TYPE
          listItems={coffeeMenu.sizes
            .filter((size) => coffeeType.sizes.includes(size._id))
            .map((size) => {
              return { _id: size._id, value: size.name } as ListItem;
            })}
          onSelect={selectCoffeeSize}
        />
      );
    }
    return (
      <CoffeeGenericLayout
        title={t("title")}
        caption={t("extrasCaption")}
        backEnabled={true}
        back={resetSize}
        // GET EXTRAS OF COFFEE FROM MENU BASED ON SELECTED COFFEE TYPE
        // AND POPULATE THEM INTO A FORMAT HANDLED BY LISTITEMS
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
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        open={orderCompleted}
        title={t("orderCompleted")}
        type={coffeeType}
        size={coffeeSize}
        extras={coffeeExtras}
        onConfirm={confirmModal}
        onClose={closeModal}
      />
    );
  };

  return (
    <React.Fragment>
      {loading ? loadingContent() : renderMenu()}
      {displayOrder ? renderDialog() : null}
    </React.Fragment>
  );
};

export default Brew;
