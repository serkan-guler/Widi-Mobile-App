import {memo} from 'react';
import styles from './styles';
import {Header, PrivacyPolicyCard, ScrollLayout} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {View} from 'react-native';

const Privacy = ({navigation}: AppStackScreenProps<'Privacy'>) => {
  return (
    <ScrollLayout>
      <Header title="Privacy Policy" onPressBack={navigation.goBack} />
      <View style={styles.container}>
        <PrivacyPolicyCard />
      </View>
    </ScrollLayout>
  );
};

export default memo(Privacy);
