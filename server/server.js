import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import wishItem from "./schema.js";
//test
dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB, {})
  .then(() => console.log("Ansluten till mongoDB"))
  .catch((err) => console.log("Fel vid anslutning", err));

//Sends wishes to server
app.post("/wishes", async (req, res) => {
  const wishItemData = req.body;

  try {
    const newWishItem = new wishItem(wishItemData);

    await newWishItem.save();
    res.status(201).json(newWishItem);
  } catch (error) {
    res.status(400).json({ error: "Kunde inte skapa önskeobjekt" });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {});

//Gets wishes from server
app.get("/wishItem/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    const wishItems = await wishItem.find({ userName });
    res.status(200).json(wishItems);
  } catch (error) {
    res.status(400).json({ error: "Kunde inte hämta önskeobjekten" });
  }
});

//Updates edited wishes
app.put("/wishItem/:id", async (req, res) => {
  const { id } = req.params;
  const updatedWish = req.body;

  try {
    const updatedWishItem = await wishItem.findByIdAndUpdate(id, updatedWish, {
      new: true,
    });

    if (!updatedWishItem) {
      return res.status(404).send("Önskingen hittades inte");
    }

    res.json(updatedWishItem);
  } catch (err) {
    res
      .status(500)
      .send("Fel uppstod vid redigering av önskningen: " + err.message);
  }
});

//Deletes wishes
app.delete("/wishItem/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await wishItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).send("Önskan finns inte");
    }
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).send("Fel vid borttagning av önskan: " + error);
  }
});
