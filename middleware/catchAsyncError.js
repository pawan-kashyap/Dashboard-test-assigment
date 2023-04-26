module.exports = (catchAsyncErr) =>(req,res,next)=>{
    Promise.resolve(catchAsyncErr(req,res,next)).catch(next)
}