import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

type PreferenceProps = {
  closeModal: () => void;
};

const screenHeight = Dimensions.get("window").height;
const breeds = ["Cats", "Dogs", "Parrots"];

export const Preference = ({ closeModal }: PreferenceProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const toggleSelection = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
    } else {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

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
      <Text style={styles.title}>Pet Preferences</Text>

      {/* Breed Selection */}
      <View style={styles.breedContainer}>
        {breeds.map((breed, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.breedButton,
              selectedBreeds.includes(breed) && styles.selectedBreedButton,
            ]}
            onPress={() => toggleSelection(breed)}
          >
            <Text
              style={[
                styles.breedText,
                selectedBreeds.includes(breed) && styles.selectedBreedText,
              ]}
            >
              {breed}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ConfirmButton} onPress={handleClose}>
          <Text style={styles.ConfirmText}>OK</Text>
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
    paddingBottom: 50,
    gap: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: "400",
  },
  breedContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    width: "95%",
  },
  breedButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: 90,
    //paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2BBFFF",
    margin: 5,
    marginBottom: 10,
    // marginRight: 10,
  },
  selectedBreedButton: {
    backgroundColor: "#2BBFFF",
  },
  breedText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#2BBFFF",
  },
  selectedBreedText: {
    color: "#FFFFFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%", // Ensures proper spacing
    marginTop: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.05, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 1, // For Android shadow
  },
  cancelButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#F2FBFF",
  },
  cancelText: {
    fontSize: 18,
    color: "#2BBFFF",
    fontWeight: "700",
  },
  ConfirmButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#2BBFFF",
  },
  ConfirmText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
