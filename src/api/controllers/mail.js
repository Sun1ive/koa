// @ts-check
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

export const postLink = async ctx => {
  const mailBody = {
    from: '"Sunlive test 👻" <dev@indresser.com>',
    to: 'sunliveua@gmail.com',
    subject: 'Hello ✔',
    html: `<h1>Hello</h1>
    <p>you have got missed link</p>
    <p>${ctx.request.body.link}</p>`,
  };
  await transporter
    .sendMail(mailBody)
    .then(() => {
      ctx.status = 200;
      ctx.body = { message: 'Mail has been sent' };
    })
    .catch(e => {
      ctx.throw(403, e);
    });
};

export const postUser = async ctx => {
  const mailBody = {
    from: '"Sunlive test 👻" <dev@indresser.com>',
    to: 'sunliveua@gmail.com',
    subject: 'Hello ✔',
    html: `<h1>Hello</h1>
    <p>Пользователь ${ctx.request.body.name} оставил запрос.</p>
    <p>Свяжитесь со мной с помощью ${ctx.request.body.type}</p>
    <p>Контакт: ${ctx.request.body.source}</p>`,
  };
  await transporter
    .sendMail(mailBody)
    .then(() => {
      ctx.status = 200;
      ctx.body = { message: 'Mail has been sent' };
    })
    .catch(e => {
      ctx.throw(403, e);
    });
};
