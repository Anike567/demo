import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User, UserDocument } from 'src/model/user.shema';

@Injectable()
export class DeleteService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async delete(username: string) {
    return await this.userModel.deleteOne({ username });
  }
}
