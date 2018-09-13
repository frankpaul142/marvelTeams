const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    team: { type: String },
    id: { type: String },
    name: { type: String },
    description: { type: String },
    image: { type: String },
});

const team = mongoose.model('Team', teamSchema);

module.exports = team;
