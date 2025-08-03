import {Text, View} from 'react-native';
import styles from './styles';
import {
  CopiedCard,
  Header,
  ScrollLayout,
  SearchInput,
  Tabs,
} from '../../../../components';
import {memo, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

const CopiedScreen = () => {
  const {t} = useTranslation(['navigation', 'content', 'common']);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const labels = [t('common:active'), t('common:passive')];
  // const labels = [t('content:copyBalance'), t('content:myLeader')];
  const placeholder = [t('content:searchActive'), t('content:searchPassive')];

  return (
    <ScrollLayout>
      <Header title={t('navigation:copied')} />
      <View style={styles.container}>
        <Tabs
          labels={labels}
          type="status"
          onTabPress={handleTabChange}
          divider={
            <View style={styles.searchContainer}>
              <SearchInput placeholder={placeholder[activeTab]} />
            </View>
          }>
          <Tabs.Content>
            <CopiedCard type={activeTab === 0 ? 'unrealized' : 'realized'} />
          </Tabs.Content>
          <Tabs.Content>
            <CopiedCard type={activeTab === 0 ? 'unrealized' : 'realized'} />
          </Tabs.Content>
        </Tabs>
      </View>
    </ScrollLayout>
  );
};

export default memo(CopiedScreen);
