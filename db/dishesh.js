const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const dishesh = db.get('dishesh');

function getAll() {
    return dishesh.find();
}

function addDish(dish){
    const result = schema.validate(dish);
    if (result.error == null) {
        return dishesh.insert(dish);
    } else {
        return Promise.reject(result.error);
    }
}

function deleteDish(id){
    dishesh.remove({"_id": id});
    return dishesh.find();
}

module.exports = {
    addDish,
    getAll,
    deleteDish
};