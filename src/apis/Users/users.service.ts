import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UtilCalculator, UtilConverts } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { BoEnumsCommon } from 'bodevops-be-common';
import { IDataUser, IGetManyItem, IQueries } from 'src/interfaces/common';
import {
  CreateUserDto,
  UpdateUserDto,
  AddRolesUserDto,
  AddRolesGroupsUserDto,
} from './user.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { RolesGroupsService } from '../roles-groups/roles-groups.service';
import { CONST_VAL } from 'src/constants';
import { RolesGroupEntity } from '../roles-groups/roles-group.entity';
import { RoleEntity } from '../roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private rolesService: RolesService,
    private rolesGroupsService: RolesGroupsService,
  ) {
    this.initAdmin();
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('createUserDto::', createUserDto);
    let roles: RoleEntity[] = [];
    let rolesGroups: RolesGroupEntity[] = [];
    if (createUserDto.user_roles) {
      roles = await Promise.all(
        createUserDto?.user_roles?.map(async (roleId) => {
          const findRole = await this.rolesService.findOneById(String(roleId));
          if (!findRole) {
            throw new BadRequestException('Lỗi thêm quyền');
          }
          return findRole;
        }),
      );
    }

    if (createUserDto.user_rolesGroups) {
      rolesGroups = await Promise.all(
        createUserDto?.user_rolesGroups?.map(async (roleGroupId) => {
          const findRolesGroup = await this.rolesGroupsService.findOneById(
            String(roleGroupId),
          );
          if (!findRolesGroup) {
            throw new BadRequestException('Lỗi thêm quyền');
          }
          return findRolesGroup;
        }),
      );
    }
    const checkEmail = await this.findOneByEmail(createUserDto.user_email);

    if (checkEmail) {
      throw new BadRequestException(
        'Email đã tồn tại, vui lòng nhập email khác',
      );
    }

    const checkPhone = await this.findOneByPhone(createUserDto.user_phone);
    if (checkPhone) {
      throw new BadRequestException(
        'Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác',
      );
    }

    const dataUser = this.usersRepository.create({
      ...createUserDto,
      user_roles: roles,
      user_rolesGroups: rolesGroups,
    });

    const newUser = await this.usersRepository.save(dataUser);

    return newUser;
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: { user_roles: true, user_rolesGroups: true },
    });
  }

  async findOneByPhone(phone: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { user_phone: phone } });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { user_email: email } });
  }
  async findAll(queries: IQueries): Promise<IGetManyItem<UserEntity>> {
    const sortByVal: keyof UserEntity =
      (queries.sortBy as keyof UserEntity) || 'createdAt';

    const [items, totalItems] = await Promise.all([
      this.usersRepository.find({
        take: +queries.limit || CONST_VAL.LIMIT_DEFAULT,
        skip: UtilCalculator.calculatorSkipPage({
          limit: queries.limit,
          page: queries.page,
        }),
        relations: {
          createdBy: true,
          updatedBy: true,
          deletedBy: true,
          user_roles: true,
          user_rolesGroups: true,
        },
        order: { [sortByVal]: queries.sortDir },
        where: UtilConverts.convertCondition(queries),
      }),
      this.usersRepository.count({
        where: UtilConverts.convertCondition(queries),
      }),
    ]);

    return {
      items,
      totalItems,
    };
  }

  async search(queries: IQueries): Promise<IGetManyItem<UserEntity>> {
    const sortByVal: keyof UserEntity =
      (queries.sortBy as keyof UserEntity) || 'createdAt';

    const [items, totalItems] = await Promise.all([
      this.usersRepository.find({
        take: +queries.limit || CONST_VAL.LIMIT_DEFAULT,
        skip: UtilCalculator.calculatorSkipPage({
          limit: queries.limit,
          page: queries.page,
        }),
        relations: {
          createdBy: true,
          updatedBy: true,
          deletedBy: true,
          user_roles: true,
          user_rolesGroups: true,
        },
        order: { [sortByVal]: queries.sortDir },
        where: UtilConverts.convertCondition(queries),
      }),
      this.usersRepository.count({
        where: UtilConverts.convertCondition(queries),
      }),
    ]);

    return {
      items,
      totalItems,
    };
  }

  async addRoles({
    req,
    userId,
    addRolesUserDto,
  }: {
    req: Request;
    userId: string;
    addRolesUserDto: AddRolesUserDto;
  }): Promise<boolean> {
    const user = req['user'] as IDataUser;

    if (user.userId === userId) {
      throw new BadRequestException('Thao tác không hợp lệ');
    }

    const findUser = await this.findOneById(userId);

    if (!findUser) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    if (findUser.user_isRootAdmin) {
      throw new BadRequestException(
        'Bạn không thể thao tác với tài khoảng này',
      );
    }

    const roles = await Promise.all(
      addRolesUserDto.roleIds.map(async (roleId) => {
        const findRole = await this.rolesService.findOneById(roleId);
        if (!findRole) {
          throw new BadRequestException('Phân quyền thất bại');
        }
        return findRole;
      }),
    );

    findUser.user_roles = roles;

    const dataUser = this.usersRepository.create(findUser as UserEntity);

    const userUpdate = await this.usersRepository.save(dataUser);

    if (!userUpdate) {
      throw new BadRequestException('Cập nhật quyền thất bại');
    }

    return true;
  }

  async addRolesGroups(
    userId: string,
    addRolesGroupsUserDto: AddRolesGroupsUserDto,
    req: Request,
  ): Promise<boolean> {
    const user = req['user'] as IDataUser;

    if (user.userId === userId) {
      throw new BadRequestException('Thao tác không hợp lệ');
    }

    const findUser = await this.findOneById(userId);

    if (!findUser) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    if (findUser.user_isRootAdmin) {
      throw new BadRequestException(
        'Bạn không thể thao tác với tài khoảng này',
      );
    }

    const rolesGroups = await Promise.all(
      addRolesGroupsUserDto.roleGroupsIds.map(async (roleGroupId) => {
        const findRoleGroup =
          await this.rolesGroupsService.findOneById(roleGroupId);
        if (!findRoleGroup) {
          throw new BadRequestException('Thêm vào nhóm quyền thất bại');
        }
        return findRoleGroup;
      }),
    );

    findUser.user_rolesGroups = rolesGroups;

    const dataUser = this.usersRepository.create(findUser as UserEntity);

    const userUpdate = await this.usersRepository.save(dataUser);

    if (!userUpdate) {
      throw new BadRequestException('Cập nhật quyền thất bại');
    }

    return true;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    console.log('updateUserDto:::', updateUserDto);
    const findUser = await this.findOneById(id);

    if (!findUser) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    let roles: RoleEntity[];
    if (updateUserDto.user_roles) {
      roles = await Promise.all(
        updateUserDto.user_roles?.map(async (roleId) => {
          const findRole = await this.rolesService.findOneById(String(roleId));
          if (!findRole) {
            throw new BadRequestException('Lỗi thêm quyền');
          }
          return findRole;
        }),
      );
    }

    let rolesGroups: RolesGroupEntity[];
    if (updateUserDto.user_rolesGroups) {
      rolesGroups = await Promise.all(
        updateUserDto.user_rolesGroups.map(async (roleGroupId) => {
          const findRolesGroup = await this.rolesGroupsService.findOneById(
            String(roleGroupId),
          );
          if (!findRolesGroup) {
            throw new BadRequestException('Lỗi thêm quyền');
          }
          return findRolesGroup;
        }),
      );
    }

    const dataUpdated = this.usersRepository.create({
      ...findUser,
      ...updateUserDto,
      user_roles: roles || findUser.user_roles,
      user_rolesGroups: rolesGroups || findUser.user_rolesGroups,
    });

    const userUpdated = await this.usersRepository.save(dataUpdated);

    if (!userUpdated) {
      throw new BadRequestException('Cập nhật blog thất bại');
    }

    return Boolean(userUpdated);
  }

  async restore(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    if (!user.isDeleted) {
      throw new BadRequestException('Restore người dùng thất bại');
    }

    const userRestored = await this.usersRepository.update(id, {
      isDeleted: false,
    });

    return Boolean(userRestored.affected);
  }

  async softRemove({
    id,
    req,
  }: {
    id: string;
    req: Request;
  }): Promise<boolean> {
    const currentUser = await this.authService.getMe(req);

    if (currentUser.id === id) {
      throw new BadRequestException('Thao tác xóa không hợp lệ');
    }

    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const userSoftDeleted = await this.usersRepository.update(id, {
      isDeleted: true,
      deletedBy: currentUser,
    });

    return Boolean(userSoftDeleted.affected);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user || !user.isDeleted) {
      throw new BadRequestException('Xóa người dùng không thành công');
    }

    const userDeleted = await this.usersRepository.delete(user.id);

    return Boolean(userDeleted.affected);
  }

  private async initAdmin() {
    const findRootAdminByPhone = await this.usersRepository.findOne({
      where: { user_phone: process.env.ADMIN_PHONE },
    });
    const findRootAdminByEmail = await this.usersRepository.findOne({
      where: { user_email: process.env.ADMIN_EMAIL },
    });

    if (findRootAdminByPhone || findRootAdminByEmail) {
      return;
    }

    const dataAdminCreate = this.usersRepository.create({
      user_avatar: '',
      user_isRootAdmin: true,
      user_phone: process.env.ADMIN_PHONE,
      user_gender: BoEnumsCommon.EGender.MALE,
      user_email: process.env.ADMIN_EMAIL,
      user_lastName: process.env.ADMIN_LASTNAME,
      user_firstName: process.env.ADMIN_FIRSTNAME,
      user_pass: process.env.ADMIN_PASS,
    });

    if (!findRootAdminByEmail || !findRootAdminByPhone) {
      await this.usersRepository.save(dataAdminCreate);
    }
  }
}
