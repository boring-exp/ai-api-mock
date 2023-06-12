const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaCors = require('@koa/cors')
const successReply = require('./mock-data/weather-success.json')
const failReply = require('./mock-data/weather-fail.json')

const server = new Koa()
const router = new KoaRouter

router.get('/v3/weather/weatherInfo', async (ctx) => {
    const queryP = ctx.query
    if (queryP.key && queryP.city && queryP.extensions) {
        ctx.body = successReply
        return;
    } else {
        ctx.body = failReply
    }
})
server.use(router.routes()).use(router.allowedMethods())
server.use(KoaCors())

server.listen(8000, () => {
    console.log('server is listenning on http://localhost:3000/')
})