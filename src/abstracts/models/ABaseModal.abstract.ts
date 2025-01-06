import { IBaseModel } from 'src/interfaces/models';
import {
  VersionColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export abstract class ABaseModal implements IBaseModel {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
