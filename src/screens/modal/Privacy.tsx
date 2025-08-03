import {memo} from 'react';
import styles from './styles';
import {ScrollView} from 'react-native';
import {Header, PrivacyPolicyCard} from '../../components';
import {AuthStackScreenProps} from '../../types';

const PrivacyModal = ({navigation}: AuthStackScreenProps<'PrivacyModal'>) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Header title="Privacy Policy" onPressBack={navigation.goBack} />
      <PrivacyPolicyCard />
    </ScrollView>
  );
};

export default memo(PrivacyModal);
