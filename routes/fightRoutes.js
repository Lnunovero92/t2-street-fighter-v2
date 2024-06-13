import { Router } from "express";
import { fightService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get('/', async (req, res, next) => {
  try {
    const fights = await fightService.getAllFights();
    res.data = fights;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
  try {
    const fight = await fightService.getFightById(req.params.id);
    if (!fight) {
      throw new Error('Fight not found');
    }
    res.data = fight;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', async (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;
    const fight = await fightService.createFight({ fighter1, fighter2 });
    res.data = fight;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch('/:id', async (req, res, next) => {
  try {
    const fight = await fightService.updateFight(req.params.id, req.body);
    if (!fight) {
      throw new Error('Fight not found');
    }
    res.data = fight;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
  try {
    const fight = await fightService.deleteFight(req.params.id);
    if (!fight) {
      throw new Error('Fight not found');
    }
    res.data = fight;
  } catch (error) {
    res.error = error;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
