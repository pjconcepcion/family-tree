const router = require('express').Router();
let Family = require('../models/family.model');
let Member = require('../models/member.model');

/**
 * Index
 */
router.route('/').get((req, res) => {
    Family.find()
        .then(family => res.json(family))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * Create new family
 */
router.route('/create').post((req,res) => {
    const fatherId = req.body.fatherId;
    const motherId = req.body.motherId;
    
    const newFamily = new Family({fatherId, motherId});

    newFamily.save()
        .then(family => res.json("Family created"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * Delete family by id
 */
router.route('/delete').put((req,res) => {    
    Family.findByIdAndDelete(req.body.familyId, {new: true})
        .then(result => res.json('Family deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;