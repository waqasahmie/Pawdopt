import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

type PetBreedBSProps = {
  closeModal: () => void;
};

const screenHeight = Dimensions.get("window").height;
const breeds = [
  "Persian",
  "Himalayan",
  "British Shorthair",
  "Ragdoll",
  "Siamese",
  "Scottish Fold",
  "Exotic Shorthair",
  "American Shorthair",
  "Siberian",
  "Maine Coon",
  "Russian Blue",
];

export const PetBreedBS = ({ closeModal }: PetBreedBSProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const toggleSelection = (breed: string) => {
    // If the breed is already selected, remove it. Otherwise, select it.
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds([]); // Deselect the breed
    } else {
      setSelectedBreeds([breed]); // Select only the clicked breed
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
      <Text style={styles.title}>Choose a category</Text>
      <Text style={styles.subTitle}>
        Select a category that fits your needs below.
      </Text>

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
        <TouchableOpacity
          style={[
            styles.ContinueButton,
            !selectedBreeds.length && { backgroundColor: "#ccc" }, // Disable button if no breed selected
          ]}
          onPress={handleClose}
          disabled={!selectedBreeds.length} // Disable button if no breed is selected
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
  breedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  breedButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2BBFFF",
    marginBottom: 15,
    marginRight: 10,
  },
  selectedBreedButton: {
    backgroundColor: "#2BBFFF",
  },
  breedText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#2BBFFF",
  },
  selectedBreedText: {
    color: "#FFFFFF",
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
