import { Response } from 'express';
import { CONST_VAL } from 'src/constants';
import { UtilConverts } from './converts.util';
import { ETime } from 'src/enums/common';

export class UtilCookie {
  static setCookieToken({
    name,
    data,
    res,
  }: {
    name: string;
    data: string;
    res: Response;
  }) {
    return res.cookie(name, data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === CONST_VAL.ENV_PROD,
      maxAge: UtilConverts.convertTimeToMilisecond({
        value: 15,
        typeTime: ETime.DAY,
      }),
    });
  }

  static clearCookie({ name, res }: { name: string; res: Response }) {
    return res.clearCookie(name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === CONST_VAL.ENV_PROD,
    });
  }
}
