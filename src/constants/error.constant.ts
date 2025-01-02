export declare const MESS_ERROR_VN: {
  ROLE: string;
  GENDER: string;
  EMAIL: string;
  PHONE_NUMBER: string;
  FIELD_NOT_EMPTY: (field: string) => string;
  MIN_LENGTH: ({ field, length }: { field: string; length: number }) => string;
  MAX_LENGTH: ({ field, length }: { field: string; length: number }) => string;
  MIN_VALUE: ({ field, val }: { field: string; val: number }) => string;
  MAX_VALUE: ({ field, val }: { field: string; val: number }) => string;
};
