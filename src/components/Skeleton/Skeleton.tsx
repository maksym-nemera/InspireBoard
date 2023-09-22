/* eslint-disable no-magic-numbers */
import { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface SkeletonProps {
  customWidth?: number;
  height: number;
}

export const Skeleton: FC<SkeletonProps> = memo(({ customWidth, height }) => {
  const [skeletonWidth, setSkeletonWidth] = useState(0);
  const animatedColor = useSharedValue(0);

  useEffect(() => {
    if (customWidth) {
      setSkeletonWidth(customWidth);
    } else {
      const screenWidth = Dimensions.get('window').width;
      const calculatedWidth = screenWidth / 2 - 10;
      setSkeletonWidth(calculatedWidth);
    }

    animatedColor.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 5, stiffness: 40 }),
        withSpring(0.8, { damping: 5, stiffness: 40 }),
      ),
      -1,
      true,
    );
  }, [customWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(224, 224, 224, ${animatedColor.value})`,
    };
  });

  return (
    <Animated.View
      style={[
        styles.skeletonContainer,
        {
          width: skeletonWidth,
          height,
        },
        animatedStyle,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  skeletonContainer: {
    marginHorizontal: 5,
    backgroundColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 8,
  },
});
