import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";

interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
}

interface CreateTokenPayload {
    id: string;
    email: string;
    name?: string;
}

interface AuthenticateUserPayload {
    email: string;
    password: string;
}

class UserService {

    private static async encryptPassword(password: string) {
        // Hash password
        const saltRounds = 12;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword;
    }

    public static async createUser(payload: CreateUserPayload) {
        const { name, email, password } = payload;

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

            // Encrypt password
            const encryptedPassword = await this.encryptPassword(password);

            // Create user
            const user = await UserModel.create({
                name,
                email,
                password: encryptedPassword
            });

            const token = this.createToken({ id: (user._id as mongoose.Types.ObjectId).toString(), email: user.email, name: user.name });

            return {
                success: true,
                message: "User registered successfully",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            };
        } catch (error) {
            console.log("Error creating user:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error registering user",
                token: null,
                user: null
            };
        }
    }

    public static async authenticateUser(payload: AuthenticateUserPayload) {
        const { email, password } = payload;

        try {
            // Find user by email
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
            const isValidPassword = await this.checkPassword(password, user.password);
            if (!isValidPassword) {
                return {
                    success: false,
                    message: "Invalid email or password",
                    token: null,
                    user: null
                };
            }
            // Generate JWT token
            const token = this.createToken({
                id: (user._id as mongoose.Types.ObjectId).toString(),
                email: user.email,
                name: user.name
            });
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
        } catch (error) {
            console.log("Error authenticating user:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Error logging in",
                token: null,
                user: null
            };
        }
    }

    public static async getUserById(id: string) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.log("Error fetching user:", error);
            throw error;
        }
    }

    private static createToken(payload: CreateTokenPayload) {
        // Generate JWT token
        const token = jwt.sign(
            { id: payload.id, email: payload.email, name: payload.name },
            process.env.JWT_SECRET || "",
            { expiresIn: process.env.JWT_EXPIRATION } as SignOptions
        );
        return token;
    }

    private static async checkPassword(password: string, encryptedPassword: string) {
        // Check password
        return await bcrypt.compare(password, encryptedPassword);
    }
}

export default UserService;