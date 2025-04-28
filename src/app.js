const express = require('express');
const app = express();
app.use(express.json());
const controller = require('./controller/index');

app.use("/health", (req, res) => {
    return res.status(200).send("Ok");
});

app.get("/test", (req,res)=> {
    res.status(200).send("done")
})

app.post("/wallet", async (req, res) => {
    await controller.createWallet(req, res)
})

app.post("/transactions", async (req,res)=> {
    await controller.addTransactions(req, res)
})

app.get("/transactions/:walletId", async (req,res)=> {
    await controller.getAllTransactionfromWallet(req, res)
})

app.get("/wallet/:walletId", async (req,res)=> {
    await controller.getWalletDetails(req, res)
})

process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received, closing Deel server.");

    server.close(() => {
        logger.info("Deel server is closed.");

        process.exit(0);
    });
});

process.on("uncaughtException", (error) => {
    logger.error("An uncaught exception detected in Deel.", error);
  
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    logger.error("Unhandled rejection detected in Deel.", error);

    process.exit(1);
});

module.exports = app;