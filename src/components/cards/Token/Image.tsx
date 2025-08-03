import {memo, useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {Image} from 'react-native';
import {SvgUri} from 'react-native-svg';

type Props = {
  image: string | undefined;
  uri?: string;
};

const TokenImage = ({image, uri}: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(image);

  const fetchImageMetadata = useCallback(async () => {
    if (uri) {
      if (
        (uri.endsWith('.png') ||
          uri.endsWith('.jpg') ||
          uri.endsWith('.jpeg') ||
          uri.endsWith('.webp') ||
          uri.endsWith('.gif') ||
          uri.endsWith('.svg')) &&
        uri !== imageUrl
      ) {
        setImageUrl(uri);
      } else {
        const response = await fetch(uri);
        if (response.ok) {
          const result = await response.json();

          if (result.image) {
            setImageUrl(result.image);
          }
        }
      }
    }
  }, [uri, imageUrl]);

  const convertImageUrl = useCallback(async () => {
    const imageFullUrl = image;
    const imageUrlArray = imageFullUrl?.split('proxy?url=');

    if (imageUrlArray) {
      const newUrl = imageUrlArray[1];
      if (newUrl !== imageUrl) {
        setImageUrl(decodeURIComponent(newUrl));
      } else {
        await fetchImageMetadata();
      }
    } else {
      await fetchImageMetadata();
    }
  }, [image, fetchImageMetadata]);

  useEffect(() => {
    if (!image) {
      fetchImageMetadata();
    }
  }, [image, fetchImageMetadata]);

  return imageUrl?.endsWith('.svg') ? (
    <SvgUri
      uri={imageUrl}
      width="100%"
      height="100%"
      onError={() => {
        convertImageUrl();
      }}
    />
  ) : (
    <Image
      source={{uri: imageUrl}}
      style={styles.size}
      resizeMode="cover"
      onError={async () => {
        await convertImageUrl();
      }}
    />
  );
};

export default memo(TokenImage);
