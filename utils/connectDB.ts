// public
import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    const uri: any = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('connected to MongoDb');
};

export default connectDB;
