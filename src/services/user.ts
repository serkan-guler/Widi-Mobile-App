import {Asset} from 'react-native-image-picker/lib/typescript/types';
import {USER_URLS} from '../constants/api';
import {postService} from './service';
import {FileDataType, UserType} from '../types';

export const editProfileService = async ({
  data,
  files,
}: {
  data: unknown;
  files: FileDataType;
}) =>
  await postService<Partial<UserType>>({
    url: USER_URLS.editProfileUrl,
    data,
    serviceType: 'form',
    fileData: files,
  });
