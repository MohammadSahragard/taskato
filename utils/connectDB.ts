// public
import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(String(process.env.MONGODB_URI));
    console.log('connected to MongoDb');
};

export default connectDB;
