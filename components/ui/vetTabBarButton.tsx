import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Veticon } from "@/constants/vetTabIcon";
import { HapticTab } from "../HapticTab"; // Import the haptic wrapper
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";


const VetTabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: string;
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 10,
      stiffness: 100,
    });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 0]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <HapticTab
      onPressIn={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {Veticon[routeName as keyof typeof Veticon]({
          // color: isFocused ? "black" : "white", // Focused tab is black, others are white
          focused: isFocused, // Pass isFocused to change the icon
        })}
      </Animated.View>
    </HapticTab>
  );
};

export default VetTabBarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
