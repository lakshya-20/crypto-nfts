const mongoose = require('mongoose');

module.exports = async () => {
  try{
    await mongoose.connect(`mongodb://admin:password@localhost:27017/cryptonfts?authSource=admin`,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongodb Connected");
  } catch(err){
    console.log(err.message);
    process.exit(1);
  }
}