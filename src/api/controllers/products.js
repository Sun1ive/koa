// @ts-check
import _ from 'lodash';

import Product from '../models/product';
import { compareTop, compareBottom } from '../../utils/compare';

const itemParams = '_id type title link src sizes brand price color itemLength';

export const getAllItems = async ctx => {
  try {
    ctx.body = await Product.find().select(itemParams);
  } catch (err) {
    throw err;
  }
};

export const getCompareAndFilterItems = async ctx => {
  try {
    const { type, color } = ctx.request.body;
    const p = ctx.request.body.params;

    console.log(type);
    const products = await Product.find().select(itemParams);

    const filteredByType = products.filter(item => item.type === type);

    const colors = _.uniq(filteredByType.map(item => item.color));
    const brands = _.uniq(products.map(item => item.brand));
    const types = _.uniq(products.map(item => item.type));

    const arr = products.filter(item => item.type === type);
    let result;
    if (type === 'Плечевые') {
      result = compareTop(arr, p.shoulders, p.breast, p.waist, p.hips, p.height);
    } else {
      result = compareBottom(arr, p.waist, p.hips, p.height);
    }
    console.log(color);
    if (color) {
      const b = await result.filter(item => item.color === color);
      console.log(b.length);
      if (b.length < 1) {
        ctx.throw(404);
      } else {
        ctx.body = { items: b };
      }
    } else {
      const items = result;
      if (items.length > 0) {
        ctx.body = { items, colors, brands, types };
      } else {
        ctx.status = 404;
        ctx.body = { message: 'No items left' };
      }
    }
  } catch (err) {
    throw err;
  }
};

export const findOneAndCompare = async ctx => {
  try {
    const p = ctx.request.body.params;
    const { link } = ctx.request.body;
    const prod = await Product.find().select(itemParams);

    const resp = prod.filter(item => item.link === link);
    if (resp.length < 1) {
      ctx.throw(404, 'Not found');
    }
    let result;
    resp.forEach(x => {
      if (x.type === 'Плечевые') {
        result = compareTop(resp, p.shoulders, p.breast, p.waist, p.hips, p.height);
      } else {
        result = compareBottom(resp, p.waist, p.hips);
      }
    });
    ctx.body = result;
  } catch (err) {
    ctx.body = err;
  }
};

// create edit delete
export const createProduct = async ctx => {
  try {
    const { body } = ctx.request;

    const product = new Product({
      type: body.type,
      title: body.title,
      link: body.link,
      src: body.src,
      sizes: body.sizes,
      brand: body.brand,
      itemLength: body.length,
      price: body.price,
      color: body.color,
    });
    await product.save();

    ctx.body = {
      message: 'Product created!!',
      request: { type: 'GET', url: `http://localhost:8081/products/` },
    };
  } catch (err) {
    throw err;
  }
};

export const editProduct = async ctx => {
  try {
    const { productId } = ctx.params;
    const { body } = ctx.request;

    const updatedItem = {
      type: body.type,
      title: body.title,
      price: body.price,
      link: body.link,
      src: body.src,
      brand: body.brand,
      color: body.color,
      sizes: body.sizes,
      itemLength: body.length,
    };

    await Product.findByIdAndUpdate(productId, updatedItem);

    ctx.body = {
      message: 'Product updated!',
      request: { type: 'GET', url: `http://localhost:8081/products/${productId}` },
    };
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async ctx => {
  try {
    const { productId } = ctx.params;

    await Product.remove({ _id: productId });

    ctx.body = {
      message: 'Product deleted',
      request: { type: 'POST', url: `http://localhost:8081/products/create` },
    };
  } catch (err) {
    throw err;
  }
};
