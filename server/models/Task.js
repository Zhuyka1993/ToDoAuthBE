const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    task: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['active', 'archived', 'overdue'], 
        default: 'active' 
    }
});

module.exports = mongoose.model('Task', taskSchema);