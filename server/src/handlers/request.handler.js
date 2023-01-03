import { validationResult } from 'express-validator';
import responseHandler from './response.handler.js';

const validate = (req, res, next) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()) return responseHandler.badrequest(res, errors.array()[0].msg);

   next();
}

export default { validate };