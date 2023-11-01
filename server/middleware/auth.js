import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    if (!token || token === "null") {
      throw new Error("Token not provided");
    }

    let decodedData;

    if (isCustomAuth) {
      decodedData = jwt.verify(token, 'test'); // Replace 'your-secret-key' with your actual secret key
    } else {
      decodedData = jwt.decode(token);
    }

    if (!decodedData) {
      throw new Error("Invalid token");
    }

    req.userId = decodedData?.id || decodedData?.sub;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).json({ message: 'Authentication failed' });
  }
};

export default auth;
