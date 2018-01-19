import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.adm.tools',
  port: 465,
  secure: true,
  auth: {
    user: 'dev@indresser.com',
    pass: '0yE98NOhsx4A',
  },
});

export const postLink = ctx => {
  const mailBody = {
    from: '"Sunlive test 👻" <dev@indresser.com>',
    to: 'sunliveua@gmail.com',
    subject: 'Hello ✔',
    html: `<h1>Hello</h1>
    <p>you have got missed link</p>
    <p>${ctx.request.body.link}</p>`,
  };
  transporter.sendMail(mailBody, (err, info) => {
    if (err) {
      ctx.throw(403);
    }
  });
  ctx.status = 200;
  ctx.body = 'Mail Sent';
};

export const postUser = ctx => {
  let obj = {};
  if (ctx.request.body.phone) {
    obj = { type: 'Телефон', data: ctx.request.body.phone };
  } else if (ctx.request.body.email) {
    obj = { type: 'email', data: ctx.request.body.email };
  } else {
    obj = { type: 'Messenger', data: ctx.request.body.messenger };
  }
  const mailBody = {
    from: '"Sunlive test 👻" <dev@indresser.com>',
    to: 'sunliveua@gmail.com',
    subject: 'Hello ✔',
    html: `<h1>Hello</h1>
    <p>Свяжитесь со мной с помощью ${obj.type}</p>
    <p>${ctx.request.body.name}</p>
    <p>${obj.data}</p>`,
  };
  transporter.sendMail(mailBody, err => {
    if (err) {
      ctx.throw(403);
    }
  });
  ctx.status = 200;
  ctx.body = {
    message: 'Mail sent',
  };
};
