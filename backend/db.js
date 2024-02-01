const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://abhidash80:ERUyLZFiEC2t3fEz@cluster0.ke3qpfs.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) {
        console.log("Cannot connect to Database", err);
      } else {
        console.log("Connected to database successfully");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection("foodCategory");
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log("error.....", err);
            else {
            //   console.log(global.food_items);
              global.food_items = data;
              global.foodCategory = catData;
            }
          });
          // if(err) console.log('error.....', err)
          // else {
          // console.log(global.food_items)
          // global.food_items = data;
        });
      }
    }
  );
};

module.exports = mongoDB;
