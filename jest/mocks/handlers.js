/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { SERVER } from '../../src/constants/index';

// const SERVER = 'https://api-ice-cream.herokuapp.com';
// console.log(process.env);
// console.log(import.meta.env.MODE); // test

export const handlers = [
  rest.get(`${SERVER}/scoops`, (_req, res, ctx) => res(
    ctx.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ]),
  )),
  rest.get(`${SERVER}/toppings`, (_req, res, ctx) => res(
    ctx.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
    ]),
  )),
  rest.post(`${SERVER}/order`, (_req, res, ctx) => res(ctx.json({ orderNumber: 123455676 }))),
];
