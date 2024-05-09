const jwt = require('jsonwebtoken');
const secret_key = "Iamayush";

const fetchdata = (req, res, next) => {
    const token = req.header('auth-token');
 

    if (!token) {
        return res.status(400).json({ msg: "User not authorized" });
    }

    try {
        const data = jwt.verify(token, secret_key);
   
        req.User = data; // Attach user data to the request object
       
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token. Please authenticate using a valid token." });
    }
}

module.exports = { fetchdata };
