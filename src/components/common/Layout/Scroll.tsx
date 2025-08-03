import {ScrollLayoutProps} from '../../../types';
import styles from './styles';
import Layout from './Base';
import {RefreshControl, ScrollView, View} from 'react-native';

const ScrollLayout = ({
  isLoading,
  refreshing,
  onRefresh,
  children,
}: ScrollLayoutProps) => {
  return (
    <Layout isLoading={isLoading} padding={false}>
      <ScrollView
        style={[styles.container, styles.scrollContainer, styles.padding]}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
              progressViewOffset={20}
              size={12}
            />
          ) : undefined
        }>
        <View style={[styles.contentContainer, styles.gap]}>{children}</View>
      </ScrollView>
    </Layout>
  );
};

export default ScrollLayout;
