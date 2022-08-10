const express = require('express');

// middleware
const authUser = require('../../middleware/user.auth');
const authAdmin = require('../../middleware/admin.auth');

// controllers
const userController = require('../../controllers/user.controller');
const adminController = require('../../controllers/admin.controller');
const tokenController = require('../../controllers/token.controller');

const router = express.Router();

/**
 * @openapi
 * /authUser
 *   post:
 *     summary: Get user by token
 *     tags: [Auth]
 *     description: Get user by token.
 *     responses:
 *       201:
 *         description: Return user in case of successful.
 */
router.get('/authUser', authUser, userController.authUser);

/**
 * @openapi
 * /authUser
 *   post:
 *     summary: Authenticate user & get token
 *     tags: [Auth]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: password
 *         schema:
 *           type: string
 *         required: true 
 *     description: Authenticate user & get token.
 *     responses:
 *       201:
 *         description: Return user in case of successful login.
 */
router.post('/authUser', userController.getAuthToken);

/**
 * @openapi
 * /users
 *   post:
 *     summary: Register user
 *     tags: [Users]
 *     parameters:
 *       - in:
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: country
 *         schema:
 *           type: string
 *         required: true 
 *       - in:
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     description: Register user.
 *     responses:
 *       201:
 *         description: Return auth token in case of successful register.
 */
router.post('/users', userController.registerUser);

/**
 * @openapi
 * /users/updateMembershipByUser
 *   post:
 *     summary: Update Membership By User & Add New History
 *     tags: [Users]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: membership
 *         schema:
 *           type: number
 *         required: true
 *     description: Update Membership By User & Add New History.
 *     responses:
 *       201:
 *         description: Update membership & add new history in case of successful.
 */
router.post('/users/updateMembershipByUser', authUser, userController.updateMembershipByUser);

/**
 * @openapi
 * /tokens/list
 *   post:
 *     summary: List All Token By User
 *     tags: [Tokens]
 *     description: List All Token By User.
 *     responses:
 *       201:
 *         description: Return token list in case of successful.
 */
router.get('/tokens/list', authUser, tokenController.getAllTokensByUser);

/**
 * @openapi
 * /users/all
 *   post:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Get all users.
 *     responses:
 *       201:
 *         description: Return users in case of successful.
 */
router.get('/users/all', authAdmin, userController.getAllUsers);

/**
 * @openapi
 * /users/delete
 *   post:
 *     summary: Delete User By Email
 *     tags: [Users]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     description: Delete User By Email.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/users/delete', authAdmin, userController.deleteUser);

/**
 * @openapi
 * /users/updateMembershipByAdmin
 *   post:
 *     summary: Update Membership By Admin
 *     tags: [Users]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: membership
 *         schema:
 *           type: number
 *         required: true
 *     description: Update Membership By Admin.
 *     responses:
 *       201:
 *         description: Update membership in case of successful.
 */
router.post('/users/updateMembershipByAdmin', authAdmin, userController.updateMembershipByAdmin);

/**
 * @openapi
 * /users/updateExpiredByAdmin
 *   post:
 *     summary: Update User's Expired By Email
 *     tags: [Users]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: expired
 *         schema:
 *           type: date
 *         required: true
 *     description: Update User's Expired By Email.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/users/updateExpiredByAdmin', authAdmin, userController.updateMembershipByAdmin);

/**
 * @openapi
 * /authAdmin
 *   post:
 *     summary: Get user by token
 *     tags: [Auth]
 *     description: Get user by token.
 *     responses:
 *       201:
 *         description: Return admin in case of successful.
 */
router.get('/authAdmin', authAdmin, adminController.authAdmin);

 /**
  * @openapi
  * /authAdmin
  *   post:
  *     summary: Authenticate admin & get token
  *     tags: [Auth]
  *     parameters:
  *       - in:
  *         name: email
  *         schema:
  *           type: string
  *         required: true
  *       - in:
  *         name: password
  *         schema:
  *           type: string
  *         required: true 
  *     description: Authenticate admin & get token.
  *     responses:
  *       201:
  *         description: Return admin in case of successful login.
  */
