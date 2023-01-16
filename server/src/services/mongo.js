const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:8BjHLVFcpxwbzDfF@nasacluster.yto0bbx.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.set("strictQuery", false);

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  mongoConnect,
};
