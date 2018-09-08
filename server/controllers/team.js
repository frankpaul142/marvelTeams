const express = require('express');
const teamModel = require('../models/team');
const api = express.Router();

api.route('/')
    .get(function (req, res) {
        teamModel.find()
        .then(elementsStored => {
            res.status(200).send({
                response: elementsStored,
                errors: []
            });
        }).catch(err => {
            res.status(500).send({
                response: [],
                errors: err
            });
        });
    })
    .post(function (req, res) {
        const params = req.body;

        teamModel.create(params)
            .then(elementStored => {
                res.status(200).send({
                    response: elementStored,
                    errors: []
                });
            }).catch(err => {
                res.status(500).send({
                    response: [],
                    errors: err
                });
            });
    })

module.exports = api;
