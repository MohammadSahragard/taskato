// public
import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    const uri: any = process.env.MONGODB_URI;
    await mongoose
        .connect(uri)
        .then(() => {
            console.log('connected to MongoDb');
        })
        .catch((error: any) => {
            console.log('connection failed: ', error.message);
        });
};

export default connectDB;
