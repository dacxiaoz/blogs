module.exports = option =>{
    return async function adminauth(ctx,next){
        if(ctx.request.body.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}