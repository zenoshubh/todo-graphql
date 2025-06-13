import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

// Helper function to verify JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as any;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Context function to get user from request
export const getContext = async ({ req }: { req: any }) => {
  // Get token from Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = verifyToken(token);
      const user = await UserModel.findById(decoded.id);
      
      if (user) {
        return {
          user: {
            id: user?._id?.toString(),
            email: user?.email,
            name: user?.name
          }
        };
      }
    } catch (error) {
      // Invalid token, continue without user context
    }
  }
  
  return {};
};