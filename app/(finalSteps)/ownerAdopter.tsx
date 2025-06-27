import React, { useCallback, useEffect, useState } from "react";
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
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

export default function FinalStepsAdopterowner() {
  const navigation = useNavigation();
  const { role } = useLocalSearchParams();
  const { tempemail, tempphone, tempcallingCode, tempcountryCode } =
    useAppContext();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [cnic, setCnic] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const { registrationData, updateRegistrationData } = useAppContext();
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ]);
  const [cnicFront, setCnicFront] = useState<string | null>(null);
  const [cnicBack, setCnicBack] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  useFocusEffect(
    useCallback(() => {
      if (tempemail && tempemail.trim() !== "") {
        setEmail(tempemail);
      }
      if (tempcallingCode && tempcallingCode.trim() !== "") {
        setCallingCode(tempcallingCode);
      }
      if (tempcountryCode && tempcountryCode.trim() !== "") {
        setCountryCode(tempcountryCode as CountryCode);
      }
      if (tempphone && tempphone.trim() !== "") {
        setPhoneNumber(tempphone);
      }
    }, [tempemail, tempphone, tempcallingCode])
  );

  useEffect(() => {
    if (
      organizationName ||
      (firstName &&
        lastName &&
        value &&
        validateEmail(email) &&
        validatePhoneNumber(phoneNumber) &&
        validateCnic(cnic) &&
        cnicFront &&
        cnicBack)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    organizationName,
    firstName,
    lastName,
    value,
    email,
    phoneNumber,
    cnic,
    cnicFront,
    cnicBack,
  ]);

  const handleImagePicker = async (side: "front" | "back") => {
    Alert.alert(
      `Upload CNIC ${side === "front" ? "Front" : "Back"}`,
      "Choose an option",
      [
        { text: "Take Photo", onPress: () => openCamera(side) },
        { text: "Choose from Gallery", onPress: () => openGallery(side) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // Open camera
  const openCamera = async (side: "front" | "back") => {
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
      } else {
        setCnicBack(result.assets[0].uri);
      }
    }
  };

  // Open gallery
  const openGallery = async (side: "front" | "back") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (side === "front") {
        setCnicFront(result.assets[0].uri);
      } else {
        setCnicBack(result.assets[0].uri);
      }
    }
  };

  const renderUploader = (side: "front" | "back", image: string | null) => (
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
            Browse or capture the {side === "front" ? "front" : "back"} side of
            your CNIC.
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
  const handleSubmit = () => {
    updateRegistrationData("firstName", firstName);
    updateRegistrationData("lastName", lastName);
    updateRegistrationData("email", email);
    updateRegistrationData("phone", `+${callingCode}${phoneNumber}`);
    updateRegistrationData("gender", value);
    updateRegistrationData("cnicNumber", cnic);
    updateRegistrationData("frontCNIC", cnicFront);
    updateRegistrationData("backCNIC", cnicBack);
    updateRegistrationData("organizationName", organizationName);
    updateRegistrationData("callingCode", callingCode);
    updateRegistrationData("countryCode", countryCode);
    router.push("/(finalSteps)/accountCreated");
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const formData = [
    ...(role === "Organization"
      ? [
          {
            key: "organizationName",
            render: () => (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.inputHeader}>Organization Name</Text>
                </View>
                <TextInput
                  placeholder="The Crazy Pets Lahore"
                  style={styles.input}
                  placeholderTextColor="#939393"
                  autoCapitalize="sentences"
                  value={organizationName}
                  onChangeText={setOrganizationName}
                />
              </>
            ),
          },
        ]
      : []),

    {
      key: "firstName",
      render: () => (
        <>
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
        </>
      ),
    },
    {
      key: "lastName",
      render: () => (
        <>
           <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Last Name</Text>
              </View>
              <TextInput
                placeholder="Ahmed"
                style={styles.input}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={lastName}
                onChangeText={setLastName}
              />
        </>
      ),
    },
    {
      key: "email",
      render: () => (
        <>
           <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Email</Text>
              </View>

              {tempemail === " " ? (
                <TextInput
                  placeholder="waqasahmed@gmail.com"
                  style={styles.input}
                  value={email}
                  placeholderTextColor="#939393"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                />
              ) : (
                <TextInput
                  placeholder="waqasahmed@gmail.com"
                  style={styles.input}
                  value={(tempemail !== "" ? tempemail : email) || ""}
                  placeholderTextColor="#939393"
                  autoCapitalize="none"
                  editable={tempemail === ""} 
                  onChangeText={(text) => {
                    if (tempemail === "") {
                      setEmail(text); 
                    }
                  }}
                />
              )}
        </>
      ),
    },
    {
      key: "phone",
      render: () => (
        <>
           <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Phone Number</Text>
              </View>

              {tempphone === " " ? (
                <>
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
                          setCountryCode(
                            (country?.cca2 as CountryCode) || "PK"
                          );
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

                 
                </>
              ) : (
                <View style={styles.InputContainer}>
                  <TouchableOpacity
                    style={styles.countryPicker}
                    onPress={() => setVisible(true)}
                  >
                    <CountryPicker
                      visible={false}
                      withFilter={false}
                      withFlag={true}
                      withCallingCode={true}
                      withModal={true} 
                      countryCode={countryCode}
                      onSelect={() => {
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
                    editable={tempphone === ""}
                    value={tempphone || phoneNumber}
                    onChangeText={(text) => {
                      if (tempphone === "") {
                        setPhoneNumber(text);
                      }
                    }}
                  />
                </View>
              )}
        </>
      ),
    },
    {
      key: "gender",
      render: () => (
        <>
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
                textStyle={styles.dropdownText}
              />
        </>
      ),
    },
    {
      key: "cnic",
      render: () => (
        <>
          <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Number</Text>
              </View>
              <TextInput
                placeholder="Enter CNIC (XXXXX-XXXXXXX-X)"
                style={styles.input}
                placeholderTextColor="#939393"
                keyboardType="numeric"
                value={cnic}
                onChangeText={(text) => setCnic(formatCnic(text))}
              />
        </>
      ),
    },
    {
      key: "cnicFront",
      render: () => (
        <>
          <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Front</Text>
              </View>
              {renderUploader("front", cnicFront)}
        </>
      ),
    },
    {
      key: "cnicBack",
      render: () => (
        <>
          <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>CNIC Back</Text>
              </View>
              {renderUploader("back", cnicBack)}
        </>
      ),
    },
    {
      key: "note",
      render: () => (
        <>
          <Text style={styles.inputNote}>
            We request a picture of your CNIC to ensure the security of your
            account and protect against fraudulent activities and scams...
          </Text>
        </>
      ),
    },
  ];

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
          <Text style={styles.pageIndicator}>4/4</Text>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Final Steps!</Text>
          <Text style={styles.subtitle}>
            We’re almost there! Fill in your personal details to create a
            profile and start your journey towards a responsible Adopter.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <FlatList
                data={formData}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => item.render()}
                ListFooterComponent={<View style={{ height: 70 }} />}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
        {/* Continue Button */}
        {!isKeyboardVisible && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                isButtonDisabled && styles.disabledButton,
              ]}
              disabled={isButtonDisabled}
              onPress={() => {
                handleSubmit();
                router.push(`/(finalSteps)/accountCreated?role=${role}`);
              }}
            >
              <Text style={styles.continueText}>Finish</Text>
            </TouchableOpacity>
          </View>
        )}
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
    width: "100%",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
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
    width: "100%",
    height: "100%",
    backgroundColor: "#2BBFFF", // Second half blue
    borderRadius: 4,
  },
  textContainer: {
    width: "100%",
  },
  inputHeader: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(12),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginBottom: 15,
  },
  inputNote: {
    color: "#939393",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(9) : responsive.fontSize(8),
    marginTop: -10,
    marginBottom: 35,
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  phoneNumberInput: {
    flex: 1,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginLeft: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 10,
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
