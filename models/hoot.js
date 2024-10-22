const mongoose = require('mongoose');

const hootSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['News', 'Sports', 'Games', 'Movies', 'Music', 'Television']
        
        }

})