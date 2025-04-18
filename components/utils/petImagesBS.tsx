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

type PetImagesProps = {
  //closeModal: () => void;
  onCloseAndOpenModal?: () => void; // NEW
};

const screenHeight = Dimensions.get("window").height;

const MAX_IMAGES = 5;

export const PetImages = ({ onCloseAndOpenModal }: PetImagesProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));

  const [images, setImages] = useState<(string | null)[]>(
    Array(MAX_IMAGES).fill(null)
  );
  const [imageCount, setImageCount] = useState(0); // Track the number of uploaded images

  const handleImagePicker = (index: number) => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Take Photo", onPress: () => openCamera(index) },
      { text: "Choose from Gallery", onPress: () => openGallery(index) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async (index: number) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Allow camera access to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateImage(index, result.assets[0].uri);
    }
  };

  const openGallery = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateImage(index, result.assets[0].uri);
    }
  };

  const updateImage = (index: number, uri: string) => {
    const updated = [...images];
    updated[index] = uri;
    setImages(updated);
    setImageCount(updated.filter((image) => image !== null).length); // Update the image count
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Animate the modal to position 0 (visible)
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

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.indicator} />
      <Text style={styles.title}>Upload images</Text>
      <Text style={styles.subTitle}>Upload images of your pet below.</Text>

      <View style={styles.gridContainer}>
        {images.map((uri, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={() => handleImagePicker(index)}
          >
            {uri ? (
              <Image source={{ uri }} style={styles.image} />
            ) : index === 0 ? (
              <FontAwesome6 name="plus" size={20} color="#939393" />
            ) : (
              <Image
                source={require("../../assets/images/camera_plus.png")}
                style={{ width: 18, height: 16 }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.ContinueButton,
            { backgroundColor: imageCount === MAX_IMAGES ? "#2BBFFF" : "#ccc" },
          ]}
          onPress={handleContinue}
          disabled={imageCount !== MAX_IMAGES} // Disable button if not 5 images
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "90%",
    gap: 12,
    marginBottom: 50,
  },
  imageBox: {
    width: 95,
    height: 75,
    backgroundColor: "#FDFDFD",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
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
