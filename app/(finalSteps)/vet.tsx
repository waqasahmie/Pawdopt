import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Modal,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import { WebView } from "react-native-webview";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons";
import { router } from "expo-router";

export default function FinalStepsVet() {
  const navigation = useNavigation();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handlePress = () => {
    setModalVisible(false);
    router.push({
      pathname: "/(finalSteps)/accountCreated",
      params: {
        from: 'vet',
      },
    });
  };

  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ]);
  const [experience, setExperience] = useState<string>("");
  const [license, setLicense] = useState<string | null>(null);
  const [cnic, setCnic] = useState<string>("");
  const [cnicFront, setCnicFront] = useState<string | null>(null);
  const [cnicBack, setCnicBack] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // For Cal.com

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number: string) =>
    /^(?:\d{10,11})$/.test(number);
  const validateCnic = (cnic: string) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  // Auto-format CNIC as user types
  const formatCnic = (value: string) => {
    let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    if (numericValue.length > 13) numericValue = numericValue.slice(0, 13);

    if (numericValue.length <= 5) return numericValue;
    if (numericValue.length <= 12)
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
    return `${numericValue.slice(0, 5)}-${numericValue.slice(
      5,
      12
    )}-${numericValue.slice(12)}`;
  };

  // Auto-format Title field
  const formatTitle = (value: string) => {
    let trimmedValue = value.replace(/\./g, "").trim(); // Remove existing dots and trim spaces
    if (!trimmedValue) return ""; // Return empty if input is empty
    return `${trimmedValue}.`;
  };

  // Auto-format Experience as user types
  const formatExperience = (value: string) => {
    let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    let experience = parseInt(numericValue, 10);

    if (isNaN(experience) || experience < 1) return ""; // Reject values 1 or less

    return `${experience} Years`;
  };

  useEffect(() => {
    if (
      title &&
      firstName &&
      value &&
      license &&
      validateEmail(email) &&
      validatePhoneNumber(phoneNumber) &&
      validateCnic(cnic) &&
      cnicFront &&
      cnicBack
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    title,
    firstName,
    value,
    license,
    email,
    phoneNumber,
    cnic,
    cnicFront,
    cnicBack,
  ]);

  const handleImagePicker = async (side: "front" | "back" | "license") => {
    Alert.alert(
      `Upload ${
        side === "front"
          ? "CNIC Front"
          : side == "license"
          ? "Vet License"
          : "CNIC Back"
      }`,
      "Choose an option",
      [
        { text: "Take Photo", onPress: () => openCamera(side) },
        { text: "Choose from Gallery", onPress: () => openGallery(side) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // Open camera
  const openCamera = async (side: "front" | "back" | "license") => {
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
      if (side === "front") {
        setCnicFront(result.assets[0].uri);
      } else if (side === "license") {
        setLicense(result.assets[0].uri);
      } else {
        setCnicBack(result.assets[0].uri);
      }
    }
  };

  // Open gallery
  const openGallery = async (side: "front" | "back" | "license") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (side === "front") {
        setCnicFront(result.assets[0].uri);
      } else if (side === "license") {
        setLicense(result.assets[0].uri);
      } else {
        setCnicBack(result.assets[0].uri);
      }
    }
  };

  const renderUploader = (
    side: "front" | "back" | "license",
    image: string | null
  ) => (
    <TouchableOpacity
      style={styles.uploadBox}
      onPress={() => handleImagePicker(side)}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.uploadedImage} />
      ) : (
        <>
          <Feather name="upload-cloud" size={22} color="black" />
          <Text style={styles.uploadText}>
            Browse or capture{" "}
            {side === "front"
              ? "the Front side of your CNIC."
              : side == "license"
              ? "your Vet License."
              : "the Back side of your CNIC."}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openCamera(side)}
            >
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openGallery(side)}
            >
              <AntDesign name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
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
          <Text style={{ color: "#939393", fontSize: 16 }}>4/4</Text>
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
          <Text style={styles.title}>Final Steps!</Text>
          <Text style={styles.subtitle}>
            We’re almost there! Fill in your personal details to create a
            profile and start your journey towards a responsible Adopter.
          </Text>
        </View>
        <View style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
            >
              {/* Input Fields */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Title</Text>
              </View>
              <TextInput
                placeholder="Dr."
                style={styles.input}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={title}
                onChangeText={(text) => setTitle(formatTitle(text))}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>First Name</Text>
              </View>
              <TextInput
                placeholder="Waqas"
                style={styles.input}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={firstName}
                onChangeText={setFirstName}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>
                  Last Name <Text style={{ color: "#939393" }}>(Optional)</Text>
                </Text>
              </View>
              <TextInput
                placeholder="Ahmed"
                style={styles.input}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={lastName}
                onChangeText={setLastName}
              />
              {/* Email Input Field */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Email</Text>
              </View>
              <TextInput
                placeholder="drwaqasahmed@gmail.com"
                style={styles.input}
                value={email}
                placeholderTextColor="#939393"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
              {/* Phone Number Input */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Phone Number</Text>
              </View>
              <View style={styles.InputContainer}>
                <TouchableOpacity
                  style={styles.countryPicker}
                  onPress={() => setVisible(true)}
                >
                  <CountryPicker
                    visible={visible}
                    withFilter={true}
                    withFlag={true}
                    withCallingCode={true}
                    withModal={true}
                    countryCode={countryCode}
                    onSelect={(country: Country) => {
                      setCountryCode((country?.cca2 as CountryCode) || "PK");
                      setCallingCode(country?.callingCode[0] || "92");
                      setVisible(false);
                    }}
                    onClose={() => setVisible(false)}
                  />
                  <Text style={styles.callingCode}>+{callingCode} ▼</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneNumberInput}
                  placeholder="Enter phone number"
                  placeholderTextColor="#939393"
                  keyboardType="numeric"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
              {/* Gender Dropdown */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Gender</Text>
              </View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Gender"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
                dropDownDirection="BOTTOM"
              />
              {/* Experience Input */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Experience</Text>
              </View>
              <TextInput
                placeholder="5 Years"
                style={styles.input}
                placeholderTextColor="#939393"
                keyboardType="numeric"
                value={experience}
                onChangeText={(text) => setExperience(formatExperience(text))}
              />
              {/* CNIC Front */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Vet License</Text>
              </View>
              {renderUploader("license", license)}
              {/* CNIC Input */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Number</Text>
              </View>
              <TextInput
                placeholder="Enter CNIC (XXXXX-XXXXXXX-X)"
                style={styles.input}
                placeholderTextColor="#939393"
                keyboardType="numeric"
                maxLength={15}
                value={cnic}
                onChangeText={(text) => setCnic(formatCnic(text))}
              />
              {/* CNIC Front */}
              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Front</Text>
              </View>
              {renderUploader("front", cnicFront)}

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Back</Text>
              </View>
              {renderUploader("back", cnicBack)}
              <Text style={styles.inputNote}>
                We request a picture of your CNIC to ensure the security of your
                account and protect against fraudulent activities and scams.
                This helps us verify your identity and maintain a safe
                environment for all users.
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>

        {/* Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              isButtonDisabled && styles.disabledButton,
            ]}
            disabled={isButtonDisabled}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.continueText}>Setup Interview Meeting</Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => handlePress()}
            >
              <HugeiconsIcon
                icon={MultiplicationSignIcon}
                size={20}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <WebView
              source={{
                uri: "https://cal.com/pawdopt/pawdoptvetinterview",
              }}
            />
          </Modal>
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
    paddingVertical: 50,
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "60%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Back button left & email right
    width: "100%",
    marginTop: Platform.OS === "ios" ? 0 : -20, // To place it below the status bar
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
    lineHeight: 24, // 1.5 times the font size (16 * 1.5)
    marginBottom: 30,
  },
  progressBarContainer: {
    flexDirection: "row", // new
    width: "70%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden", // Ensures the border radius is applied correctly
  },
  progressBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
    borderRadius: 4,
  },
  textContainer: {
    width: "100%", // Ensures full width
  },
  inputHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 400,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  inputNote: {
    color: "#939393",
    fontSize: 10,
    marginTop: -10,
    marginBottom: 30,
  },
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 15,
    padding: 5,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  mobileNumber: {
    color: "#2BBFFF",
    fontSize: 16,
    marginTop: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingHorizontal: 10, // Padding inside the dropdown box
    paddingVertical: 8,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 10, // Padding inside the dropdown options container
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d3d3d3",
    borderRadius: 8,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
  },
  uploadText: {
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: 300,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 5,
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
    position: "absolute",
    bottom: 40, // Change to 50 if needed
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
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalCloseButton: {
    // backgroundColor: "#2BBFFF",
    // paddingVertical: 15,
    // paddingHorizontal: 20,
    // marginTop: 10,
    // // bottom: 30,
    // marginBottom: 30,
    // borderRadius: 30,
    // width: "90%",
    // alignItems: "center",
    // alignSelf: "center",
    // justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    // backgroundColor: "rgba(0,0,0,0.1)",
    // padding: 10,
    // borderRadius: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
