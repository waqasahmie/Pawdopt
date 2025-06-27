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
  Modal,
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
import { WebView } from "react-native-webview";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons";
import { router } from "expo-router";
import { useAppContext } from "../../hooks/AppContext";

import { Clock } from "@/components/utils/clock";
import { TimeRange } from "@/components/utils/time-range";
import {
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import responsive from "@/constants/Responsive";

export default function FinalStepsVet() {
  const navigation = useNavigation();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [clinicName, setclinicName] = useState<string>("");
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
  const { updateVetData } = useAppContext();
  const TimezoneOffsetMs = -new Date().getTimezoneOffset() * 60000;

  const timeSlots = new Array(48).fill(0).map((_, index) => {
    const hour = Math.floor(index / 2) + 24;
    const minutes = index % 2 === 0 ? 0 : 30;
    return new Date(2025, 0, 1, hour, minutes);
  });

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isStartTime, setIsStartTime] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { tempemail, tempphone, tempcountryCode, tempcallingCode } =
    useAppContext();

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

  // shared time state
  const selectedDate = useSharedValue(timeSlots[0].getTime());

  const clockDate = useDerivedValue(() => {
    "worklet";
    return selectedDate.value + TimezoneOffsetMs;
  });

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const padded = (n: number) => (n < 10 ? `0${n}` : n);
    return `${hour12}:${padded(minutes)} ${ampm}`;
  };

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
      clinicName &&
      startTime &&
      endTime &&
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
    clinicName,
    startTime,
    endTime,
    value,
    license,
    email,
    phoneNumber,
    cnic,
    cnicFront,
    cnicBack,
  ]);

  const handlePress = () => {
    updateVetData("firstName", firstName);
    updateVetData("lastName", lastName);
    updateVetData("email", email);
    updateVetData("phoneNumber", `+${callingCode}${phoneNumber}`);
    updateVetData("gender", value);
    updateVetData("cnic", cnic);
    updateVetData("cnicFront", cnicFront);
    updateVetData("cnicBack", cnicBack);
    updateVetData("title", title);
    updateVetData("clinicName", clinicName);
    updateVetData("startTime", startTime);
    updateVetData("endTime", endTime);
    updateVetData("license", license);
    updateVetData("email", email);
    updateVetData("experience", experience);
    updateVetData("callingCode", callingCode);
    updateVetData("countryCode", countryCode);

    setModalVisible(false);
    router.push({
      pathname: "/(finalSteps)/accountCreated",
      params: {
        from: "vet",
      },
    });
  };

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
    {
      key: "title",
      render: () => (
        <>
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
        </>
      ),
    },
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
        </>
      ),
    },
    {
      key: "clinicName",
      render: () => (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Clinic Name</Text>
          </View>
          <TextInput
            placeholder="Pets Clinic"
            style={styles.input}
            placeholderTextColor="#939393"
            autoCapitalize="sentences"
            value={clinicName}
            onChangeText={setclinicName}
          />
        </>
      ),
    },
    {
      key: "clinicTimings",
      render: () => (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Clinic Timings</Text>
          </View>

          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => {
                setIsStartTime(true);
                setShowTimePicker(true);
                selectedDate.value = startTime
                  ? startTime.getTime()
                  : timeSlots[0].getTime();
              }}
            >
              <Text style={styles.label}>Start Time</Text>
              <Text style={styles.timeValue}>
                {startTime ? formatTime(startTime) : "Select"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeBox}
              onPress={() => {
                setIsStartTime(false);
                setShowTimePicker(true);
                selectedDate.value = endTime
                  ? endTime.getTime()
                  : timeSlots[0].getTime();
              }}
            >
              <Text style={styles.label}>End Time</Text>
              <Text style={styles.timeValue}>
                {endTime ? formatTime(endTime) : "Select"}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal visible={showTimePicker} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={{ flexDirection: "row", gap: 40 }}>
                  <Clock date={clockDate} size={100} />
                  <TimeRange
                    dates={timeSlots}
                    onDateChange={(updatedDate: number) => {
                      "worklet";
                      selectedDate.value = updatedDate;
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      const selected = new Date(selectedDate.value);
                      if (isStartTime) setStartTime(selected);
                      else setEndTime(selected);
                      setShowTimePicker(false);
                    }}
                    style={styles.timingContainer}
                  >
                    <Text style={{ color: "#fff" }}>Confirm</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setShowTimePicker(false)}
                    style={styles.timingContainer}
                  >
                    <Text style={{ color: "#fff" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
            </>
          ) : (
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
      key: "experience",
      render: () => (
        <>
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
        </>
      ),
    },
    {
      key: "license",
      render: () => (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.inputHeader}>Vet License</Text>
          </View>
          {renderUploader("license", license)}
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
            maxLength={15}
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
        <Text style={styles.inputNote}>
          We request a picture of your CNIC to ensure the security of your
          account and protect against fraudulent activities and scams. This
          helps us verify your identity and maintain a safe environment for all
          users.
        </Text>
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
        {(!isKeyboardVisible || modalVisible) && (
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
    paddingHorizontal: 20,
    width: "100%",
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
      Platform.OS === "ios" ? responsive.fontSize(9) : responsive.fontSize(7),
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
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 15,
  },
  timeBox: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  timingContainer: {
    marginTop: 15,
    backgroundColor: "#1e1e1e",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  label: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#939393",
    marginBottom: 4,
  },
  timeValue: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 32,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
});
