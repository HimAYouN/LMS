import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.route.js";
import roleRequestRouter from "./routes/roleRequest.routes.js";
import mentorRouter from "./routes/mentor.route.js";
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit : '16kb'}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/role-requests", roleRequestRouter);
app.use("/api/v1/mentor", mentorRouter);






export {app}
