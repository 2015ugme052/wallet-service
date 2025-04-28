# Wallet System Backend Service

This project is a backend service implementation for a Wallet System. It provides APIs to manage wallets, perform transactions, and retrieve wallet details.

## Features

1. **Setup Wallet**  
    - Create a new wallet for a user with an initial balance.

2. **Credit/Debit Transactions**  
    - Perform credit or debit operations on a wallet.  
    - Ensure sufficient balance for debit transactions.

3. **Fetch Transactions**  
    - Retrieve the transaction history for a specific wallet.

4. **Get Wallet Details**  
    - Fetch wallet details, including the current balance and metadata.

## API Endpoints

### 1. Setup Wallet
- **Endpoint**: `POST /api/wallets`  
- **Description**: Creates a new wallet.  
- **Request Body**:  
  ```json
  {
     "userId": "string",
     "initialBalance": "number"
  }
  ```
- **Response**:  
  ```json
  {
     "walletId": "string",
     "userId": "string",
     "balance": "number"
  }
  ```

### 2. Credit/Debit Transactions
- **Endpoint**: `POST /api/wallets/{walletId}/transactions`  
- **Description**: Adds a credit or debit transaction to the wallet.  
- **Request Body**:  
  ```json
  {
     "type": "credit | debit",
     "amount": "number"
  }
  ```
- **Response**:  
  ```json
  {
     "transactionId": "string",
     "walletId": "string",
     "type": "credit | debit",
     "amount": "number",
     "balance": "number"
  }
  ```

### 3. Fetch Transactions
- **Endpoint**: `GET /api/wallets/{walletId}/transactions`  
- **Description**: Retrieves the transaction history for a wallet.  
- **Response**:  
  ```json
  [
     {
        "transactionId": "string",
        "type": "credit | debit",
        "amount": "number",
        "timestamp": "string"
     }
  ]
  ```

### 4. Get Wallet Details
- **Endpoint**: `GET /api/wallets/{walletId}`  
- **Description**: Fetches wallet details, including the current balance.  
- **Response**:  
  ```json
  {
     "walletId": "string",
     "userId": "string",
     "balance": "number"
  }
  ```

## Technologies Used
- **Backend**: Node.js, Express.js  
- **Database**: Dynamodb (or any preferred database)  
- **Authentication**: JWT (if required)

## Setup Instructions
1. Clone the repository.  
2. Install dependencies: `npm install`.  
3. Configure environment variables in `.env`.  
4. Start the server: `npm start`.  

## License
This project is licensed under the MIT License.  