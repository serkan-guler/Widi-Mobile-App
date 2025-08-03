import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Header} from '../components';

export const stackLogoHeader = (props: NativeStackHeaderProps) => (
  <Header showLogo onPressBack={props.back && props.navigation.goBack} />
);

export const stackHeader = (props: NativeStackHeaderProps) => (
  <Header
    title={props.options.title}
    onPressBack={props.back && props.navigation.goBack}
  />
);
