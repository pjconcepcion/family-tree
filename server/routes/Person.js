const router = require('express').Router();
let Person = require('../models/person.model');

/**
 * Index
 */
router.route('/').get((req, res) => {
    Person.find()
        .then(person => res.json(person))
        .catch(err => res.status(400).json(`Error: ${error}`));
});

/**
 * Get available person
 */
router.route('/available/:gender').get((req, res) => {
    Person.find({'gender': req.params.gender})
        .then(person => res.json(person))
        .catch(err => res.status(400).json(`Error: ${error}`));
});

/**
 * Add new person
 */
router.route('/add').post((req,res) => {
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const gender = req.body.gender;

    const newPerson = new Person({firstName, middleName, lastName, birthDate, gender});

    newPerson.save()
        .then(person => res.json(person))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * Get person by id
 * @param id _id of the person
 */
router.route('/:id').get((req,res) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * Delete person by id
 */
 router.route('/update').put((req,res) => {
    const update = {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        gender: req.body.gender
    }

    Person.findByIdAndUpdate({_id: req.body.personId}, update, {new: true})
        .then(person => res.json('Person deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * Delete person by id
 */
router.route('/delete').put((req,res) => {
    Person.findByIdAndDelete({_id: req.body.personId}, {new: true})
        .then(person => res.json('Person deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;