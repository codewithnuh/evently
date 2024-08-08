import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// A global cache to store the MongoDB connection and promise.
let cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Connects to the MongoDB database using Mongoose.
 * This function implements connection caching to avoid creating multiple connections.
 *
 * @returns {Promise<mongoose.Connection>} The Mongoose connection object.
 * @throws Will throw an error if the MONGODB_URI is not set.
 */
export const connectToDatabase = async (): Promise<mongoose.Connection> => {
  // If a cached connection exists, return it to avoid reconnecting.
  if (cached.conn) return cached.conn;
  console.log("connected");
  // Throw an error if the MONGODB_URI environment variable is not found.
  if (!MONGODB_URI) throw new Error("MONGODB_URI NOT FOUND");
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  // If no promise exists, create a new connection promise.
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently", // The name of the database to connect to.
      bufferCommands: false, // Disables buffering of commands until the connection is established.
    });

  // Cache the connection once the promise resolves.
  cached.conn = await cached.promise;

  return cached.conn;
};
