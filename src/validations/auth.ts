import {z, t} from './zod';

export const loginSchema = z.object({
  username: z.string().nonempty(),
  bio: z.string().max(50, t('errors:zod.bioMaxLength')).optional(),
});
