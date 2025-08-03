import {memo, useEffect, useState} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {
  BaseButton,
  Header,
  Input,
  Layout,
  Notification,
} from '../../../components';
import {AuthStackScreenProps, LoginFormSchemaType} from '../../../types';
import {useTranslation} from 'react-i18next';
import {useSession} from '../../../hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '../../../validations/auth';
import {SCREEN_NAMES} from '../../../constants/navigation';

const GetUsernameScreen = ({
  route,
  navigation,
}: AuthStackScreenProps<'GetUsername'>) => {
  const {t} = useTranslation(['common', 'content', 'errors']);
  const {setUser} = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<LoginFormSchemaType>({
    defaultValues: {
      username: route.params?.username || '',
    },
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (route.params) {
      setValue('username', route.params.username);
    }
  }, [setValue, route.params]);

  const handleContinue: SubmitHandler<LoginFormSchemaType> = async data => {
    navigation.navigate(SCREEN_NAMES.AUTH.WIDI_CODE, {
      ...route.params,
      isRegistered: false,
      bio: data.bio,
    });
  };

  return (
    <Layout isLoading={isLoading}>
      <Header
        onPressBack={navigation.canGoBack() ? navigation.goBack : undefined}
        title=""
      />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>{t('content:username')}</Text>
            <View style={styles.input}>
              <Input
                placeholder={t('content:enterYourName')}
                autoComplete="username"
                enterKeyHint="next"
                // value={username}
                name="username"
                control={control}
                readOnly
              />
            </View>
            <View style={styles.notification}>
              <Notification
                type="warning"
                message={t('content:xUsernameInformation')}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>{t('content:bio')}</Text>
            <Input
              placeholder={t('content:enterYourBio')}
              enterKeyHint="send"
              name="bio"
              control={control}
            />
            {errors.bio && errors.bio.message && (
              <View style={styles.notification}>
                <Notification type="error" message={errors.bio.message} />
              </View>
            )}
          </View>
        </View>
        <BaseButton
          label={t('continue')}
          wFull
          onPress={handleSubmit(handleContinue)}
        />
      </View>
    </Layout>
  );
};

export default memo(GetUsernameScreen);
