import {memo} from 'react';
import {Image} from 'react-native';
import type {ImageProps, ImageSourcePropType} from 'react-native';

type Props = {
  source?: string;
  // style?: ImageProps['style'];
  // resizeMode?: ImageProps['resizeMode'];
} & ImageProps;

const localImages = {
  'logo-black': require('../../../assets/images/logos/Logo-Black.png'),
  'logo-white': require('../../../assets/images/logos/Logo-White.png'),
  'logo-red': require('../../../assets/images/logos/Logo-Red.png'),
  capsule: require('../../../assets/images/tokens/capsule.png'),
  raydium: require('../../../assets/images/tokens/raydium.png'),
  orca: require('../../../assets/images/tokens/orca.png'),
  meteora: require('../../../assets/images/tokens/meteora.png'),
  moonshot: require('../../../assets/images/tokens/moonshot.png'),
  // Diğer local image'larınızı buraya ekleyin
};

const Img = ({source, ...props}: Props) => {
  const getImageSource = () => {
    if (!source) {
      return localImages['logo-black'];
    }

    if (source.startsWith('http')) {
      return {
        uri: source,
        cache: 'reload',
      };
    }

    // Local image'lar için switch-case
    switch (source) {
      case 'logo-black':
        return localImages['logo-black'];
      case 'logo-white':
        return localImages['logo-white'];
      case 'logo-red':
        return localImages['logo-red'];
      case 'capsule':
        return localImages['capsule'];
      case 'raydium':
        return localImages['raydium'];
      case 'orca':
        return localImages['orca'];
      case 'meteora':
        return localImages['meteora'];
      case 'moonshot':
        return localImages['moonshot'];
      default:
        return localImages['logo-black'];
    }
  };

  return (
    <Image
      source={getImageSource() as ImageSourcePropType}
      resizeMode="contain"
      // style={{width: '100%', height: '100%'}}
      {...props}
    />
  );
};

export default memo(Img);
