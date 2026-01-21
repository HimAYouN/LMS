import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.route.js";
import roleRequestRouter from "./routes/roleRequest.routes.js";
import mentorRouter from "./routes/mentor.route.js";
import dotenv from "dotenv";
import mentorCourseRouter from "./routes/mentor.course.route.js";
import mentorProfileRouter from "./routes/mentor.profile.route.js";
import enrollmentRouter from "./routes/enrollment.route.js";
import courseRouter from "./routes/course.route.js";
import mentorContentRouter from "./routes/mentor.content.route.js";




const app = express();
dotenv.config()
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
app.use("/api/v1/mentor", mentorCourseRouter);
app.use("/api/v1/mentor", mentorProfileRouter);
app.use("/api/v1", enrollmentRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1/mentor", mentorContentRouter);











export {app}
