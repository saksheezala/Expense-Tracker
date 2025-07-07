import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from"./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() =>{
    app.on("error", (err) => {
        console.error("Server error:", err);
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((error) =>{
    console.error("MONGO db connection failed !!!" , error);
})
