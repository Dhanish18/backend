const express = require("express");
const app = express();
const Product = require("./productModel");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.get("/getData", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/createData", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/updateData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res
        .status(404)
        .json({ message: `cannot find any product with id ${id}` });
    }
    const updatedData = await Product.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://dhanish:dhanish123@react.l1kedqf.mongodb.net/React-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(3001, () => {
      console.log("port is running on 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });
