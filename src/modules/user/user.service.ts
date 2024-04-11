// Import the core libraries
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

// Import the custom files
import { User } from "@/modules/user/models/user.entity";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  // Create a user
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.insert(entity);
    return res && res.raw.affectedRows > 0;
  }

  // Delete a user
  async del(id: string): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    return res && res.affected > 0;
  }

  // Update a user by userId
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.update(id, entity);
    return res && res.affected > 0;
  }

  // Find a user by userId
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      }
    })
  }
}