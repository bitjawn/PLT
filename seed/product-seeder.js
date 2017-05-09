var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/app-products');

var products = [
    new Product({
        imagePath:'images/box.png',
        title: 'Box',
        category: 'Container',
        description: 'Lorem ipsum dolor. Sit amet eu vitae orci rutrum. Dolor tortor dictumst ultricies vel adipiscing malesuada vehicula lectus. Per mollis praesent nascetur aliquam.',
        price: 10,
        quantity: 34
    }),
    new Product({
        imagePath:'images/dragonflies.png',
        title: 'Dragonflies',
        category: 'Bathroom',
        description: 'Lorem ipsum dolor. Sit amet eu vitae orci rutrum. Dolor tortor dictumst ultricies vel adipiscing malesuada vehicula lectus. Per mollis praesent nascetur aliquam.',
        price: 12,
        quantity: 33
    }),
    new Product({
        imagePath:'images/mushrooms.png',
        title: 'Mushrooms',
        category: 'kitchen',
        description: 'Lorem ipsum dolor. Sit amet eu vitae orci rutrum. Dolor tortor dictumst ultricies vel adipiscing malesuada vehicula lectus. Per mollis praesent nascetur aliquam.',
        price: 15,
        quantity: 24
    })
];

var done = 0;
for (var p in products) {
    var objP = products[p];
    objP.save(function(err, result){
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}