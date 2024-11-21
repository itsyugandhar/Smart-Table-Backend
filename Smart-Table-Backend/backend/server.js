const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const dbUrl = 'mongodb+srv://iamthulasinath:XNVMxw1qdgCAj3g7@cluster0.abpfq.mongodb.net/itemsArray?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Mongo DB connected to itemsArray"))
.catch((err) => console.log("Mango DB error", err) )


const orderSchema = new mongoose.Schema({
  customerDetails: {
    name: String,
    phone: String,
    msg: String,
  },
  cartItems: [
    {
      _id: String,
      name: String,
      price: Number,
      category: String,
      image: String,
      isAvailable: Boolean,
      quantity: Number,
    },
  ],
}, { collection: 'orders' });  

const Order = mongoose.model('Order', orderSchema);

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();  // Retrieve all orders from the 'orders' collection
    res.status(200).json(orders);  // Send the orders data to the frontend
  } catch (error) {
    console.error('Error fetching orders:', error);  // Log any errors
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
