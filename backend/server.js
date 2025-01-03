const express = require('express');
const connectDB = require('./config/dbConn');
const foodRoute = require('./routes/foodRoute')
const corsOptions = require('./config/corsOption')
const cors = require('cors')
//app configuration
const app = express()
require('dotenv').config();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000
//middleware
app.use(express.json())
//connect to database
connectDB()
//routes
app.use('/api/food',foodRoute)
app.use('/images',express.static('uploads'))
app.use('/api/user',require('./routes/userRoute'))
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))

app.get('/',(req,res)=>{
    res.send('Server is running Successfully')
})
app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`)})