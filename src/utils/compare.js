import _ from 'lodash';
import { top, bottom, upperLength, bottomLength } from './functions';

export const compareTop = (array, shoulders, breast, waist, hips, height) => {
  const newArr = [];
  _.each(array, item => {
    const itemID = item._id;
    _.each(item.sizes, x => {
      const myObj = {
        title: item.title,
        type: item.type,
        src: item.src,
        id: item._id,
        link: item.link,
        price: item.price,
        size: x.size,
        color: item.color,
        length: item.itemLength,
        brand: item.brand,
        percent: top(shoulders, x.shoulders, breast, x.breast, waist, x.waist, hips, x.hips),
        difference: upperLength(height, item.itemLength),
      };

      if (shoulders <= x.shoulders && breast <= x.breast && waist <= x.waist && hips <= x.hips) {
        if (newArr.length === 0) {
          newArr.push(myObj);
        } else {
          const { id } = _.last(newArr);
          if (id !== itemID) {
            newArr.push(myObj);
          }
        }
      }
    });
  });
  return _.sortBy(newArr, 'percent').reverse();
};

export const compareBottom = (array, waist, hips, height) => {
  const newArr = [];
  _.each(array, item => {
    const itemID = item._id;
    _.each(item.sizes, x => {
      const myObj = {
        title: item.title,
        type: item.type,
        src: item.src,
        id: item._id,
        link: item.link,
        price: item.price,
        size: x.size,
        color: item.color,
        length: item.itemLength,
        brand: item.brand,
        percent: bottom(waist, x.waist, hips, x.hips),
        difference: bottomLength(height, item.itemLength),
      };

      if (waist <= x.waist && hips <= x.hips) {
        if (newArr.length === 0) {
          newArr.push(myObj);
        } else {
          const { id } = _.last(newArr);
          if (id !== itemID) {
            newArr.push(myObj);
          }
        }
      }
    });
  });
  return _.sortBy(newArr, 'percent').reverse();
};
