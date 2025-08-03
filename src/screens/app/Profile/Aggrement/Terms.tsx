import {memo} from 'react';
import styles from './styles';
import {Header, TermsCard, ScrollLayout} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {View} from 'react-native';

const Terms = ({navigation}: AppStackScreenProps<'Terms'>) => {
  return (
    <ScrollLayout>
      <Header title="Privacy Policy" onPressBack={navigation.goBack} />
      <View style={styles.container}>
        <TermsCard />
      </View>
    </ScrollLayout>
  );
};

export default memo(Terms);
