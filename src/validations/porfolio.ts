import {checkPortfolioNameService} from '../services';
import {z, t} from './zod';

export const addPortfolioSchema = z
  .object({
    balance: z.number().min(0),
    type: z.enum(['public', 'private']),
    name: z
      .string()
      .min(3, {message: t('zod:nameLength', {min: 3, max: 20})})
      .max(20, {message: t('zod:nameLength', {min: 3, max: 20})})
      .refine(
        async value => {
          const response = await checkPortfolioNameService(value);
          if (response.status === 'error') {
            return false;
          } else {
            return response.data;
          }
        },
        {
          message: t('zod:portfolioNameExists'),
        },
      ),
    amount: z.string().refine(
      value => {
        const num = parseFloat(value.replace(',', '.'));
        return !isNaN(num) && num >= 1 && num <= 1000;
      },
      {
        message: t('zod:amountRange', {min: 1, max: 1000}),
      },
    ),
    profitShare: z.string().refine(
      value => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 1 && num <= 30;
      },
      {
        message: t('zod:profitShareRange', {min: 1, max: 30}),
      },
    ),
    minCopyAmount: z.string().refine(
      value => {
        const normalizedValue = value.replace(',', '.');
        const num = parseFloat(normalizedValue);
        return !isNaN(num) && num >= 0.1 && num <= 1000;
      },
      {
        message: t('zod:minCopyAmountRange', {min: 0.1, max: 1000}),
      },
    ),
    lockPeriod: z.enum(['7', '14', '21', '30']),
    numberOfCopiers: z.string().refine(
      value => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 1 && num <= 1000;
      },
      {
        message: t('zod:numberOfCopiersRange', {min: 1, max: 1000}),
      },
    ),
    code: z.string().optional(),
    agreedToAgreement: z.boolean().refine(value => value, {
      message: t('zod:agreementRequired'),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'private' && !data.code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('zod:privatePortfolioCodeRequired'),
        path: ['code'],
      });
    }

    if (data.type === 'private' && data.code) {
      if (data.code.length < 3 || data.code.length > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('zod:privatePortfolioCodeLengthRange', {min: 3, max: 10}),
          path: ['code'],
        });
      }
    }

    // HACK: Burası test için kapatıldı, açılacak
    // if (data.amount) {
    //   const amount = parseInt(data.amount);
    //   if (!isNaN(amount) && amount > data.balance) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: t('zod:amountExceedsBalance'),
    //       path: ['amount'],
    //     });
    //   }
    // }
  });
