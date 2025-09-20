const isAdmin = (req, res, next) => {
  if (!req.user && !req.id) {
    return res.status(401).json({ message: 'Not authenticated', success: false });
  }
  // user object may be attached as req.user or just id as req.id
  // You may want to fetch user from DB if only id is present
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  if (req.role === 'admin') {
    return next();
  }
  // fallback: fetch user from DB if only id is present
  if (req.id) {
    // Lazy require to avoid circular deps
    const { User } = require('../models/user.model.js');
    User.findById(req.id).then(user => {
      if (user && user.role === 'admin') {
        req.user = user;
        return next();
      }
      return res.status(403).json({ message: 'Admin access required', success: false });
    }).catch(() => {
      return res.status(403).json({ message: 'Admin access required', success: false });
    });
    return;
  }
  return res.status(403).json({ message: 'Admin access required', success: false });
};

export default isAdmin;
