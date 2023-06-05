const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const user = await jwt.verify(token, process.env.SECRET);

      req.user = user;

      next();
    } catch (error) {
      res.clearCookie("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};
