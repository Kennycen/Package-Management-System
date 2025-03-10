import express from 'express';
import { getPackages, addPackage, updatePackageStatus, getPackagesByStatus } from '../controllers/packageController.js';
import jwt from 'jsonwebtoken';

const packageRouter = express.Router();

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.json({ success: false, message: 'Invalid token' });
  }
};

// Apply authentication middleware to all routes
packageRouter.use(authenticateUser);

// Routes
packageRouter.get('/all', getPackages);
packageRouter.get('/status/:status', getPackagesByStatus);
packageRouter.post('/add', addPackage);
packageRouter.put('/status/:packageId', updatePackageStatus);

export default packageRouter;
