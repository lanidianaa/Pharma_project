const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const {
  userRouter,
  productRouter,
  categoryRouter,
  cartRouter,
  adminRouter,
  transactionRouter,
  customProductRouter,
  historyRouter,
} = require("./router");

app.use(cors());
app.use(bearerToken());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  return res.status(200).send("Commerce API");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/carts", cartRouter);
app.use("/admin", adminRouter);
app.use("/transaction", transactionRouter);
app.use("/custom-product", customProductRouter);
app.use("/history", historyRouter);

app.listen(PORT, () => console.log(`SERVER LISTENING AT PORT ${PORT}`));
