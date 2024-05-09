const express = require('express');
const app = express();
const Connectodb = require('./db.js');
const Authintication = require("./router/Auth.js");
const Product =require("./router/Products.js")
const cart =require('./router/Cart.js')
const address=require('./router/Address.js')
Connectodb();
var cors = require('cors')
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('<a href="http://google.com">Ankit</a>' );

});

app.use('/Auth', Authintication);
app.use('/prod', Product);
app.use('/cartdata',cart );
app.use('/address', address);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


