const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(
  "sk_test_51O4hY9SAFIUZ4HpWObRqBcH8pMoyVPbcCLpOzNuMKw5Rw4Yv4GZqh8ylqqHrUEkKWPheK1UK04B7A4I3uL6kGorK00soCEj7xH"
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const uri = `mongodb+srv://akshatgtc:Akshat123@cluster0.2zu3863.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("database").collection("posts"); // this collection is for team-ekt
    const userCollection = client.db("database").collection("users"); // this collection is for team-srv
    console.log("connected to db");

    // get
    app.get("/user", async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });
    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });
    app.get("/post", async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    });
    app.get("/userPost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    // post
    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.post("/create-checkout-session-silver", async (req, res) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Silver Plan",
                },
                unit_amount: 10000,
              },
              quantity: 1,
            },
          ],
          success_url: "http://localhost:3000/",
          cancel_url: "http://localhost:3000/failure",
        });
        res.json({ url: session.url });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
    app.post("/create-checkout-session-gold", async (req, res) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Gold Plan",
                },
                unit_amount: 100000,
              },
              quantity: 1,
            },
          ],
          success_url: "http://localhost:3000/",
          cancel_url: "http://localhost:3000/failure",
        });
        res.json({ url: session.url });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // patch
    app.patch("/userUpdates/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);

      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Twitter Clone!");
});

app.listen(port, () => {
  console.log(`Twitter clone is listening on port ${port}`);
});
