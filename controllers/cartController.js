//import cartitems collection/model
const cartitems = require('../models/cartSchema')

//to add item to cart
exports.addToCart = async (req,res)=>{
    //to get product properties from request body
    const { id,title,image,price,quantity }= req.body
    //logic
    try{
        //check product is already in cart
        const product = await cartitems.findOne({id})
        if(product){
            //product already in cart
            //increment quantity
            product.quantity+=1
            //update total price fro the product
            product.grantTotal = product.price * product.quantity
            //to save changes in monogdb
            await product.save()
            //send res to client
            res.status(200).json("Items added to your cart....")
        }
        else{
            //product is not in the cart
            //add product to cart collection
            const newProduct = new cartitems({
                id,title,price,image,quantity,grantTotal:price
            })
            //to save changes in monogdb
            await newProduct.save()
            //send res to client
            res.status(200).json("Item added to your cart....")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//getCartItems
exports.getCartItems = async (req,res)=>{
    //logic
    try {
        const allItems = await cartitems.find()
        //send allproducts to client
        res.status(200).json(allItems)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//removeanItem from cart
exports.removeCartItem = async (req,res)=>{
    //get id of product should be removed
    const { id } = req.params
    //logic
    try{
        const removeItem = await cartitems.deleteOne({id})
        if(removeItem){
             //get remaining items other than deleted one from cart
             const allItems = await cartitems.find()
             res.status(200).json(allItems)
        }
        else{
            res.status(404).json("Item is not in the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//increment cart item
exports.incrCartItem = async (req,res)=>{
    const {id} = req.params
    //logic
    try {
    const item = await cartitems.findOne({id})
    if(item){
        item.quantity+=1
        item.grantTotal = item.price*item.quantity
        await item.save()
        //get all items from cart
        const allItems = await cartitems.find()
        res.status(200).json(allItems)
    }
    else{
        res.status(404).json("Item is not in the cart")
    }
    }
    catch(error){
        res.status(401).json(error)    
    }
}

//decrement cart item
exports.decrCartItem = async (req,res)=>{
    const {id} = req.params
    //logic
    try {
    const item = await cartitems.findOne({id})
    if(item){
        //decrement quantity
        item.quantity-=1
        if(item.quantity==0){
            //remove item from cart
            const deleteItem = await cartitems.deleteOne({id})
                //get all items from cart
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            item.grantTotal = item.price*item.quantity
            await item.save()
            //get all items from cart
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        
    }
    else{
        res.status(404).json("Item is not in the cart")
    }
    }
    catch(error){
        res.status(401).json(error)    
    }
}

//empty cart
exports.emptyCart = async (req,res)=>{
    try{
        const result = await cartitems.deleteMany({})
        res.status(200).json("Your Cart is Empty")
    }
    catch(error){
        res.status(401).json(error)
    }
}