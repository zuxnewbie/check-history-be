import { ABaseModal } from 'src/abstracts/models';
import { UserEntity } from 'src/apis/Users/user.entity';
import { IToken } from 'src/interfaces/models';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity('tokens')
export class TokenEntity extends ABaseModal implements IToken {
  @Column('text')
  @Index({ fulltext: true })
  token_code: string;

  @Column('text')
  token_key: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'token_user_id' })
  token_user: UserEntity;
}
