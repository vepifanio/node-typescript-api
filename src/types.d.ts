import { IncomingMessage } from 'http';
import { DecodedUser } from './services/auth';

declare module 'express-serve-static-core' {
  export interface Request extends IncomingMessage, Express.Request {
    decoded?: DecodedUser;
  }
}
