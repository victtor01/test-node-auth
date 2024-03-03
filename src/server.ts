import { app } from "./app";

// port config
const port: string | number = process.env.PORT || 8000;

app.listen(port);
