import {StyleSheet, Text, View} from 'react-native';
import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import LottiesView from './lottiesView';
import {getStyles} from '../utils/toastStyles';

interface ToastProps {
  type?: 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  duration: number;
}

const Toast = forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const [state, setState] = useState({
    title: '',
    isShow: false,
    type: '',
    description: '',
  });

  const updateState = (newState: object) => {
    setState((prevState: any) => ({
      ...prevState,
      ...newState,
    }));
  };

  const {backgroundColor, titleColor, descriptionColor, animationSource} =
    getStyles(state.type);

  const show = useCallback(
    ({title, description, type, duration = 2000}: ToastProps) => {
      updateState({
        isShow: true,
        title,
        description,
        type,
      });
      toastTopAnimation.value = withSequence(
        withTiming(Math.max(Number(0), 50)),
        withDelay(
          duration,
          withTiming(-1500, undefined, finish => {
            if (finish) {
              runOnJS(() => {
                updateState({
                  isShow: false,
                });
              });
            }
          }),
        ),
      );
    },
    [toastTopAnimation],
  );

  useImperativeHandle(
    ref,
    () => ({
      show: (props: ToastProps) => show(props),
    }),
    [show],
  );
  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  return (
    <>
      {state.isShow && (
        <Animated.View
          style={[styles.toastContainer, {backgroundColor}, animatedTopStyles]}>
          {animationSource && (
            <LottiesView
              animationStyle={styles.icon}
              animationViewStyle={styles.icon}
              source={animationSource}
              loop={false}
              speed={2.5}
            />
          )}
          <View style={styles.titleCard}>
            <Text style={[styles.title, {color: titleColor}]}>
              {state?.title}
            </Text>
            {state.description && (
              <Text style={[styles.description, {color: descriptionColor}]}>
                {state.description}
              </Text>
            )}
          </View>
        </Animated.View>
      )}
    </>
  );
});

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    paddingVertical: 8,
    paddingHorizontal: 10, 
    marginHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleCard: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  description: {
    fontSize: 10,
    fontWeight: '500',
  },
  icon: {
    width: 30,
    height: 30,
  },
});