import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import connectDB from './lib/dbConnect.js';
import { getContext } from './utils/auth.js';
import { server } from './graphql/index.js';

dotenv.config();

// Connect to database first, then start the server
connectDB().then(async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
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