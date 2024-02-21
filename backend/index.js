const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const createRouter = require('./routes/create');
const useRouter = require('./routes/use');
const aiRouter = require('./routes/custom');
const cors = require('cors');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        'error' : err
    });
});

app.use('/auth',authRouter);
app.use('/create',createRouter);
app.use('/aicustomiser',aiRouter);
app.use('/',useRouter);

app.get('/',(req,res)=>{
    res.send("welcome to biryani bytes");
})


  
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server is listening on port ${port}`);
})