import express from  'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, productCategoryController, productController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, singleProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

// routes
//create product route
router.post('/create-product',requireSignIn,isAdmin, formidable(),createProductController)


//update product route
router.put('/update-product/:pid', requireSignIn,isAdmin, formidable(), updateProductController)


//getall prodcut route
router.get('/get-product', productController)


//single product
router.get('/get-product/:slug', singleProductController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//filter product
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)


//similar product
router.get('/related-product/:pid/:cid', relatedProductController)


//category product
router.get('/product-category/:slug', productCategoryController)


export default router