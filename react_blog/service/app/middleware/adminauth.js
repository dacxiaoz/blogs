module.exports = option =>{
    return async function adminauth(ctx,next){
        if(ctx.request.body){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}