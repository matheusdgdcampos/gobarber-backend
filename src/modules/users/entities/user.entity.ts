import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

export class AvatarColumn {
  @Column()
  filename: string;

  @Column()
  url: string;
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Type()
  @Column({
    type: 'json',
    default: null,
  })
  avatar?: AvatarColumn | null;

  @OneToMany(() => Appointment, (appointment) => appointment.providerId)
  appointment: Appointment[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
