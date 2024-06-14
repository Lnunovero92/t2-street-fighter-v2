import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.data = user;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.data = users;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createUserValid, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.data = user;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch('/:id', updateUserValid, async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new Error('User not found');
    }
    res.data = user;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.data = user;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };