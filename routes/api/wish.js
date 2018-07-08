const Wishlist = require('../../db').Wishlist
const Product = require('../../db').Product
const db = require('../../db').db

const route = require('express').Router()
const Sequelize = require('sequelize')


route.post('/', (req, res) => {
    // We expect the req to have name in it
    // We will create a new user 
   Wishlist.findAll({
       where :{
           Product_id : parseInt(req.body.Product_id)
       }       
   }).then((wishlist) => {
       if(wishlist.length == 0){
           addtowishlist()
       }
     else if(wishlist.length) {
         res.status(201).send({message:"you cannot add products"})
        }
       
   })
    .catch((err) => {
        res.status(501).send({
            error: "Error fetching products"
        })
    })
    
    
    function addtowishlist()
    {
    Wishlist.create({
        User_id:parseInt(req.body.User_id),
        Product_id:req.body.Product_id,

    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
    
}
})






route.post('/wishlistfetch', (req, res) => {
    
    db.query('select wishlists.User_id,products.* from wishlists inner join products on wishlists.Product_id=products.id where wishlists.User_id=?',{replacements: [req.body.User_id], type: Sequelize.QueryTypes.SELECT} )
    .then(function(wish)  {
        console.log(wish)
        res.status(201).send(wish)
    }).catch((err) => {
        res.status(501).send({
            error: "Could not retreive "
        })
    })
    
    
 
})





route.post('/wishlist_destroy',(req,res) =>{
	Wishlist.destroy({
		where: {
			User_id:parseInt(req.body.User_id),
			Product_id:req.body.Product_id,
		}
	}).then(()=> {
        res.status(201).send({message:"deleted"})
    }).catch((err) => {
        res.status(501).send({
            error: "Could not delete"
        })
    })

})







// route.get('/wishfetch', (req, res) => {
//     // We want to send an array of all users
//     // From our database here

//     Wishlist.findAll()
//         .then((users) => {
//             res.status(200).send(users)
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 error: "Could not retrive users"
//             })
//         })

// })




    
           
exports = module.exports = route