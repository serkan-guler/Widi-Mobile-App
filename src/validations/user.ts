import {z, t} from './zod';

const imageValidation = z
    .string()
    .nullable()
    .transform(val => (val === '' ? null : val))
    .refine(
        val =>
            val === null ||
            val === undefined ||
            val.startsWith('http') ||
            val.startsWith('file://'),
        {message: t('zod:invalidImageUrl')},
    )
    .optional();

export const editProfileSchema = z.object({
  bio: z
    .string()
    .max(50, {
      message: t('zod:bioMaxLength', {max: 50}),
    })
    .optional(),
  backgroundPicture: imageValidation,
  profilePicture: imageValidation,
});
