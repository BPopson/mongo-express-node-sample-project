import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI);
const dbName = "usersDB";
const collectionName = "users";

let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const app = express();

app.use(express.json());

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const user = await db.collection(collectionName).findOne({ 
            _id: new ObjectId(userId),
            age: { $gt: 21 }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

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

