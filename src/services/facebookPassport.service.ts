import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import { facebookClientId, facebookClientSecret } from '../config';
import UserRepo from '../database/repositories/UserRepo';

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      fbGraphVersion: 'v3.1',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      const user = await UserRepo.findOrCreate(
        profile,
        'Facebook',
        accessToken
      );
      return done(null, user);
    }
  )
);
