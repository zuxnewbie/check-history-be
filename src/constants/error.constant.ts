export const MESS_ERROR_VN = {
  ROLE: 'Vai trò không hợp lệ',
  GENDER: 'Giới tính không hợp lệ',
  EMAIL: 'Địa chỉ email không hợp lệ',
  PHONE_NUMBER: 'Số điện thoại không hợp lệ',
  FIELD_NOT_EMPTY: (field: string) => `${field} không được để trống`,
  MIN_LENGTH: ({ field, length }: { field: string; length: number }) =>
    `${field} phải có ít nhất ${length} ký tự`,
  MAX_LENGTH: ({ field, length }: { field: string; length: number }) =>
    `${field} phải có nhiều nhất ${length} ký tự`,
  MIN_VALUE: ({ field, val }: { field: string; val: number }) =>
    `${field} phải có giá trị ít nhất là ${val}`,
  MAX_VALUE: ({ field, val }: { field: string; val: number }) =>
    `${field} phải có giá trị nhiều nhất là ${val}`,
};
