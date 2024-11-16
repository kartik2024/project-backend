const mongoose = require('mongoose');

const run = async () => {
    await mongoose.connect('mongodb+srv://kartikkartiksharmasharma12:Kartik01082006@cluster0.aabw3.mongodb.net/FeeProject')
}

module.exports = run;