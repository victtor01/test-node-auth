"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const router_1 = require("./router");
// port config
const port = process.env.PORT || 8000;
app_1.app.use(router_1.router);
app_1.app.listen(port);
