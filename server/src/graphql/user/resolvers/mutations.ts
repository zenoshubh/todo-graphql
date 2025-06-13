import UserModel from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const mutations = {
    register: async (_: any, { input }: { input: { name: string; email: string; password: string } }) => {
      const { name, email, password } = input;

      try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "User with this email already exists",
            token: null,
            user: null
          };
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await UserModel.create({
          name,
          email,
          password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET  as string,
          { expiresIn: '7d' }
        );

        return {
          success: true,
          message: "User registered successfully",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          }
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message || "Error registering user",
          token: null,
          user: null
        };
      }
    },

     login: async (_: any, { input }: { input: { email: string; password: string } }) => {
      const { email, password } = input;

      try {
        // Find user
        const user = await UserModel.findOne({ email });
        if (!user) {
          return {
            success: false,
            message: "Invalid email or password",
            token: null,
            user: null
          };
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return {
            success: false,
            message: "Invalid email or password",
            token: null,
            user: null
          };
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET  as string,
          { expiresIn: '7d' }
        );

        return {
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          }
        };
      } catch (error: any) {
        return {
          success: false,
          message: "Error logging in",
          token: null,
          user: null
        };
      }
    },

    
}