import WooCommerceAPI from 'woocommerce-api';

const WooCommerce = new WooCommerceAPI({
  url: 'https://indresser.com',
  consumerKey: 'ck_f2bb7f101b26e5b9d2c3bc32adab477dafd7ed94',
  consumerSecret: 'cs_47c2e513b2d82f8260f5da2a449a7bc6d470f932',
  wpAPI: true,
  version: 'wc/v2',
});

export default async ctx => {
  const page = Object.keys(ctx.query).toString();

  async function getProducts() {
    try {
      const arr = [];
      const response = await WooCommerce.getAsync(`products/?page=${page}`);
      const data = JSON.parse(response.body);
      data.forEach(x => {
        arr.push({
          id: x.id,
          title: x.name,
          src: x.images[0].src,
          link: x.permalink,
          price: x.price,
        });
      });
      ctx.status = 200;
      ctx.body = arr;
    } catch (error) {
      ctx.throw(403, error);
    }
  }
  await getProducts();
};
