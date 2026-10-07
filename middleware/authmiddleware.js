const jwt = require('jsonwebtoken');

exports.product = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).redirect('/auth/login');

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        next();
    }catch (e) {
        res.cleancookies ('token');
        return res.status(402).redirect('/auth/login');
    }
};

exports .authorize = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)) {
            return res.status (403).send ('access denied : unauthorized role');
        }
        next();
    };
};