import Redis from 'ioredis';
import 'dotenv/config';
import { middlewareFunction } from '../../types'

// Redis instance for cache
const cache = new Redis({
  host: process.env.REDIS_URL,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
})

//redis get function to look up arn + specific query in cache
export const cacheGet: middlewareFunction = async (req, res, next) => {
  try {
    //take userspecific information and the endpoint they are accessing
    const { arn } = res.locals.userData;
    const queryString = req.originalUrl;
  
    //add variable to check whether user wants to bypass retrieving from cache
    //let { syncData } = req.body
  
    const cachedData = await cache.get(`${arn}${queryString}`)

    // const cachedData = await cache.get(`foo`)
      //add condition to below if user wants to bypass this (maybe we shouldn't fetch cache anyway)

    if(typeof cachedData ==='string') {
      console.log('found cached data for ', req.originalUrl)
      res.status(200).send(JSON.parse(cachedData))
      // res.status(200).send(['123'])
    } else next();    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

//redis set function to set arn+ specific query, TTL, and the cached value
export const cacheSet:middlewareFunction = async (req, res, next) => {
  //declare map of TT
    // const timeScale: {} = {
  const timeScale: { [key: string]: number } = {
    '7d': 24 * 60 * 60,
    '24hr': 12 * 60 * 60,
    '12hr': 60 * 60,
    '1hr': 30 * 60,
  }

  if (!req.params.period) req.params.period = '1hr'
  console.log('setting into cache')
  cache.set(`${res.locals.userData.arn}${req.originalUrl}`, JSON.stringify(res.locals.toBeCached), 'EX', timeScale[req.params.period])
  console.log('cache is set')
  next()
}