import mongoose from "mongoose";

// Store the connection state in a variable
let isConnected;

export const connectToDb = async () => {
  try {
    if (isConnected) return;

    const db = await mongoose.connect("mongodb+srv://kandekarshubham07:shubham@gcp.hcu41db.mongodb.net/");
    isConnected = db.connections[0].readyState;

    console.log("Connected to the DataBase");
  } catch (error) {
    console.log("Unable to connect to the DB", error.message);
  }
};

// Export the connection state for external use if needed
export const getDbConnectionState = () => isConnected;
