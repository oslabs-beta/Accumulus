import Redis from 'ioredis';
import { middlewareFunction } from '../../types'

//Redis instance for cache
const cache = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS
})

//redis get function to look up arn + specific query in cache
export const cacheGet: middlewareFunction = (req, res, next) => {

  //take userspecific information and the endpoint they are accessing
  const { arn } = res.locals.userData;
  const queryString = req.originalUrl;

  //add variable to check whether user wants to bypass retrieving from cache
  //let { syncData } = req.body

  cache.get(`${arn}${queryString}`, (err, data) => {
    if(err) throw err;
    //add condition to below if user wants to bypass this (maybe we shouldn't fetch cache anyway)
    if(typeof data === 'string') res.status(200).send(JSON.parse(data));
    else next();
  })
}

//redis set function to set arn+ specific query, TTL, and the cached value
export const cacheSet: middlewareFunction = (req, res, next) => {
  //declare map of TTL
  const timeScale: { [key: string]: number } = {
    '7d': 24 * 60 * 60,
    '24hr': 12 * 60 * 60,
    '12hr': 60 * 60,
    '1hr': 30 * 60,
  }

  cache.set(`${res.locals.userData.arn}${req.originalUrl}`, JSON.stringify(res.locals.payload), 'EX', timeScale[req.params.period])
  next()
}