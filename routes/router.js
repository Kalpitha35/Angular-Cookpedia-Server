const express = require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadRecipeController = require('../controllers/downloadRecipeController')
const saveRecipeController = require('../controllers/saveRecipeController')

const router = new express.Router()

//all-recipes
router.get('/all-recipes',recipeController.getAllRecipeController)

//add-testimony
router.post('/add-testimony',testimonyController.addTestimonyController)

//add-user
router.post('/register',userController.addUserControler)

//login
router.post('/login',userController.loginController)

//view single Recipe
router.get('/recipe/:id/view',jwtMiddleware,recipeController.getRecipeController)

//related recipe
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipeController)

//download recipe
router.post('/recipe/:id/download',jwtMiddleware,downloadRecipeController.addToDownloadRecipeController)

//save recipe
router.post('/recipe/:id/save',jwtMiddleware,saveRecipeController.addToSaveRecipeController)

//get usersave recipe
router.get('/get-save-recipes',jwtMiddleware,saveRecipeController.getUserSavedRecipeController)

//delete user saved recipe
router.delete('/save-recipes/:id/remove',jwtMiddleware,saveRecipeController.removeSaveRecipeController)

//get user download recipe
router.get('/user-downloads',jwtMiddleware,downloadRecipeController.getUserDownloadListController)

// edit-user
router.post('/user/edit',jwtMiddleware,userController.editUserController)

// all-user
router.get('/all-users',jwtMiddleware,userController.getAllUsersController)

// download-list
router.get('/download-list',jwtMiddleware,downloadRecipeController.getAllDownloadListController)

//get-testimony
router.get('/all-feedback',jwtMiddleware,testimonyController.getAllFeedbackController)

//update-testimony
router.get('/feedback/:id/update',jwtMiddleware,testimonyController.updateFeedbackStatusController)

//all-approved feedback
router.get('/all-approved-feedback',testimonyController.getAllApprovedFeedbackController)

//add-recipes
router.post('/add-recipe',jwtMiddleware,recipeController.addRecipeController)

//edit-recipe
router.put('/recipe/:id/edit',jwtMiddleware,recipeController.updateRecipeController)

//delete recipe
router.delete('/recipes/:id/remove',jwtMiddleware,recipeController.removeRecipeController)

module.exports = router