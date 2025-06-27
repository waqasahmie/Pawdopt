import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAppContext } from "../../hooks/AppContext"; 
import responsive from "@/constants/Responsive";

type PetImagesProps = {
  onCloseAndOpenModal?: () => void; 
  direction?: "vertical" | "horizontal"; 
};

const screenHeight = Dimensions.get("window").height;

const MAX_IMAGES = 5;

export const PetImages = ({ onCloseAndOpenModal, direction = "vertical" }: PetImagesProps) => {
  const { updatePetListingData ,petListingData} = useAppContext();
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [imageCount, setImageCount] = useState(0); // Track the number of uploaded images
  const [image, setImages] = useState<(string | null)[]>(() => {
    const initialImages = Array(MAX_IMAGES).fill(null);
    
    if (petListingData.image && petListingData.image.length > 0) {
      // Fill with existing images from context
      petListingData.image.slice(0, MAX_IMAGES).forEach((uri, index) => {
        initialImages[index] = uri;
      });
      setImageCount(5);
    }
    
    return initialImages;
  });

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
    const updated = [...image];
    updated[index] = uri;
    setImages(updated);
    setImageCount(updated.filter((image) => image !== null).length); // Update the image count
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
    const nonNullImages = image.filter((img): img is string => img !== null);

    updatePetListingData('image', nonNullImages);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
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
      <Text style={styles.title}>Upload images</Text>
      <Text style={styles.subTitle}>Upload images of your pet below.</Text>

      <View style={styles.gridContainer}>
        {image.map((uri, index) => (
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
          disabled={imageCount !== MAX_IMAGES} 
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "90%",
    gap: 12,
    marginBottom: 50,
  },
  imageBox: {
    width: Platform.OS === "ios" ? 95 : 85,
    height: Platform.OS === "ios" ? 75 : 65,
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#fff",
    fontWeight: "700",
  },
});
