const express = require('express')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();
const { newOrderEmail } = require('./utils/new-order-email');

const app = express()
const port = 3000

const WooCommerce = new WooCommerceRestApi({
 url: process.env.WOOCOMMERCE_STORE_URL,
 consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
 consumerSecret: process.env.WOOCOMMERCE_SECRET_KEY,
 version: "wc/v3"
});

app.set('view engine', 'ejs')

// endpoint to check if the application is up and running
app.get('/', (req, res) => {
    res.send('The application is up and running!')
})

// retrieve all products in the store
app.get('/products', (req, res) => {
   WooCommerce.get("products")
       .then((response) => {
           res.render('pages/inventory', {
               products: response.data,
               currentPage: req.originalUrl
           });
       })
       .catch((error) => {
           console.log(error.response.data);
       });
})

// retrieve monthly sales report
app.get('/sales', (req, res) => {
    WooCommerce.get("reports/sales", {
                period: "month"
    })
    .then((response) => {
        res.render('pages/sales', {
            sales: response.data,
            currentPage: req.originalUrl
        })
    })
    .catch((error) => {
        console.log(error.response.data);
    });
})

 // retrieve all orders
app.get('/orders', (req, res) => {
    WooCommerce.get("orders")
        .then((response) => {
            res.render('pages/orders', {
                orders: response.data,
                currentPage: req.originalUrl
            })
        })
        .catch((error) => {
            console.log(error.response.data);
        });
 })

 app.post('/woocommerce-webhook/new-order', (req, res) => {
    const data = req.body; // Received data from the WooCommerce webhook
    console.log('New order:', data);
 
    if(data?.id){
        mg.messages.create(process.env.MAILGUN_SANDBOX_DOMAIN, {
            from: `WooCommerce Store <${process.env.MAILGUN_SENDER_EMAIL}>`,
            to: [process.env.MAILGUN_SENDER_EMAIL],
            subject: "New Order Created",
            html: newOrderEmail(data.order_key, `${data.billing.first_name} ${data.billing.last_name}`, data.billing.email, data.total, data.status, data.payment_method_title, data.line_items)
        })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error
    }
 
    res.status(200).send('Webhook received successfully'); // Send a response to WooCommerce
 });
 

app.listen(port, () => {
 console.log(`App listening on port ${port}`)
})
