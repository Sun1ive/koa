import Product from '../models/product';
import { compareTop, compareBottom } from '../../utils/compare';

const itemParams = '_id type title link src sizes brand price color itemLength';

export const getAllItems = async ctx => {
  try {
    const items = await Product.find().select(itemParams);
    ctx.body = items;
  } catch (error) {
    ctx.throw(500);
  }
};

export const getItemsByChunks = async ctx => {
  try {
    const { page, type } = ctx.request.body;
    const p = ctx.request.body.params;
    const perPage = 4;
    const products = await Product.find().select(itemParams);
    const arr = products.filter(item => item.type === type);
    let result;
    if (type === 'Плечевые') {
      result = compareTop(arr, p.shoulders, p.breast, p.waist, p.hips, p.height);
    } else {
      result = compareBottom(arr, p.waist, p.hips, p.height);
    }
    const final = result.splice(page * perPage - perPage, page * perPage);
    if (final.length > 0) {
      ctx.body = final;
    } else {
      ctx.throw(404);
    }
  } catch (error) {
    ctx.body = error;
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
  } catch (error) {
    ctx.body = error;
  }
};

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
    const res = await product.save();
    if (!res) {
      ctx.throw(403);
    }
    ctx.body = res;
  } catch (error) {
    ctx.throw(400, 'Validation failed');
  }
};

export const editProduct = async ctx => {
  try {
    const { productId } = ctx.request.params;
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

    const resp = await Product.findByIdAndUpdate(productId, updatedItem);
    if (!resp) {
      ctx.throw(402);
    }

    ctx.body = {
      message: 'Product updated!',
      request: { type: 'GET', url: `http://localhost:8081/products/${productId}` },
    };
  } catch (error) {
    ctx.body = error;
  }
};

export const deleteProduct = async ctx => {
  try {
    const { productId } = ctx.request.params;
    const resp = await Product.remove({ _id: productId });
    if (!resp) {
      ctx.throw(500);
    }
    ctx.body = {
      response: resp,
      message: 'Product deleted',
      request: { type: 'POST', url: `http://localhost:8081/products/create` },
    };
  } catch (error) {
    ctx.body = error;
  }
};
