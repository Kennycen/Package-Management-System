import express from 'express';
import { getPackages, addPackage, updatePackageStatus, getPackagesByStatus } from '../controllers/packageController.js';
import { authenticateUser } from '../middleware/auth.js';

const packageRouter = express.Router();
packageRouter.use(authenticateUser);

packageRouter.get('/all', getPackages);
packageRouter.get('/status/:status', getPackagesByStatus);
packageRouter.post('/add', addPackage);
packageRouter.put('/status/:packageId', updatePackageStatus);

export default packageRouter;
