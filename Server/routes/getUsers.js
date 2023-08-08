import express from 'express'
import User from '../dbSchemas/user.js';
import {auth} from '../firebaseUtils.js'

const router = express.Router();

router.get('/profileuser', async (req, res) => {
    try {
      const currentUser = auth.currentUser.email;
      const user = await User.findOne({ Email : currentUser});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
});

export {router as getUsers};
