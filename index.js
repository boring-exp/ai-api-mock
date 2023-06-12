const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaCors = require('@koa/cors')
const successReply = require('./mock-data/weather-success.json')
const failReply = require('./mock-data/weather-fail.json')

const server = new Koa()
const router = new KoaRouter

router.get('/area-to-id', async (ctx) => {
    const appCode = ctx.request.headers['authorization']
    console.log(appCode)
    const queryP = ctx.query
    if (queryP) {
        const res = Object.keys(queryP).find(key => {
            console.log(key)
            return key === 'area' || key === 'areaCode'
        })
        console.log(res)
        if (!res) {
            failReply.showapi_res_error = '没有area或者areaCode'
            ctx.body = failReply
            return;
        }
    }
    if (appCode) {
        console.log(appCode)
        const valid = `${appCode}`.split(' ')
        console.log(valid)
        if (valid[0] === 'APPCODE') {
            ctx.body = successReply
            return;
        }
    } else {
        ctx.body = failReply;
    }
})
server.use(router.routes()).use(router.allowedMethods())
server.use(KoaCors())

server.listen(8000, () => {
    console.log('server is listenning on http://localhost:3000/')
})