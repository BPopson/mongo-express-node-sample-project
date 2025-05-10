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

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await db.collection(collectionName).findOne({ _id: new ObjectId(userId) });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
});

async function startServer() {
    await connectToDB();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer();

