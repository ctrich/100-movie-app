module.exports = {
    ensureAuth: function (req, res, next) {
        res.locals.login = req.isAuthenticated();
        return next();
    }
  }
  