router.post('/authAdmin', adminController.getAuthToken);

/**
 * @openapi
 * /admins
 *   post:
 *     summary: Register admin
 *     tags: [Admins]
 *     parameters:
 *       - in:
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *     description: Register admin.
 *     responses:
 *       201:
 *         description: Return auth token in case of successful register.
 */
router.post('/admins', adminController.registerAdmin);

/**
 * @openapi
 * /admins/all
 *   post:
 *     summary: Get all admins
 *     tags: [Admins]
 *     description: Get all admins.
 *     responses:
 *       201:
 *         description: Return admins in case of successful.
 */
router.get('/admins/all', authAdmin, adminController.getAllAdmins);

/**
 * @openapi
 * /admins/delete
 *   post:
 *     summary: Delete Admin By Email
 *     tags: [Admins]
 *     parameters:
 *       - in:
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     description: Delete Admin By Email.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/admins/delete', authAdmin, adminController.deleteAdmin);

/**
 * @openapi
 * /tokens
 *   post:
 *     summary: List new Token
 *     tags: [Tokens]
 *     parameters:
 *       - in:
 *         name: address
 *         schema:
 *           type:  string
 *         required: true
 *       - in:
 *         name: chain
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: website
 *         schema:
 *           type: string
 *         required: true 
 *       - in:
 *         name: telegram
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: icon
 *         schema:
 *           type: string
 *         required: true
 *     description: List new Token.
 *     responses:
 *       201:
 *         description: Return Token in case of successful.
 */
router.post('/tokens', tokenController.listNewToken);

/**
 * @openapi
 * /tokens/update
 *   post:
 *     summary: Update Token Detail
 *     tags: [Tokens]
 *     parameters:
 *       - in:
 *         name: oldAddress
 *         schema:
 *           type:  string
 *         required: true
 *       - in:
 *         name: newAddress
 *         schema:
 *           type:  string
 *         required: true
 *       - in:
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true 
 *       - in:
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: symbol
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: chain
 *         schema:
 *           type: string
 *         required: true
 *       - in:
 *         name: website
 *         schema:
 *           type: string
 *         required: true 
 *       - in:
 *         name: telegram
 *         schema:
 *           type: string
 *         required: true
 *     description: Update Token Detail.
 *     responses:
 *       201:
 *         description: Return token in case of successful.
 */
router.post('/tokens/update', authAdmin, tokenController.updateTokenDetail);

/**
 * @openapi
 * /tokens/updateIsShow
 *   post:
 *     summary: Update Token's permission
 *     tags: [Tokens]
 *     parameters:
 *       - in:
 *         name: address
 *         schema:
 *           type:  string
 *         required: true
 *       - in:
 *         name: isShow
 *         schema:
 *           type:  boolean
 *         required: true
 *     description: Update Token's permission.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/tokens/updateIsShow', authAdmin, tokenController.updateIsShow);

/**
 * @openapi
 * /tokens/updateIsPaid
 *   post:
 *     summary: Update Token's flag
 *     tags: [Tokens]
 *     parameters:
 *       - in:
 *         name: address
 *         schema:
 *           type:  string
 *         required: true
 *       - in:
 *         name: isPaid
 *         schema:
 *           type:  boolean
 *         required: true
 *     description: Update Token's permission.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/tokens/updateIsPaid', authAdmin, tokenController.updateIsPaid);

/**
 * @openapi
 * /tokens/all
 *   post:
 *     summary: List All Token By Admin
 *     tags: [Tokens]
 *     description: List All Token By Admin.
 *     responses:
 *       201:
 *         description: Return token list in case of successful.
 */
router.get('/tokens/all', authAdmin, tokenController.getAllTokensByAdmin);

/**
 * @openapi
 * /tokens/delete
 *   post:
 *     summary: delete token from list
 *     tags: [Tokens]
 *     parameters:
 *       - in:
 *         name: address
 *         schema:
 *           type:  string
 *         required: true
 *     description: delete token from list.
 *     responses:
 *       201:
 *         description: Return true in case of successful.
 */
router.post('/tokens/delete', authAdmin, tokenController.deleteToken);

module.exports = router;