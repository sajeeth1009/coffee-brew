import cappuchino from '../assets/images/cappuchino.svg';
import defaultImage from '../assets/images/default.svg';
import espresso from '../assets/images/espresso.svg';
import large from '../assets/images/lungo/large.svg';
import medium from '../assets/images/lungo/medium.svg';
import small from '../assets/images/lungo/small.svg';
import milk from '../assets/images/extras/milk.svg';
import sugar from '../assets/images/extras/sugar.svg';

export const getImageUrl = (name: string) => {
  switch(name) {
    case "Cappuccino": return cappuchino;
    case "Espresso": return espresso;
    case "Large": return large;
    case "Venti": return medium;
    case "Tall": return small;
    case "Select the amount of sugar": return sugar;
    case "Select type of milk": return milk;
    default: return defaultImage;
  }
}

