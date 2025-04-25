import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser } from '../userController';
import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
vi.mock('bcrypt');
vi.mock('jsonwebtoken');

describe('User Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: vi.fn()
    };
    vi.clearAllMocks();
  });

  // Test registerUser
  describe('registerUser', () => {
    it('should return error if missing fields', async () => {
      await registerUser(req, res);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Missing Details'
      });
    });
  });

  // Test loginUser
  describe('loginUser', () => {
    it('should return error if user does not exist', async () => {
      req.body = {
        email: 'nonexistent@example.com',
        password: '123'
      };

      userModel.findOne = vi.fn().mockResolvedValue(null);

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User does not exist'
      });
    });

    it('should return token if credentials are valid', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      const user = {
        _id: 'userId123',
        name: 'Test User',
        password: 'hashedPassword'
      };

      userModel.findOne = vi.fn().mockResolvedValue(user);
      bcrypt.compare = vi.fn().mockResolvedValue(true);
      jwt.sign = vi.fn().mockReturnValue('valid-token');

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'valid-token',
        user: { name: 'Test User' }
      });
    });

    it('should return error on invalid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const user = {
        _id: 'userId123',
        name: 'Test User',
        password: 'hashedPassword'
      };

      userModel.findOne = vi.fn().mockResolvedValue(user);
      bcrypt.compare = vi.fn().mockResolvedValue(false);

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });
  });
});