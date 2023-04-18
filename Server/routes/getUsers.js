import express from 'express'
import Upload from '../dbSchemas/upload.js'

const router = express.Router();

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .populate('ListOfFollowers')
      .populate('ListOfFollowing')
      .populate('ListOfReactions')
      .populate('ListOfUploads')
      .exec((err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(user);
        }
      });
});

export {router as getUsers};