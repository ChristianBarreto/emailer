/* eslint-disable */
// const {logger} = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
// import { getAnalytics } from "firebase/analytics";
// const { getFirestore } = require("firebase-admin/firestore");
const express = require("express");
const dayjs = require('dayjs');
// const qs = require('qs');
var utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
import { Request, Response } from "express";
import 'dotenv/config';

var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

dayjs.extend(utc);
dayjs.extend(timezone);

export const app = express();

const envProduction = process.env.FUNCTIONS_EMULATOR !== 'true'

export const mpApiKey = envProduction
  ? process.env.MPKEYONLINE_PROD // !!! NEVER CHANGE IT !!!
  : process.env.MPKEYONLINE_PROD // change to test/prod to test in development environment

console.log("PRODUCTION", envProduction);

app.use(function(request: Request, response: Response, next: any) {
  response.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

initializeApp(firebaseConfig);
// const db = getFirestore();

app.get("/", async (req: Request, res: Response) => {
  res.json({res: "Hello world!"});

});



exports.emailer = onRequest(app);
