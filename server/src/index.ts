import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './lib/dbConnect.js';
import UserModel from './models/user.model.js';
import { server } from './graphql/index.js';

dotenv.config();

// Helper function to verify JWT token
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as any;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Context function to get user from request
const getContext = async ({ req }: { req: any }) => {
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

// Connect to database first, then start the server
connectDB().then(async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: getContext
    });
    
    console.log(`🚀 Server ready at: ${url}`);
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
    process.exit(1);
  }
}).catch((error) => {
  console.error('❌ Database connection failed, server not started:', error);
  process.exit(1);
});