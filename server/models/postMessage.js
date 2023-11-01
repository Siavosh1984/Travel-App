

/* mongoose.Schema is the format of information we interact with database.
 "[String]" means an array of Strings. "selectedFile: String" means images 
 will convert to String uning "Base64". likeCount is not just "Number", but an object
 with default 0 */



// we turn schema into a model "PostMessage" inside model could have any other name
// https://r.search.yahoo.com/_ylt=AwrE_nyTUytlv5INM_ZXNyoA;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1698547859/RO=10/RU=https%3a%2f%2fmongoosejs.com%2fdocs%2fmodels.html/RK=2/RS=L8bi8oBntd4NNDygzz8baWXpbJk-
// models : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;