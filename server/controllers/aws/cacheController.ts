import Redis from 'ioredis';
import 'dotenv/config';
import { middlewareFunction } from '../../types'

// Redis instance for cache
const cache = new Redis({
  host: process.env.REDIS_URL,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
})

// redis get function to look up arn + specific query in cache
export const cacheGet: middlewareFunction = async (req, res, next) => {
  try {
    // take user specific information and the endpoint they are accessing as keys for redis
    const { arn } = res.locals.userData;
    const queryString = req.originalUrl;
    const { region } = req.body
  
    // variable to check whether user wants to bypass retrieving from cache and get fresh data
    let { sync } = req.body
  
    const cachedData = await cache.get(`${arn}${queryString}${region}`)

    // bypass if cached data is found and sync is true
    if(typeof cachedData ==='string' && !sync) {
      console.log('found cached data for ', req.originalUrl)
      res.status(200).send(JSON.parse(cachedData))
    } else next();    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// redis set function to set arn + specific query, TTL, and the cached value
export const cacheSet:middlewareFunction = async (req, res, next) => {
  //declare map of Time to expire ( in seconds ) 
  const timeScale: { [key: string]: number } = {
    '7d': 24 * 60 * 60,
    '24hr': 12 * 60 * 60,
    '12hr': 60 * 60,
    '1hr': 30 * 60,
  }

  if (!req.params.period) req.params.period = '24hr' // default to 1 for 
  console.log('setting into cache')
  cache.set(`${res.locals.userData.arn}${req.originalUrl}${req.body.region}`, JSON.stringify(res.locals.toBeCached), 'EX', timeScale[req.params.period])
  console.log('cache is set')
  next()
}