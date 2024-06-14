const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/onlineLearning', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,  // Set useCreateIndex directly in the options
      useFindAndModify: false,  // Set useFindAndModify directly in the options
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
