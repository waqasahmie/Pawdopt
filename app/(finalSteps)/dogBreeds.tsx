import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";
const breeds = [
  "Husky",
  "Bulldog",
  "Pitbull",
  "Samoyed",
  "German Shepherd",
  "Chow Chow",
  "Golden Retriever",
  "Shih Tzu",
  "Labrador Retriever",
  "Dobermann",
  "Border Collie",
  "Poodle",
  "Rottweiler",
];

export default function BreedPreferences() {
  const navigation = useNavigation();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const { role } = useLocalSearchParams();
  const { updateRegistrationData } = useAppContext();

  const toggleSelection = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
    } else {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.pageIndicator}>3/4</Text>
        </View>

        {/* Top Left Background Image */}
        <Image
          source={require("../../assets/images/PawprintT.png")}
          style={styles.topLeftImage}
        />

        {/* Bottom Right Background Image */}
        <Image
          source={require("../../assets/images/PawprintB.png")}
          style={styles.bottomRightImage}
        />

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Breed Preferences</Text>
          <Text style={styles.subtitle}>
            Specify your preferences for the breed of the animal you’d like to
            adopt. Based on your previous choice. Select all that apply.
          </Text>
        </View>

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

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton} 
            onPress={() => {
              updateRegistrationData("favoriteBreeds", selectedBreeds); 
              router.push(`/(finalSteps)/ownerAdopter?role=${role}`); 
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
  },
  textContainer: {
    width: "100%", 
  },
  pageIndicator: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    lineHeight: Platform.OS === "ios" ? 24 : 20,
    marginBottom: 30,
  },
  progressBarContainer: {
    flexDirection: "row", 
    width: "70%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
    borderRadius: 4,
  },
  breedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  breedButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2BBFFF",
    margin: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  selectedBreedButton: {
    backgroundColor: "#2BBFFF",
  },
  breedText: {
    textAlign: "center",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(13),
    color: "#2BBFFF",
  },
  selectedBreedText: {
    color: "#FFFFFF",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
