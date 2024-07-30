import express from  'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'


const router = express.Router()

// routes
//create category route
router.post('/create-category',requireSignIn,isAdmin, createCategoryController)


//update category route
router.put('/update-category/:id',requireSignIn,isAdmin, updateCategoryController)


//getall categpry route
router.get('/get-category', categoryController)


//single category
router.get('/single-category/:slug', singleCategoryController)

//delete catgeory
router.delete('/delete-category/:id',requireSignIn,isAdmin, deleteCategoryController)


export default router