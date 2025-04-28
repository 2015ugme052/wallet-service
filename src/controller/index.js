const { createWalletInDB, addTransactionsInDB, getBalanceFromWallet, updateWalletBalance, getAllTransactions, getWalletDetails } = require("../services/dbUtils")
module.exports = {
    createWallet: async (req, res) =>{
        try {
            const data = await createWalletInDB({body: req.body})
            res.status(201).send(req.body)
        } catch (err){
            console.log("Err creating wallet", err)
            res.status(err?.statusCode || 500).send(err)
        }
    },

    addTransactions: async (req, res) => {
        try {
            const data = await addTransactionsInDB({body: req.body})
            const wallet = await getBalanceFromWallet({walletId: req?.body?.walletId})
            const balance = req?.body?.type?.toLowerCase() === "credit"? wallet.balance + req?.body?.amount : wallet.balance - req?.body?.amount
            await updateWalletBalance({balance, walletId: req?.body?.walletId})
            res.status(200).send("Transaction added successfully")
        } catch (err){
            console.log("Err creating wallet", err)
            res.status(err?.statusCode || 500).send(err)
        } 
    },

    getAllTransactionfromWallet: async (req, res)=> {
        try {
            const data = await getAllTransactions({walletId: req.params.walletId})
            res.status(200).send(data?.Items)
        } catch (err){
            console.log("Err creating wallet", err)
            res.status(err?.statusCode || 500).send(err)
        }
    },

    getWalletDetails: async (req, res)=> {
        try {
            const data = await getWalletDetails({walletId: req.params.walletId})
            res.status(200).send(data)
        } catch (err){
            console.log("Err creating wallet", err)
            res.status(err?.statusCode || 500).send(err)
        }
    }
}