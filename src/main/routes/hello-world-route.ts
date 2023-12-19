import { type Router } from 'express';

export default (router: Router): void => {
  router.get('/hello-world', (req, res) => {
    return res.send('Hello World!');
  });
};
