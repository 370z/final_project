const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    // .then((con) => {
    //   console.log(
    //     `MongoDB Database connected with HOST: ${con.connection.host}`
    //   );
    // });
const db = mongoose.connection;
db.once("open", function () {
  console.log(`MongoDB Database connected with HOST: ${db.host}`);
});
}

module.exports = connectDatabase;
