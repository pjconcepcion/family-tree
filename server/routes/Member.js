const router = require('express').Router();
let Family = require('../models/family.model');
let Member = require('../models/member.model');

/**
 * Index
 */
 router.route('/').get((req, res) => {
    const fatherId = req.body.fatherId;
    const motherId = req.body.motherId;

    Family.find({fatherId,motherId})
        .then(family => {
            const familyid = family[0]._id;
            Member.find({familyid})
                .then(member => res.json(member))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: Family not found.`));
});

/**
 * Add new family member
 */
 router.route('/add').post((req,res) => {
    const fatherId = req.body.fatherId;
    const motherId = req.body.motherId;
    const childId = req.body.childId;

    Family.find({fatherId,motherId})
        .then(family => {
            const familyId = family[0]._id;
            const newMember = new Member({familyId, childId});
            newMember.save()
                .then(member => res.json("Added member"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: Family not found.`));
});

module.exports = router;