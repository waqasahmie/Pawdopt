import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckBreed() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<
    { label: string; confidence: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Take Photo", onPress: openCamera },
      { text: "Choose from Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Allow camera access to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPrediction([]);
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPrediction([]);
    }
  };

  const getMimeType = (filename: string | undefined) => {
    const match = /\.(\w+)$/.exec(filename ?? "");
    if (!match) return "image/jpeg";
    const ext = match[1].toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "heic") return "image/heic";
    return "image/jpeg";
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select an image first!");
      return;
    }

    const filename = imageUri.split("/").pop();
    const mimeType = getMimeType(filename);
    const file = {
      uri: imageUri,
      name: filename,
      type: mimeType,
    };

    const formData = new FormData();
    formData.append("file", file as any);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://cat-breed-classifier-backend.onrender.com/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data.predictions)) {
        const formattedPredictions = response.data.predictions
          .map((pred: any) => {
            if (Array.isArray(pred)) {
              return { label: pred[0], confidence: pred[1] };
            } else if (
              typeof pred === "object" &&
              pred.label &&
              pred.confidence
            ) {
              return { label: pred.label, confidence: pred.confidence };
            } else {
              return null;
            }
          })
          .filter((item: any) => item !== null);

        setPrediction(formattedPredictions);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      Alert.alert("Error", "Failed to get predictions!");
    }
  };
  const renderUploader = () => (
    <TouchableOpacity style={styles.uploadBox} onPress={handleImagePicker}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
      ) : (
        <>
          <Feather name="upload-cloud" size={50} color="black" />
          <Text style={styles.uploadText}>Browse or capture image</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Ionicons name="camera" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <AntDesign name="plus" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Detect Your Pet’s Breed</Text>
          <Text style={styles.subtitle}>
            Easily identify your pet’s breed from 12 of the most popular cats
            breeds using a single photo.
          </Text>
        </View>

        {/* Pick Image Button */}

        {renderUploader()}

        {/* Bottom "Check Breed" Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.continueButton, !imageUri && styles.disabledButton]}
            onPress={uploadImage}
            disabled={!imageUri}
          >
            <Text style={styles.continueText}>Check Breed</Text>
          </TouchableOpacity>
        </View>
        {/* Show Loading Spinner if uploading */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#2BBFFF"
            style={{ marginTop: 20 }}
          />
        )}
        <View
          style={{
            marginTop: 30,
            //backgroundColor: "pink",
          }}
        >
          {/* Predictions */}
          {prediction.length > 0 && (
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionTitle}>
                {" "}
                {prediction.length === 2
                  ? "Your Cat is Cross Breed"
                  : "Your Cat is"}
              </Text>
              {prediction.map((item, index) => {
                const isTopBreed = index === 0;
                return (
                  <View
                    key={index}
                    style={[
                      styles.predictionBar,
                      {
                        backgroundColor: isTopBreed ? "#cce6ff" : "#f0f0f0",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.innerBar,
                        {
                          width: `${item.confidence}%`,
                          backgroundColor: isTopBreed ? "#2BBFFF" : "#d3d3d3",
                        },
                      ]}
                    />
                    <View style={styles.predictionTextContainer}>
                      <Text style={styles.predictionLabel}>{item.label}</Text>
                      <Text style={styles.predictionConfidence}>
                        {item.confidence.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: 500,
    marginVertical: 10,
  },
  subtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#939393",
    lineHeight: Platform.OS === "ios" ? 24 : 20,
  },
  textContainer: {
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 40,
  },
  predictionContainer: {
    width: "100%",
  },
  predictionTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "bold",
    marginBottom: 10,
  },
  predictionBar: {
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
  },
  innerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
  },
  predictionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: "100%",
    zIndex: 1,
  },
  predictionLabel: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
  },
  predictionConfidence: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d3d3d3",
    borderRadius: 10,
    width: "95%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    alignSelf: "center",
  },
  uploadText: {
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: 300,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#2BBFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  bottomContainer: {
    alignSelf: "center",
    paddingHorizontal: 20,
    marginTop:20,
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
