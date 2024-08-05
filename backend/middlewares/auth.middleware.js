import { verifyJwt } from "../utils/verifyToken.js";

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    return res.status(403).json({
      message: "Unauthorized Access || Token is not Present",
    });
  }

  try {
    const decodeToken = verifyJwt(token);
    console.log(decodeToken["email"]);

    req.userId = decodeToken["userId"];
    req.username = decodeToken["username"];
    req.email = decodeToken["email"];
    req.fullName = decodeToken["fullName"];
    console.log(decodeToken);

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .clearCookie("token", {
          httpOnly: true,
          secure: true,
        })
        .json({
          error: error.name,
          message: error.message,
        });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .clearCookie("token", {
          httpOnly: true,
          secure: true,
        })
        .json({
          error: error.name,
          message: error.message,
        });
    }
    res
      .status(401)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
      })
      .json({
        error: error.name,
        message: error.message,
      });
  }
};

export { authMiddleware };
