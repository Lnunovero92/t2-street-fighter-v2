import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', async (req, res, next) => {
  try {
    const fighters = await fighterService.getAllFighters();
    res.data = fighters;
    next();
  } catch (error) {
    res.error = error;
    next();
  }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
  try {
    const fighter = await fighterService.getFighterById(req.params.id);
    res.data = fighter;
    next();
  } catch (error) {
    res.error = error;
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.createFighter(req.body);
    res.data = fighter;
    next();
  } catch (error) {
    res.error = error;
    next();
  }
}, responseMiddleware);

router.patch('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.updateFighter(req.params.id, req.body);
    res.data = fighter;
    next();
  } catch (error) {
    res.error = error;
    next();
  }
}, responseMiddleware);

router.delete('/:id', async (req, res, next) => {
  try {
    const fighter = await fighterService.deleteFighter(req.params.id);
    res.data = fighter;
    next();
  } catch (error) {
    res.error = error;
    next();
  }
}, responseMiddleware);

export { router };