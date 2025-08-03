import {z} from 'zod';
import {DefaultModel} from './model';
import {editProfileSchema} from '../validations/user';

export type ConnectionType = 'google' | 'microsoft';
export type UserRole = 'tradingLeader' | 'copier';

export type UserType = DefaultModel & {
  uid: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  connectionType: ConnectionType;
  wallet: string;
  // walletSecret: string;
  // role: UserRole;
  isActive: boolean;
  profilePicture?: string;
  backgroundPicture?: string;
  lastLogin?: Date;
  backgroundColor?: string;
  trusted: boolean;
  trustedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
};

export type GetUserDataType = {
  user: UserType;
  token?: string;
};

export type WalletDataType = {
  wallet: string;
  secret: string;
};

export type EditProfileType = z.infer<typeof editProfileSchema>;
