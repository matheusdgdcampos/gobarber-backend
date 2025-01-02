import { AvatarColumn } from '../entities/user.entity';

export class UpdateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: AvatarColumn;
  createdAt: Date;
  updatedAt: Date;
}
