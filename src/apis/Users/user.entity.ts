import { ABaseModal } from 'src/abstracts/models';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IUser } from 'src/interfaces/models';
import { UtilTransform } from 'src/utils/transforms.util';

@Entity('users')
export class UserEntity extends ABaseModal implements IUser {
  @Column({ length: 100, unique: true })
  user_email: string;

  @Column({ length: 50 })
  user_name: string;

  @Column({ length: 100, select: false })
  user_pass: string;

  @Column({ length: 11, unique: true })
  user_phone: string;

  @Column({ length: 10 })
  user_gender: string;

  @Column({ type: 'tinyint', default: false })
  user_isRootAdmin: boolean;

  @Column('tinyint', { default: false })
  user_isBlocked: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: UserEntity;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'is_deleted', type: 'tinyint', default: false })
  isDeleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hasPasswordBeforeTransform() {
    if (this.user_pass)
      this.user_pass = await UtilTransform.hashPassword(this.user_pass);
  }
}
