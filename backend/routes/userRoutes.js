import express from "express";
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controllers/userController.js";
import { authenticate, authorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(createUser)
    .get(authenticate, authorized, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);

router.route('/:id')
    .delete(authenticate, authorized, deleteUserById)
    .get(authenticate, authorized, getUserById)
    .put(authenticate, authorized, updateUserById);

export default router;