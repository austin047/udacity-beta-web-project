import express from "express";
import userRouter from "./users";
// import categoryRouter from "./categories";
import websiteRouter from "./website";
import searchRoute from './search';
import authRouter from "./auth";
import reviewRouter from "./reviews";

const apiRouter = express.Router();


apiRouter.use("/auth", authRouter)

apiRouter.use("/users", userRouter);
// apiRouter.use("/categories", categoryRouter);
apiRouter.use("/websites", websiteRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use('/search', searchRoute)

export default apiRouter;
