import { verifyJwt } from "../utils/verifyToken.js";

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({
      message: "Unauthorized Access || Token is not Present",
    });
  }

  try {
    const decodeToken = verifyJwt(token);

    req.body.userId = decodeToken.userId;
    req.body.email = decodeToken.email;

    next();
  } catch (error) {
    res
      .status(401)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        error: error.name,
        message: error.message,
      });
  }
};

export { authMiddleware };
