import jwt from "jsonwebtoken";

export const isAuthenticated = (request,response,next)=> {
    const token = request.cookies.token || 
                  (request.headers.authorization && 
                   request.headers.authorization.startsWith("Bearer") ? 
                   request.headers.authorization.split(" ")[1] : null);
    if(!token){
        return response.status(401).json({message:"Unauthorized, no token"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        request.user = decoded.userId;
        console.log("decoded user id:", decoded.userId);
        console.log("request user id:", request.user);
        next()
    }catch(error){
        return response.status(401).json({message:"Unauthorized, invalid token"})
    }
}