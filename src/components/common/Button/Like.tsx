import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {LikeOutlineIcon, LikeSolidIcon} from '../../../assets/icons';

type Props = {
  like: boolean;
  likeCount: number;
} & TouchableOpacityProps;

const LikeButton = ({like, likeCount, ...props}: Props) => {
  return (
    <TouchableOpacity style={styles.likeButton} {...props}>
      {like ? <LikeSolidIcon /> : <LikeOutlineIcon />}
      <Text style={styles.likeText}>{likeCount}</Text>
    </TouchableOpacity>
  );
};

export default memo(LikeButton);
