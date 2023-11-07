const newOrderEmail = (orderId, customerName, customerEmail, orderTotal, orderStatus, paymentMethod, lineItems) => {
    const line_items = () => {
        return `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${lineItems.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.total}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    let template = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order Created</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                }
        
                h1 {
                    text-align: center;
                    color: #333;
                }
        
                .order-details {
                    margin-top: 30px;
                }
        
                .detail {
                    margin-bottom: 15px;
                }
        
                .detail span {
                    font-weight: bold;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h1>New Order Created</h1>
                <div class="order-details">
                    <div class="detail">
                        <span>Order ID:</span> ${orderId}
                    </div>
                    <div class="detail">
                        <span>Customer Name:</span> ${customerName}
                    </div>
                    <div class="detail">
                        <span>Customer Email:</span> ${customerEmail}
                    </div>
                    <div class="detail">
                        <span>Order Total:</span> $${orderTotal}
                    </div>
                    <div class="detail">
                        <span>Order Status:</span> ${orderStatus}
                    </div>
                    <div class="detail">
                        <span>Payment Method:</span> ${paymentMethod}
                    </div>

                    <h4>Line Items</h4>
                    ${line_items()}
                </div>
            </div>
        </body>
        
        </html>
    `
    return template
}

module.exports = {
    newOrderEmail
}
