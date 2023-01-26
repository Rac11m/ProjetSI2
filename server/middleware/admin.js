function admin(req, res, next) {
  if (req.user?.role === "admin") next();
  else res.status(403).send("Access denied, user must be Admin");
}

module.exports = admin;
