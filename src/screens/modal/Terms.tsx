import {memo} from 'react';
import styles from './styles';
import {ScrollView} from 'react-native';
import {Header, TermsCard} from '../../components';
import {AuthStackScreenProps} from '../../types';

const TermsModal = ({navigation}: AuthStackScreenProps<'TermsModal'>) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Header title="Privacy Policy" onPressBack={navigation.goBack} />
      <TermsCard />
    </ScrollView>
  );
};

export default memo(TermsModal);
