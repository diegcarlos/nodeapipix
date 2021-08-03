"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tokenGN_1 = __importDefault(require("./router/apiGN/tokenGN"));
var cobGnPix_1 = __importDefault(require("./router/apiGN/cobGnPix"));
var cobGeQrPix_1 = __importDefault(require("./router/apiGN/cobGeQrPix"));
var conCobGn_1 = __importDefault(require("./router/apiGN/conCobGn"));
var app = express_1.default();
app.use(express_1.default.json());
/** Api Gerencia Net */
app.use(tokenGN_1.default);
app.use(cobGnPix_1.default);
app.use(cobGeQrPix_1.default);
app.use(conCobGn_1.default);
/**  */
app.listen(3333, function () {
    console.log('running');
});
