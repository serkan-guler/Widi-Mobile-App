import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'avatar' | 'card';
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const ShimmerSkeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height = 20,
  borderRadius,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH / 2.5],
  });

  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return {
          width: height,
          height: height,
          borderRadius: height / 2,
        };
      case 'avatar':
        return {
          width: 50,
          height: 50,
          borderRadius: 25,
        };
      case 'rectangular':
        return {
          width,
          height,
          borderRadius: borderRadius || 8,
        };
      case 'card':
        return {
          width,
          height: height || 120,
          borderRadius: borderRadius || 12,
        };
      case 'text':
      default:
        return {
          width,
          height,
          borderRadius: borderRadius || 4,
        };
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.placeholder, getVariantStyles()]}>
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [{translateX}],
            },
          ]}>
          <LinearGradient
            // colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
            colors={[
              'rgba(225,233,238,0)',
              'rgba(255,255,255,0.2)',
              'rgba(225,233,238,0.1)',
              'rgba(225,233,238,0.3)',
              'rgba(225,233,238,0.2)',
              'rgba(225,233,238,0.1)',
            ]}
            // colors={['red', 'blue', 'green', 'yellow', 'purple', 'orange']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  placeholder: {
    backgroundColor: COLORS.DARK, // Gri temel arka plan
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: 'stretch',
//   },
//   placeholder: {
//     backgroundColor: COLORS.PRIMARY,
//     overflow: 'hidden',
//   },
//   shimmerOverlay: {
//     position: 'absolute',
//     width: '50%',
//     height: '100%',
//     borderRadius: 4,
//   },
//   gradient: {
//     width: '100%',
//     height: '100%',
//   },
// });

export default ShimmerSkeleton;
