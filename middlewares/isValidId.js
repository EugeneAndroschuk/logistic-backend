const { isValidObjectId } = require('mongoose');
const {HttpError} = require('../utils');

const isValidId = (req, res, next) => {
    const { driveId } = req.params;
    if (!isValidObjectId(driveId)) next(HttpError(400, `${driveId} is not valid, please enter correct id`));
    
    next();
}

module.exports = isValidId;