import { ApiProperty } from '@nestjs/swagger';
import { CONST_VAL } from 'src/constants';
import { EDirectionSort } from 'src/enums/common';
import { IQueries } from 'src/interfaces/common';

export type TSort = keyof typeof EDirectionSort;

export abstract class AQueries<T = any> implements Partial<IQueries<T>> {
  @ApiProperty({
    type: String,
    minimum: 1,
    maximum: 100,
    title: 'Limit',
    default: CONST_VAL.LIMIT_DEFAULT,
    description: 'Giới hạn item trong một trang',
  })
  limit: string;

  @ApiProperty({
    type: String,
    minimum: 1,
    title: 'Page',
    format: 'int32',
    default: 1,
    description: 'Hiển thị trang hiện tại',
  })
  page: string;

  @ApiProperty({
    type: String,
    minimum: 1,
    title: 'Sort by',
    description: 'Sắp xếp theo trường dữ liệu',
    required: false,
  })
  sortBy: string;

  @ApiProperty({
    type: String,
    minimum: 1,
    title: 'Sort by',
    description: 'Sắp xếp theo trường dữ liệu',
    required: false,
  })
  sortChildrenBy: string;

  @ApiProperty({
    type: String,
    minimum: 1,
    title: 'Sort by',
    description: 'Hướng sắp xếp',
    enum: EDirectionSort,
    default: EDirectionSort.ASC,
    required: false,
  })
  sortDir: TSort;

  @ApiProperty({
    type: String,
    title: 'Search by',
    description: '',
    required: false,
  })
  searchBy: string;

  @ApiProperty({
    type: String,
    title: 'Search by',
    description: '',
    required: false,
  })
  searchVal: string;

  @ApiProperty({
    type: String,
    title: 'Filter by',
    description: '',
    required: false,
  })
  filterBy: string;

  @ApiProperty({
    type: String,
    title: 'Filter val',
    description: '',
    required: false,
  })
  filterVal: string;

  @ApiProperty({
    type: Boolean,
    title: 'Is deleted',
    description: 'Search trường soft delete',
    default: false,
    required: false,
  })
  isDeleted: string;

  @ApiProperty({
    description: 'Field of column for selected',
    default: false,
    required: false,
  })
  fieldsSelected: Array<keyof T>;

  [key: string]: string | any;
}
