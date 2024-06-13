import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  createUser(data) {
    // Validaciones adicionales
    if (!data.email.endsWith('@gmail.com')) {
      throw new Error('Invalid email domain');
    }
    if (!/^\+380\d{9}$/.test(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }
    if (data.password.length < 3) {
      throw new Error('Password is too short');
    }

    // Verificar si el email o el teléfono ya existen
    const existingUser = userRepository.getOne({ email: data.email }) || userRepository.getOne({ phoneNumber: data.phoneNumber });
    if (existingUser) {
      throw new Error('User with this email or phone number already exists');
    }

    return userRepository.create(data);
  }

  updateUser(id, data) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Validaciones adicionales
    if (data.email && !data.email.endsWith('@gmail.com')) {
      throw new Error('Invalid email domain');
    }
    if (data.phoneNumber && !/^\+380\d{9}$/.test(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }
    if (data.password && data.password.length < 3) {
      throw new Error('Password is too short');
    }

    return userRepository.update(id, data);
  }

  deleteUser(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
