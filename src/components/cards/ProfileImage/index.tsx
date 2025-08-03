import {memo, useCallback, useMemo, useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useSession} from '../../../hooks';
import {useTranslation} from 'react-i18next';
import {AddImageIcon} from '../../../assets/icons';
import {scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {BlurView} from '@react-native-community/blur';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  Callback,
  Asset,
} from 'react-native-image-picker';
import {showAlert} from '../../../utils/alert';

type Props = {
  editable?: boolean;
  onChangeCover?: (asset: Asset) => void;
  onChangeProfile?: (asset: Asset) => void;
};

const ProfileImageCard = ({
  editable = false,
  onChangeCover,
  onChangeProfile,
}: Props) => {
  const {t} = useTranslation(['content']);
  const {user} = useSession();

  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [profileImage, setProfileImage] = useState<string>();

  const handleChangeCover = useCallback((response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode) {
      const asset = response.assets?.[0];
      if (asset) {
        setBackgroundImage(asset.uri);
        onChangeCover?.(asset);
      }
    } else {
      if (!response.didCancel) {
        showAlert('error', t('errors:selectPhoto'));
      }
    }
  }, []);

  const handleChangeProfile = useCallback((response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode) {
      const asset = response.assets?.[0];
      if (asset) {
        setProfileImage(asset.uri);
        onChangeProfile?.(asset);
      }
    } else {
      if (!response.didCancel) {
        showAlert('error', t('errors:selectPhoto'));
      }
    }
  }, []);

  const selectFromGallery = async (callback: Callback) => {
    try {
      await launchImageLibrary({mediaType: 'photo'}, callback);
    } catch (error) {
      showAlert('error', t('errors:unknownError'));
    }
  };

  const containerStyle = useMemo(() => {
    const style: ViewStyle[] = [styles.container];

    if (!user) {
      style.push(styles.coloredContainer);
    } else {
      if (!user.backgroundPicture || user.backgroundColor === '') {
        if (user.backgroundColor) {
          style.push({backgroundColor: `#${user.backgroundColor}`});
        } else {
          style.push(styles.coloredContainer);
        }
      }
    }

    return style;
  }, [user]);

  return (
    user && (
      <View style={containerStyle}>
        {editable && (
          <TouchableOpacity
            style={styles.editCoverButton}
            onPress={() => selectFromGallery(handleChangeCover)}>
            <BlurView
              style={styles.blurContainer}
              blurType="dark"
              blurAmount={30}
              reducedTransparencyFallbackColor="black"
            />
            <Text style={styles.editText}>{t('changeCover')}</Text>
          </TouchableOpacity>
        )}
        {(user.backgroundPicture !== '' || backgroundImage) && (
          <Image
            source={{uri: backgroundImage ?? user.backgroundPicture}}
            style={styles.bgImage}
            resizeMode="stretch"
          />
        )}
        <View style={[styles.profileImage, styles.imageSize]}>
          <View style={styles.imageWrapper}>
            {editable && (
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => selectFromGallery(handleChangeProfile)}>
                <AddImageIcon
                  width={scaleSize(11)}
                  height={scaleSize(11)}
                  color={COLORS.DARK}
                />
              </TouchableOpacity>
            )}

            <Image
              source={{uri: profileImage ?? user.profilePicture}}
              style={styles.imageSize}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    )
  );
};

export default memo(ProfileImageCard);
