const verifyLeader = (req, res, next) => {
    if (req.user.isLeader) {
        next();
    } else {
        res.status(403).json("You're not allowed to do that!");
    }
};

module.exports = { verifyLeader };
