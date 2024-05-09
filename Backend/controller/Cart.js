const cart = require('../Model/cart');


const Addtocart = async (req, res) => {
    const userData = req.User;
    const { productId,color,size } = req.body; // Assuming productId is sent in the request body
    
    try {
        const cartitem=await cart.findOne({ product: productId}) ;     

        if (cartitem) {
            return res.status(401).json({ msg: "Item already exists" });
        } 
       
        const newCartItem =  new cart({
            color:color,
            size:size,
            user: userData.userid, // Assuming the user ID is stored in _id
            product: productId
        });
       
         // Save the new cart item to the database
        const savedCartItem = await newCartItem.save();
        console.log(savedCartItem);

        res.status(200).json({ message: 'Item added to cart successfully', cartItem: savedCartItem });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const fetchcartdata = async (req, res) => {
    try {
        const userinfo = req.User;
        const id = userinfo.userid;
    

        const data = await cart.find({"user":id});
        const ndata = await cart.find({ "user": id }).populate('product');

        res.status(200).json({ message: 'cart items', cartItem: ndata });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deletecart = async (req, res) => {
    const userData = req.User;
    const { productId } = req.body; // Assuming productId is sent in the request body
    console.log(userData,productId,"ahg");
    try {
        // Find the cart item to delete
        const cartItemToDelete = await cart.findOne({ user: userData.userid, product: productId });
        
        // If the item doesn't exist in the cart, return an error
        if (!cartItemToDelete) {
            return res.status(404).json({ msg: "Item not found in the cart" });
        }
      
        // Delete the cart item from the database
        await cart.deleteOne({ _id: cartItemToDelete._id });

        return res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteAllCartItems = async (req, res) => {
    const userData = req.User; // Assuming user information is available in req.User
    const userId = userData.userid; // Assuming the user ID is stored in _id
   
    try {
        // Find all cart items for the user
        const cartItemsToDelete = await cart.find({ user: userId });
        
        // If no cart items are found for the user, return an error
        if (cartItemsToDelete.length === 0) {
            return res.status(404).json({ msg: "No cart items found for the user" });
        }
      
        // Delete all cart items for the user from the database
        await cart.deleteMany({ user: userId });

        return res.status(200).json({ message: 'All cart items removed successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal server error' });
    }
};







module.exports = { Addtocart,fetchcartdata,deletecart,deleteAllCartItems };
