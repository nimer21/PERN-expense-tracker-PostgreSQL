import JWT from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "auth_failed",
            message: "Unauthorized. Authentication failed",
        });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized",
        });
    }

    try {
        const userToken = JWT.verify(token, process.env.JWT_SECRET);// Replace with your secret

        if (!userToken) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized",
            });
        }

        // req.body.user = {
        //     UserId: userToken.userId,
        // };
        req.body.user = userToken; // Attach decoded user data to req.body.user
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: "auth_failed",
            message: "Unauthorized. Authentication Failed",
        });
    }
    }

export default authMiddleware;