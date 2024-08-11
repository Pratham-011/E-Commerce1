import slugify from "slugify"
import fs from 'fs'
import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import braintree from 'braintree'
import orderModel from "../models/orderModel.js"

//paymnet gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '82yhzw6vnrzwd2yh',
    publicKey: 'jyrty5df7jdsfny9',
    privateKey: '104bc1270ccb34c71c45acc26dc63e47',
  });

export const createProductController = async(req,res) =>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({ error: "Name is required"})
            case !description:
                return res.status(500).send({ error: "Description is required"})
            case !price:
                return res.status(500).send({ error: "Price is required"})                   
            case !category:
                return res.status(500).send({ error: "Category is required"})
            case !quantity:
                return res.status(500).send({ error: "Quantity is required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Phtot is required and les than 1mb"})
                                   
        }
      
        const products =  new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message:'new Prodcut created',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creatng product'
        })
    }
}

//update category controller

export const updateProductController = async(req,res) =>{
    try {
        const {name,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({ error: "Name is required"})
            case !description:
                return res.status(500).send({ error: "Description is required"})
            case !price:
                return res.status(500).send({ error: "Price is required"})                   
            case !category:
                return res.status(500).send({ error: "Category is required"})
            case !quantity:
                return res.status(500).send({ error: "Quantity is required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Phtot is required and les than 1mb"})
                                   
        }
      
        const products =  await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)},{new:true}
        )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message:' Prodcut updated',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  Updating product'
        })
    }
}

//egt all category
export const productController = async(req,res) =>{
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All PRoducts List",
            products,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while gettign all products'
        })   
    }
}


//single category
export const singleProductController = async(req,res) =>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: "Single Product List",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while gettign Single product'
        })  
    }
}


//delete category
export const deleteProductController = async(req,res) =>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: " Product Deleted Successfully",
            
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while Deleting  Product'
        })     
    }
}


//get phtot
export const productPhotoController = async(req,res) =>{
    try {
        const products = await productModel.findById(req.params.pid).select('photo')
        if(products.photo.data){
            res.set('Content-type',products.photo.contentType)
            return res.status(200).send(products.photo.data)
        }
    } catch (error) {
        console.log(error)
                res.status(500).send({
                    success:false,
                    error,
                    message:'Error while getting  photo'
                })  
    }
}

export const productFilterController = async(req,res) =>{
    try {
        const {checked,radio} = req.body
        let args = {}
        if(checked.length > 0)args.category = checked
        if(radio.length) args.price = {$gte:radio[0] , $lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while getting  flter' 
        })
    }
}

//product count 
export const productCountController = async(req,res) =>{
    try {
       const total = await productModel.find({}).estimatedDocumentCount()
       res.status(200).send({
        success:true,
        total,
    }) 
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while getting  flter' 
        })
    }
}

//per product oage
export const productListController = async(req,res) =>{
    try {
        const perPage = 2
        const page  = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page -1) * perPage).limit(perPage).sort({ createdAt: -1})
        res.status(200).send({
            success:true,
            products,
        }) 
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while getting  flter' 
        })
    }
}

//search controller
export const searchProductController = async(req,res) =>{
    try {
        const {keyword } = req.params
        const results  = await productModel
        .find ({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                { description:{$regex: keyword, $options: "i"}},
            ],
        })
        .select("-photo");
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while searching prodcut' 
        })   
    }
}


//similar product
export const relatedProductController = async(req,res) =>{
    try {
        const {pid,cid} = req.params
        const products = await productModel
        .find({
            category: cid,
            _id: { $ne:pid},
        })
        .select("-photo")
        .limit(3)
        .populate("category")
        res.status(200).send({
            success:true,
            products,
        }) 
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while getting related prodcut' 
        }) 
    }
}


//catgeory wise product
export const productCategoryController = async(req,res) =>{
    try {
      const category  = await categoryModel.findOne({ slug: req.params.slug})
      const products = await productModel.find({category}).populate("category")
      res.status(200).send({
        success:true,
        category,
        products,
    })  
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
                    error,
                    message:'Error while getting  prodcut wise category' 
        }) 
    }
}

// paymen getway api
//token
export const braintreeTokenController = async(req,res) =>{
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response)
            }
        } ) 
    } catch (error) {
        console.log(error)
        
    }
}

//payment
export const braintreePaymentController = async(req,res) =>{
    try {
        const {cart, nonce} = req.body
        let total = 0
        cart.map((i) => {
            total += i.price
        })
        let newTransaction = gateway.transaction.sale({
            amount:total,
             paymentMethodNonce:nonce,
             options:{
                submitForSettlement:true,
             },
        },
        function(error,result){
            if(result){
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
    )
    } catch (error) {
        console.log(error)

    }
}
