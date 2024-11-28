const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role && req.user.role !== 'admin') {
            return res.status(403).json({ message: "You do not have permission to access this resource" });
        }
        next();
    };
};

module.exports = checkRole;
