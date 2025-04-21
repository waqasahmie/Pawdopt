import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";

type PetSubmittedProps = {
  closeModal: () => void;
  direction?: "vertical" | "horizontal"; // <-- NEW
};

const screenHeight = Dimensions.get("window").height;

export const PetSubmitted = ({ closeModal, direction = "vertical" }: PetSubmittedProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  useEffect(() => {
    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-close modal after 10 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    // Clear timer if component unmounts early
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            direction === "horizontal"
              ? { translateX: slideAnim }
              : { translateY: slideAnim },
          ],
        },
      ]}
    >
      <View style={styles.indicator} />
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/images/SuccessTick.png")}
          style={styles.image}
        />
        <Text style={styles.title}>You’re All Set</Text>
        <Text style={styles.subTitle}>
          Your Ad has been submitted for review.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginTop: 8,
  },
  container: {
    width: "95%",
    height: 480,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  innerContainer: {
    height: 436,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "700",
    width: "90%",
  },
  subTitle: {
    fontSize: 14,
    color: "#939393",
    fontWeight: "500",
    width: "90%",
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
});
