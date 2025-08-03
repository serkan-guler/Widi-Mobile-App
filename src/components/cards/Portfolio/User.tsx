import {memo, ReactNode} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSession} from '../../../hooks';
import {Img} from '../../common';
import {XConnectIcon} from '../../../assets/icons';
import {UserType} from '../../../types';

type Props = {
  showWelcome?: boolean;
  showBio?: boolean;
  cardUser?: UserType;
  leadingContent?: ReactNode;
};

const PortfolioUserCard = ({
  showWelcome,
  showBio,
  cardUser,
  leadingContent,
}: Props) => {
  const {t} = useTranslation(['common', 'content']);
  const {user} = useSession();

  const userData = cardUser || user;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userWrapper}>
          <Img
            source={userData?.profilePicture}
            style={styles.imageSize}
            resizeMode="cover"
          />
          <View>
            {showWelcome && (
              <Text style={styles.welcomeText}>
                {t('content:welcomeBack')},
              </Text>
            )}
            <View style={styles.userNameContainer}>
              <Text style={styles.userNameText}>{userData?.username}</Text>
              <XConnectIcon />
            </View>
          </View>
        </View>
        {leadingContent}
      </View>
      {showBio && userData?.bio && (
        <Text style={styles.userBio}>{userData.bio}</Text>
      )}
    </View>
  );
};

export default memo(PortfolioUserCard);
