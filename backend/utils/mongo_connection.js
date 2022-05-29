const mongoose = require('mongoose');

module.exports = async () => {
  try{
    await mongoose.connect(`${process.env.MONGO_URL}`,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongodb Connected");
  } catch(err){
    console.log(err.message);
    process.exit(1);
  }
}