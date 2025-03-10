// This would typically be a database model (Mongoose, TypeORM, Sequelize, etc.)
// For now, it's just an interface representing our user entity

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// When implementing a database, you would add the schema/model here
// Example with Mongoose:
/*
  import mongoose from 'mongoose';
  
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { timestamps: true });
  
  export const UserModel = mongoose.model('User', userSchema);
  */
