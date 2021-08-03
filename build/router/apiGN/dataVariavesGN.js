"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataVari = void 0;
var Fs = __importStar(require("fs"));
var Path = __importStar(require("path"));
var https = __importStar(require("https"));
var dotenv = __importStar(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
var dataCred = process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID;
exports.dataVari = {
    cert: Fs.readFileSync(Path.resolve(__dirname, "../../../certs/" + process.env.GN_CERT)),
    agent: new https.Agent({ pfx: Fs.readFileSync(Path.resolve(__dirname, "../../../certs/" + process.env.GN_CERT)), passphrase: '' }),
    dataCred: process.env.GN_CLIENT_ID + ':' + process.env.GN_SECRET_ID,
    credentials: Buffer.from(dataCred).toString('base64'),
    urlToken: process.env.GN_ENDPOINT + "/oauth/token",
    endPoint: process.env.GN_ENDPOINT,
    keyPixReceb: '0e77310e-4c62-4ad3-9bd7-3c9c72344c93'
};
