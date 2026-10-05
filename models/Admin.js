const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', "staff"],
        default: 'staff'
    },
    permissions: {
        type: [String],
        default: []
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);