import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

type CatBreedBSProps = {
  onCloseAndOpenModal?: () => void; 
  onSelectBreed?: (breed: string) => void;
  direction?: "vertical" | "horizontal"; 
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

export const CatBreedBS = ({ onCloseAndOpenModal, direction = "vertical" }: CatBreedBSProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  const { updatePetListingData,petListingData  } = useAppContext();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(
    petListingData.breed?.length > 0 ? petListingData.breed : []
  );
  const toggleSelection = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds([]); 
    } else {
      setSelectedBreeds([breed]); 
    }
  }; 

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]); 

  const [fadeAnim] = useState(new Animated.Value(1));
  const handleContinue = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
        updatePetListingData("breed", selectedBreeds);
      onCloseAndOpenModal && onCloseAndOpenModal();
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
            !selectedBreeds.length && { backgroundColor: "#ccc" }, 
          ]}
          onPress={handleContinue}
          disabled={!selectedBreeds.length} 
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "700",
    width: "90%",
  },
  subTitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#fff",
    fontWeight: "700",
  },
});
