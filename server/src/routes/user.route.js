import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user.controller.js';
import favoriteController from '../controllers/favorite.controller.js';
import userModel from '../models/user.model.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import requestHandler from '../handlers/request.handler.js';

const router = Router();

router.post(
   "/signup",
   body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 1 }).withMessage("usernmae can not be empty")
      .custom(async (value) => {
         const user = await userModel.findOne({ username: value })

         if(user) return Promise.reject("username allready used")
      }),
   body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
   body("confirmPassword")
      .exists().withMessage("confirm password is required")
      .isLength({ min: 8 }).withMessage("confirm password minimum 8 characters")
      .custom(async (value,  { req }) => {
         if(value !== req.body.password) throw new Error("confirm password not match!")
         return true
      }),
   body("displayName")
      .exists().withMessage("display name is required")
      .isLength({ min: 1 }).withMessage("display name minimum 1 characters"),
   requestHandler.validate,
   userController.signup
);

router.post(
   "/signin",
   body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 1 }).withMessage("username can not be empty"),
   body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
   requestHandler.validate,
   userController.signin
);

router.put(
   "/update-password",
   tokenMiddleware.auth,
   body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
   body("newPassword")
      .exists().withMessage("new password is required")
      .isLength({ min: 8 }).withMessage("new password minimum 8 characters"),
   body("confirmNewPassword")
      .exists().withMessage("new confirm password is required")
      .isLength({ min: 8 }).withMessage("new confirm password minimum 8 characters")
      .custom(async (value, { req }) => {
         if(value !== req.body.newPassword) throw new Error("confirm password not match")
         return true
      }),
   requestHandler.validate,
   userController.updatePassword
)

router.get(
   "/info", 
   tokenMiddleware.auth, 
   userController.getInfo
);

router.get(
   "/favorites",
   tokenMiddleware.auth,
   favoriteController.getFavoriteOfUser
)

router.post(
   "/favorites",
   tokenMiddleware.auth,
   body("mediaType")
      .exists().withMessage("media type is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("media type invalid"),
   body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
   body("mediaTitle")
      .exists().withMessage("media title is required"),
   body("mediaPoster")
      .exists().withMessage("media poster is required"),
   body("mediaRate")
      .exists().withMessage("media rate is required"),
   requestHandler.validate,
   favoriteController.addFavorite
)

router.delete(
   "/favorites/:favoriteId",
   tokenMiddleware.auth,
   favoriteController.removeFavorite
)

export default router