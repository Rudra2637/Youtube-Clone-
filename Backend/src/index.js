import dotenv from 'dotenv'
import { app } from './app.js'

import connection from './db/db_connect.js'
// function connectDB(){}

dotenv.config({
    path:"./env"
})


connection()
.then(() => {
    app.on("error",(err) => {                     //Used for listening error events
        console.log(err)              
    })
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Port is running on http://localhost:${process.env.PORT}`)
    })
})
.catch((err) => console.log("Connectioon Db problem :",err))












// const app = express()


// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",() => {
//             console.log("error")
//         })
//         app.listen(process.env.PORT,() => {
//             console.log(`app is listening on http://localhost:${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })()
