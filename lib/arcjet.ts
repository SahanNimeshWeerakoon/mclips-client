import arcjet, { fixedWindow } from "@arcjet/next";

export default arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    fixedWindow({
      max: 10, 
      window: "1d",
      characteristic: ["userId", "ip"],
    }),
  ],
});
