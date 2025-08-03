import {AppResponseType, FileDataType} from '../types';
import i18n from '../localization/i18n';
import {deCrypt, enCrypt} from '../lib/crypto';
import {API_URL} from '@env';
import {unknownErrorMessage} from '../utils';
import {getUniqueId} from 'react-native-device-info';
import {getToken} from '../lib/store';

type FormDataFile = {
  uri: string;
  name: string;
  type: string;
};

type Service = RequestInit & {
  url: string;
  data?: unknown;
  serviceType?: 'form' | 'json';
  fileData?: FileDataType;
};

const service = async <T>({
  url,
  data,
  method,
  serviceType = 'json',
  fileData,
  ...props
}: Service): Promise<AppResponseType<T>> => {
  const apiUrl = `${API_URL}${url}`;

  try {
    const token = await getToken();
    const deviceId = await getUniqueId();

    const headers: HeadersInit_ = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Accept-Language': i18n.language,
      'Device-Id': deviceId,
      // 'App-Version': APP_VERSION,
      // 'App-Platform': Platform.OS,
    };

    if (serviceType === 'json') {
      headers['Content-Type'] = 'application/json';
    }

    const options: RequestInit = {
      method,
      ...props,
      headers,
    };

    if (method && method === 'POST') {
      if (serviceType === 'json') {
        options.body = JSON.stringify({data: enCrypt(data)});
      } else {
        const formData = new FormData();

        const encryptedData = enCrypt(data);
        formData.append('data', encryptedData);

        if (fileData) {
          Object.entries(fileData).forEach(([key, asset]) => {
            if (asset?.uri && asset?.type) {
              const file: FormDataFile = {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName ?? `${key}.jpg`,
              };

              formData.append(key, file);
            }
          });
        }

        options.body = formData;
      }
    }

    const response = await fetch(apiUrl, options);

    const result = await response.json();

    if (result.status === 'success') {
      result.data = deCrypt(result.data);
      // if (result.token) {
      //   await setToken(deCrypt(result.token));
      // }
    }

    if (result.token) {
      delete result.token;
    }

    return result;
  } catch (error) {
    console.log('Service error:', error);
    return unknownErrorMessage<T>();
  }
};

export const getService = async <T>(prop: Service) =>
  await service<T>({...prop, method: 'GET'});

export const postService = async <T>(prop: Service) =>
  await service<T>({...prop, method: 'POST'});
