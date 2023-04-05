const jwt =  require('jsonwebtoken');
const SecJwt ="youareunderabhi$dollar";

const fetchuser = (req, res, next)=>{
     const token = req.header('auth-token');
    if(!token ){
        return res.status(401).send({error :"Please authenticate with valid tickets"});
    }
    try {
        const data = jwt.verify(token , SecJwt);
        req.user= data.user;
        next();

    } catch (error) {
        return res.status(401).send({error :"Please authenticate with valid tickets"});

    }

}
module.exports= fetchuser ;
