const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No admin token, authorization denied!' });
  }

  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Admin Token is not valid' });
      } else {
        req.admin = decoded.admin;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with admin auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
