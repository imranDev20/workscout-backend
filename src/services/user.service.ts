import { User } from "../models/user.model.js";
import { CreateUserDto, UpdateUserDto, UserDto } from "../types/user.types.js";

export class UserService {
  // This would typically interact with a database model
  // For now, we'll use an in-memory store
  private users: User[] = [];

  getAllUsers = async (): Promise<UserDto[]> => {
    // In a real app, you would fetch from database
    // Example: return await UserModel.find();
    return this.users.map((user) => this.mapToDto(user));
  };

  getUserById = async (id: string): Promise<UserDto | null> => {
    const user = this.users.find((user) => user.id === id);
    return user ? this.mapToDto(user) : null;
  };

  createUser = async (userData: CreateUserDto): Promise<UserDto> => {
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation (use UUID in production)
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return this.mapToDto(newUser);
  };

  updateUser = async (
    id: string,
    userData: UpdateUserDto
  ): Promise<UserDto | null> => {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    // Update user data
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };

    return this.mapToDto(this.users[userIndex]);
  };

  deleteUser = async (id: string): Promise<boolean> => {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);

    return initialLength !== this.users.length;
  };

  // Helper method to map User to UserDto
  private mapToDto(user: User): UserDto {
    const { id, name, email, createdAt, updatedAt } = user;
    return { id, name, email, createdAt, updatedAt };
  }
}
