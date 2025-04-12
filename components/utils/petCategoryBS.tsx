import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

type petCategoryBSProps = {
  closeModal: () => void;
};

const screenHeight = Dimensions.get("window").height;
const categories = [
  {
    id: "1",
    name: "A Cat",
    emoji: require("../../assets/images/cat.png"),
    radiobutton: require("../../assets/images/RadioButton_checked.png"),
  },
  {
    id: "2",
    name: "A Dog",
    emoji: require("../../assets/images/dog.png"),
    radiobutton: require("../../assets/images/RadioButton_unchecked.png"),
  },
  {
    id: "3",
    name: "A Parrot",
    emoji: require("../../assets/images/parrot.png"),
    radiobutton: require("../../assets/images/RadioButton_unchecked.png"),
  },
];

export const PetCategoryBS = ({ closeModal }: petCategoryBSProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Animate the modal to position 0 (visible)
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]); // Only runs when the component mounts

  // When the modal closes, we animate it to slide down
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9, // Move the modal out of the screen (down)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeModal(); // Call the closeModal prop to close the modal after animation
    });
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.indicator} />
      <Text style={styles.title}>Choose a category</Text>
      <Text style={styles.subTitle}>Select a category that fits your needs below.</Text>

      {categories.map((item, index) => (
        <Pressable
          key={index}
          style={styles.categoryOption}
          onPress={() => setSelectedCategory(item.id)}
        >
          <Image source={item.emoji} style={styles.emoji} />
          <Text style={styles.categoryText}>{item.name}</Text>
          <Image
            source={
              selectedCategory === item.id
                ? require("../../assets/images/RadioButton_checked.png")
                : require("../../assets/images/RadioButton_unchecked.png")
            }
            style={styles.radioButton}
          />
        </Pressable>
      ))}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.ContinueButton,
            {
              backgroundColor: selectedCategory ? "#2BBFFF" : "#ccc", // Change color if selected
            },
          ]}
          onPress={handleClose}
          disabled={!selectedCategory} // Disable button if no category is selected
        >
          <Text style={styles.ContinueText}>Continue</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    width: "90%",
    borderColor: "#F6F6F6",
    borderWidth: 4,
    marginBottom: 20,
  },
  emoji: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#939393",
  },
  radioButton: {
    width: 16,
    height: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%", // Ensures proper spacing
    marginTop: 40,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.05, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 1, // For Android shadow
  },
  ContinueButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 18,
  },
  ContinueText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
