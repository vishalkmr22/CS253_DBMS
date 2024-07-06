import mongoose from 'mongoose';

const authCodeSchema = new mongoose.Schema({
    roll: { type: Number, required: true, unique: true },
    authCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 } // Expires after 5 minutes
});

const AuthCode = new mongoose.model('AuthCode', authCodeSchema);
export default AuthCode;