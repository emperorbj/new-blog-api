const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const cors = require('cors')
const port = 3000

const router = require('./routes/user.route')


// middlewares
app.use(cors());
app.use(express.json());


app.use('/api/users',router)

// CONNECTION WITH MONGODB
mongoose.connect("mongodb+srv://cwaku96:zCD5q6k4V3rwOo5t@socialapi.eimsp.mongodb.net/Social-API?retryWrites=true&w=majority&appName=socialAPI")
.then(() => {
    console.log('Connected!')
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
        
    })

})
.catch(() => console.log('connection failed')
)


app.get('/', (req,res) => {
    res.send('Hello World!')
})