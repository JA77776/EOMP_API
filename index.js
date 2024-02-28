
import { userRouter, express } from './controller/UserController.js'
import { productRouter } from './controller/ProductsController.js'
import cookieParser  from 'cookie-parser' 
import { errorHandling } from './middleware/ErrorHandeling.js'
import  path  from 'path'
import cors from 'cors'
import { config } from 'dotenv'
config()
// import { config } from 'dotenv-safe'
// config()
import rateLimit from 'express-rate-limit';
import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
});

// app.use(limiter);

// app.use((req, res, next) => {
//     res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     res.setHeader('X-Frame-Options', 'DENY');
//     res.setHeader('X-XSS-Protection', '1; mode=block');
//     next();
// });


const app = express()
const port = +process.env.PORT || 4000 
//middleware
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Request-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Expose-Headers", "Authorization")
    next()
})
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true,
    }),
    cookieParser(),
    cors({
        origin: 'https://your-trusted-frontend-domain.com',
        credentials: true,
    })
)



process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    // Perform cleanup tasks and close database connections
    process.exit(0);
});


app.get('^/$|/lifechoices', (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, './static/CSS/styling.css'))
})
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use(errorHandling)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
; 