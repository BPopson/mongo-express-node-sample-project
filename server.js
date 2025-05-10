import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const mongoURI = "mongodb://localhost:27017";

const dbName = "usersDB";
const collectionName = "users";

let db;

const client = new MongoClient(mongoURI);

async function connectToDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.use(express.json());

async function startServer() {
    await connectToDB();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer();

