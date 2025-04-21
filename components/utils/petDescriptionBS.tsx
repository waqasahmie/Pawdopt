import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";

type PetDescriptionProps = {
  //closeModal: () => void;
  onCloseAndOpenModal?: () => void; // NEW
  direction?: "vertical" | "horizontal"; // <-- NEW
};

const screenHeight = Dimensions.get("window").height;
const WORD_LIMIT = 100;

export const PetDescription = ({
  onCloseAndOpenModal,
  direction = "vertical",
}: PetDescriptionProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [description, setDescription] = useState("");
  const dismissKeyboard = () => Keyboard.dismiss();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const [fadeAnim] = useState(new Animated.Value(1));
  // When the modal closes, we animate it to slide down
  const handleContinue = () => {
    // Trigger fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      //closeModal(); // Call the closeModal prop to close the modal after animation
      onCloseAndOpenModal && onCloseAndOpenModal();
    });
  };

  const handleDescriptionChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    const wordCount = text.trim() === "" ? 0 : words.length;

    // Check if it's increasing (user is typing more)
    const isAdding = text.length > description.length;

    if (wordCount <= WORD_LIMIT) {
      setDescription(text);
    } else if (!isAdding) {
      // Allow deleting/backspacing
      setDescription(text);
    } else {
      // Block typing beyond 100 words
      Keyboard.dismiss(); // optional: dismiss keyboard to show user input is blocked
    }
  };

  const wordCount =
    description.trim() === "" ? 0 : description.trim().split(/\s+/).length;

  // Disable the continue button if the description is empty or only contains spaces
  const isDescriptionEmpty = description.trim().length === 0;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
        <Text style={styles.title}>Pet Description</Text>
        <Text style={styles.subTitle}>
          Provide a description of your pet below.
        </Text>
        <Text style={styles.subSubTitle}>Pet Description</Text>

        <View style={styles.textAreaWrapper}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={12}
            placeholder="Write something about your pet..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={handleDescriptionChange}
          />
        </View>
        <View style={styles.wordCountContainer}>
          <Text
            style={[
              styles.wordCountText,
              wordCount >= WORD_LIMIT && { color: "red" },
            ]}
          >
            {wordCount}/{WORD_LIMIT}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.ContinueButton,
              isDescriptionEmpty && { backgroundColor: "#ccc" }, // Change color when disabled
            ]}
            onPress={handleContinue}
            disabled={isDescriptionEmpty} // Disable button if description is empty
          >
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    marginTop: 40,
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
    marginBottom: 30,
  },
  subSubTitle: {
    fontSize: 12,
    fontWeight: "400",
    width: "90%",
    marginBottom: 5,
    marginLeft: 8,
  },
  textAreaWrapper: {
    width: "90%",
    position: "relative",
  },
  textArea: {
    minHeight: 200,
    maxHeight: 200,
    borderColor: "#E3E5E5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 12,
    fontWeight: "300",
  },
  wordCountContainer: {
    width: "95%",
    alignItems: "flex-end",
  },
  wordCountText: {
    position: "absolute",
    right: 12,
    fontSize: 12,
    color: "#999",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  ContinueButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: "#2BBFFF",
  },
  ContinueText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
