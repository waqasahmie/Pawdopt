import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

type ListPROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  closeModal?: () => void;
};

const screenHeight = Dimensions.get("window").height;

export const ListModal = ({
  isOpen,
  withInput,
  closeModal,
  children,
  style,
  ...rest
}: ListPROPS & { style?: any }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const content = withInput ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
      style={styles.modalStyle}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={[styles.modalStyle, style]}>{children}</View>
  );

  const handleCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      if (isOpen) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(slideAnim, {
          toValue: screenHeight * 0.9,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          closeModal && closeModal();
        });
      }
    }
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      {...rest}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />

      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <Animated.View
          style={[
            styles.contentWrapper,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {content}
        </Animated.View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 10,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 2, // Ensure modal content is on top of the overlay
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen with the overlay
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background with opacity
    zIndex: 1, // Ensure the overlay is below the modal content
  },
});
