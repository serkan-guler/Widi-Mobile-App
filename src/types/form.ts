import {loginSchema} from '../validations/auth';
import {z} from '../validations/zod';

export type LoginFormSchemaType = z.infer<typeof loginSchema>;
