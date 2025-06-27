import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { useAppContext } from "@/hooks/AppContext";
import { useAuth } from "@clerk/clerk-expo";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import responsive from "@/constants/Responsive";
import Toast from "./toast";

type PreferenceProps = { closeModal: () => void };
const breeds = ["Cats", "Dogs", "Parrots"];
const screenHeight = Dimensions.get("window").height;

export const Preference = ({ closeModal }: PreferenceProps) => {
  const { userData, updateUserData } = useAppContext();
  const { userId } = useAuth();
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef<any>({});

  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.animalType) {
      setSelectedBreed(userData.animalType);
    }
  }, [userData]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start(closeModal);
  };

  const toggleSelection = (breed: string) => {
    setSelectedBreed((prev) => (prev === breed ? null : breed));
  };

  const handleConfirm = async () => {
    if (!userId || !selectedBreed) {
      toastRef.current.show({
        type: "error",
        title: "Selection Required",
        description: "Please select one breed",
      });
      return;
    }
    try {
      setIsLoading(true); 
      const ref = doc(db, "users", userId);
      await updateDoc(ref, { animalType: selectedBreed });
      updateUserData({ ...userData!, animalType: selectedBreed });
      handleClose();
    } catch (e) {
      toastRef.current.show({
        type: "error",
        title: "Error",
        description: "Could not save preference.Try again!",
      });
      
    }finally {
      setIsLoading(false); 
    }
  };
  useEffect(() => {
    if (userData?.animalType) {
      setSelectedBreed(userData.animalType);
    }
  }, [userData]);
  
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.indicator} />
      <Text style={styles.title}>Pet Preferences</Text>

      <View style={styles.breedContainer}>
        {breeds.map((breed) => (
          <TouchableOpacity
            key={breed}
            style={[
              styles.breedButton,
              selectedBreed === breed && styles.selectedBreedButton,
            ]}
            onPress={() => toggleSelection(breed)}
          >
            <Text
              style={[
                styles.breedText,
                selectedBreed === breed && styles.selectedBreedText,
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
        <TouchableOpacity style={styles.ConfirmButton} onPress={handleConfirm}>
          <Text style={styles.ConfirmText}>OK</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={toastRef} />
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
    fontSize: Platform.OS === "ios" ? responsive.fontSize(25) : responsive.fontSize(20),
    fontWeight: "400" 
  },
  breedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
  },
  breedButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    width: 90,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2BBFFF",
    margin: 5,
  },
  selectedBreedButton: { 
    backgroundColor: "#2BBFFF" 
  },
  breedText: { 
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "500", 
    color: "#2BBFFF" 
  },
  selectedBreedText: { 
    color: "#fff" 
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  cancelButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#F2FBFF",
  },
  cancelText: { 
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#2BBFFF", 
    fontWeight: "700" 
  },
  ConfirmButton: {
    width: 130,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#2BBFFF",
  },
  ConfirmText: { 
        fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14), 
    color: "#fff", 
    fontWeight: "700" 
  },
});
