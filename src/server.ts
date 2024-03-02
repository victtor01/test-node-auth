import { app } from "./app";
import { userRouter } from "./routers/userRouter";

// port config
const port = process.env.PORT || 8000;

app.use(userRouter);

app.listen(port);
