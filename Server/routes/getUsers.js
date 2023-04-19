import express from 'express'
import User from '../dbSchemas/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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