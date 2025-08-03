import {memo, useCallback, useMemo, useState} from 'react';
import styles from './styles';
import {
  BaseButton,
  Header,
  Input,
  KeyboardAvoid,
  Notification,
  PageHeaderCard,
  PageLoading,
  ProfileImageCard,
} from '../../../../components';
import {ScrollView, StatusBar, View} from 'react-native';
import {
  AppStackScreenProps,
  EditProfileType,
  FileDataType,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {useSession, useSize} from '../../../../hooks';
import {COLORS} from '../../../../constants/colors';
import {SubmitHandler, useForm} from 'react-hook-form';
import {editProfileSchema} from '../../../../validations/user';
import {zodResolver} from '@hookform/resolvers/zod';
import {Asset} from 'react-native-image-picker';
import {editProfileService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';

const EditProfileScreen = ({
  navigation,
}: AppStackScreenProps<'EditProfile'>) => {
  const {t} = useTranslation(['common', 'navigation', 'content']);
  const {user, editUser} = useSession();
  const {
    height,
    safeArea: {top, bottom},
  } = useSize();

  const [headerHeight, setHeaderHeight] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState<Asset>();
  const [profileImage, setProfileImage] = useState<Asset>();

  const defaultValues = {
    bio: user?.bio || '',
    backgroundPicture: user?.backgroundPicture || '',
    profilePicture: user?.profilePicture || '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<EditProfileType>({
    defaultValues,
    resolver: zodResolver(editProfileSchema),
  });

  const handleChangeCover = useCallback(
    (asset: Asset) => {
      setBackgroundImage(asset);
    },
    [setBackgroundImage],
  );

  const handleChangeProfile = useCallback(
    (asset: Asset) => {
      setProfileImage(asset);
    },
    [setProfileImage],
  );

  if (!user) {
    return <PageLoading />;
  }

  const containerHeight = useMemo(
    () => height - top - headerHeight,
    [height, top, headerHeight],
  );

  const onSubmit: SubmitHandler<EditProfileType> = async data => {
    if (data.bio === user.bio && !backgroundImage && !profileImage) {
      navigation.popToTop();
      return;
    }
    const files: FileDataType = {};

    if (backgroundImage) {
      files.backgroundPicture = backgroundImage;
    }

    if (profileImage) {
      files.profilePicture = profileImage;
    }

    const response = await editProfileService({
      data: {
        bio: data.bio,
      },
      files,
    });

    showAlert(response.status, response.message);

    if (response.status === 'success') {
      editUser(response.data);
      navigation.popToTop();
    }
  };

  return (
    <KeyboardAvoid>
      <ScrollView style={[styles.scrollLayout, {paddingTop: top}]}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="fade"
          backgroundColor={COLORS.DARK}
        />
        <Header
          title={t('navigation:editProfile')}
          onPressBack={() => navigation.goBack()}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            setHeaderHeight(height);
          }}
        />

        <View
          style={[
            styles.layout,
            {minHeight: containerHeight, paddingBottom: bottom},
          ]}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <View>
                <ProfileImageCard
                  editable
                  onChangeCover={handleChangeCover}
                  onChangeProfile={handleChangeProfile}
                />
              </View>
              <KeyboardAvoid>
                <View style={styles.formGroup}>
                  <View style={styles.formControl}>
                    <PageHeaderCard
                      title={`X ${t('common:username')}`}
                      fontSize={20}
                      lineHeight={25}
                      letterSpacing={-0.4}
                    />
                    <Input readOnly value={`@${user?.username}`} />
                    <View style={styles.notificationContainer}>
                      <Notification
                        message={t('content:xUsernameInfo')}
                        type="warning"
                      />
                    </View>
                  </View>
                  <View style={styles.formControl}>
                    <PageHeaderCard
                      title={t('common:bio')}
                      fontSize={20}
                      lineHeight={25}
                      letterSpacing={-0.4}
                    />
                    <Input
                      placeholder={t('common:bio')}
                      control={control}
                      name="bio"
                      autoCapitalize="words"
                      keyboardAppearance="dark"
                      submitBehavior="blurAndSubmit"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      returnKeyType="send"
                    />
                    {errors.bio && errors.bio.message && (
                      <View style={styles.notificationContainer}>
                        <Notification
                          message={errors.bio.message}
                          type="error"
                        />
                      </View>
                    )}
                  </View>
                </View>
              </KeyboardAvoid>
            </View>
            <View style={styles.buttonContainer}>
              <BaseButton
                label={t('common:save')}
                wFull
                onPress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoid>
  );
};

export default memo(EditProfileScreen);
