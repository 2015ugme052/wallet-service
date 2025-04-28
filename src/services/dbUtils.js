const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
  
const docClient = new AWS.DynamoDB.DocumentClient();

async function createWalletInDB({body}){
    try{
        const params = {
            TableName: "Wallet",
            Item: body
        }
        return await docClient.put(params).promise()
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}

async function addTransactionsInDB({body}){
    try{
        const params = {
            TableName: "Transactions",
            Item: body
        }
        return await docClient.put(params).promise()
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}

async function getBalanceFromWallet({walletId}){
    try{
        const params = {
            TableName: "Wallet",
            KeyConditionExpression: "#id=:id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": walletId
            }
        }
        const data =  await docClient.query(params).promise()
        return data?.Items?.[0]
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}

async function updateWalletBalance({walletId, balance}){
    try{
        const params = {
            TableName: "Wallet",
            Key: {
                id: walletId
            },
            UpdateExpression: "set #balance = :balance",
            ExpressionAttributeNames: {
                "#balance": "balance",
            },
            ExpressionAttributeValues: {
                ":balance": balance,
            },

        }
        return await docClient.update(params).promise()
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}

async function getAllTransactions({walletId, balance}){
    try{
        const params = {
            TableName: "Transactions",
            IndexName: "walletId-timestamp-index",
            KeyConditionExpression: "#walletId = :walletId",
            ExpressionAttributeNames: {
                "#walletId": "walletId",
            },
            ExpressionAttributeValues: {
                ":walletId": walletId,
            }
        }
        return await docClient.query(params).promise()
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}

async function getWalletDetails({walletId}){
    try{
        const params = {
            TableName: "Wallet",
            KeyConditionExpression: "#id=:id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": walletId,
            }
        }
        const data =  await docClient.query(params).promise()
        return data.Items?.[0]
    } catch (err){
        console.log("ERR in fetching data", err)
        throw err
    }
}



module.exports = {
    createWalletInDB,
    addTransactionsInDB,
    getBalanceFromWallet,
    updateWalletBalance,
    getAllTransactions,
    getWalletDetails
}
