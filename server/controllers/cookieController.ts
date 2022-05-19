import * as types from '../types';

const cookieController: Record<string, types.middlewareFunction> = {};

cookieController.setCookieCredentials = (req, res, next) => {
  res.cookie('name', res.locals.confirmation.name, { maxAge: 900000 });
  res.cookie('arn', res.locals.confirmation.arn, { maxAge: 900000 });
  res.cookie('externalId', res.locals.confirmation.externalId, { maxAge: 900000 });
  res.cookie('region', res.locals.confirmation.region, { maxAge: 900000 });
  return next();
};

cookieController.getCookieCredentials = (req, res, next) => {
  // console.log('entered getCookieCredentials');
  const { name, arn, externalId, region } = req.cookies;
  // console.log('COOKIES: ', req.cookies)
  res.locals.userData = {
    name,
    arn,
    externalId,
    region,
  };
  return next();
};

cookieController.resetCookieCredentials = (req, res, next) => {
  const { name, arn, externalId, region } = req.cookies;
  res.clearCookie('name');
  res.clearCookie('arn');
  res.clearCookie('externalId');
  res.clearCookie('region');
  return next();
};

export default cookieController;
