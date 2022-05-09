import * as types from '../types';

const cookieController: Record<string, types.middlewareFunction> = {};

cookieController.setCookieCredentials = (req, res, next) => {
  res.cookie('arn', res.locals.confirmation.arn, { maxAge: 900000, httpOnly: true });
  res.cookie('externalId', res.locals.confirmation.externalId, { maxAge: 900000, httpOnly: true });
  res.cookie('region', res.locals.confirmation.region, { maxAge: 900000, httpOnly: true });
  return next();
}

cookieController.getCookieCredentials = (req, res, next) => {
  const { arn, externalId, region } = req.cookies;
  if (!arn || !externalId || !region) {
    res.clearCookie('arn')
    res.clearCookie('externalId')
    res.clearCookie('region')
    return res.redirect('http://localhost:4000/') // redirect login?
  }
  res.locals.credentials = {
    arn,
    externalId,
    region
  }
  return next();
}

export default cookieController;
