import mongoose from "mongoose";

const startServer = (url) => {
    mongoose.connect(url).then(() => {
        console.log('connected to db');
    }).catch(err => console.error(err));
};


export default startServer;