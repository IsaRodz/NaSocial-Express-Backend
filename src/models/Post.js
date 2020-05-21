const { Schema, model } = require("mongoose");

const postsSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: String,
        likes: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postsSchema);
