//middleware
module.exports=(req,res,next) => {
    if(req.session){
        next()
    } else {
        res.status(401).json({message: "You gotta login first"})
    }
}