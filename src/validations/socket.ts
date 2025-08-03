import {z, t} from './zod';

export const socketMessageSchema = z.object({
  type: z.enum([
    'authenticate',
    'pong',
    'error',
    'pool_update',
    'transaction_update',
    'searchTokenResponse',
  ]),
  payload: z.unknown(),
  timestamp: z.union([
    z.string().datetime(), // ISO date string validation
    z.number(), // Also allow number timestamps
  ]),
});
