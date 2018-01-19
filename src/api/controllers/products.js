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
    const { page, type, params } = ctx.request.body;
    const perPage = 4;
    ctx.body = await Product.find()
      .select(itemParams)
      .exec()
      .then(docs => docs.filter(item => item.type === type))
      .then(arr => {
        const p = params;
        let result;
        if (type === 'Плечевые') {
          result = compareTop(arr, p.shoulders, p.breast, p.waist, p.hips, p.height);
        } else {
          result = compareBottom(arr, p.waist, p.hips, p.height);
        }
        return result;
      })
      .then(result => result.splice(page * perPage - perPage, perPage))
      .then(final => {
        if (final.length > 0) {
          return final;
        }
        return ctx.throw(404);
      });
  } catch (error) {
    ctx.throw(404, 'Not found');
  }
};

export const findOneAndCompare = async ctx => {
  try {
    const { params, link } = ctx.request.body;
    ctx.body = await Product.find()
      .select(itemParams)
      .exec()
      .then(doc => {
        const resp = doc.filter(item => item.link === link);
        if (resp.length < 1) {
          ctx.throw(404);
        }
        return resp;
      })
      .then(item => {
        let result;
        item.forEach(x => {
          if (x.type === 'Плечевые') {
            result = compareTop(
              item,
              params.shoulders,
              params.breast,
              params.waist,
              params.hips,
              params.height,
            );
          } else {
            result = compareBottom(item, params.waist, params.hips);
          }
          return result;
        });
      });
  } catch (error) {
    ctx.throw(404, 'Not found');
  }
};

export const createProduct = async ctx => {
  try {
    const product = new Product({
      type: ctx.request.body.type,
      title: ctx.request.body.title,
      link: ctx.request.body.link,
      src: ctx.request.body.src,
      sizes: ctx.request.body.sizes,
      brand: ctx.request.body.brand,
      itemLength: ctx.request.body.length,
      price: ctx.request.body.price,
      color: ctx.request.body.color,
    });
    ctx.body = await product
      .save()
      .then(result => result)
      .catch(ctx.throw(400));
  } catch (error) {
    ctx.throw(400, 'Validation failed');
  }
};

export const editProduct = async ctx => {
  try {
    const { productId } = ctx.request.params;
    const req = ctx.request.body;

    const updatedItem = {
      type: req.type,
      title: req.title,
      price: req.price,
      link: req.link,
      src: req.src,
      brand: req.brand,
      color: req.color,
      sizes: req.sizes,
      itemLength: req.length,
    };

    ctx.body = await Product.findByIdAndUpdate(productId, updatedItem)
      .exec()
      .then(() => ({
        message: 'Product updated!',
        request: { type: 'GET', url: `http://localhost:8081/products/${productId}` },
      }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const deleteProduct = async ctx => {
  try {
    const { productId } = ctx.request.params;
    ctx.body = await Product.remove({ _id: productId })
      .exec()
      .then(() => ({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: `http://localhost:8081/products/create`,
        },
      }));
  } catch (error) {
    ctx.throw(500, error);
  }
};
