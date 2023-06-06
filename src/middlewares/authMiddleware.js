const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET);

      req.user = decodedToken;
      res.locals.isAuthenticated = true

      next();
    } catch (error) {
      res.clearCookie("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};


exports.isAuth = (req,res,next) => {
  if(!req.user) {
    return res.redirect('/users/login')
  }

  next()
}