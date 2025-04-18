import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "../../components/utils/toast";

type PetInfoBSProps = {
  //closeModal: () => void;
  onCloseAndOpenModal?: () => void; // NEW
};

const screenHeight = Dimensions.get("window").height;

export const PetInfoBS = ({ onCloseAndOpenModal }: PetInfoBSProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [weight, setWeight] = useState("");

  // Gender dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  // Price dropdown
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceItems, setPriceItems] = useState([
    { label: "0 PKR (Free)", value: "0" },
    { label: "5000 PKR", value: "5000" },
  ]);

  // Toast reference
  const toastRef = useRef<any>({});

  const validateAndSubmit = () => {
    const ageValue = parseInt(age);

    if (isNaN(ageValue) || ageValue < 2) {
      toastRef.current.show({
        type: "warning",
        title: "Too Early for Adoption",
        description: "must be atleast 2 months old.",
      });
      return false;
    } else {
      return true;
    }
  };

  // Check if all fields are filled
  const isFormValid =
    petName !== "" &&
    age !== "" &&
    eyeColor !== "" &&
    weight !== "" &&
    gender !== "" &&
    price !== "";

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.indicator} />
        <Text style={styles.title}>Pet Details</Text>
        <Text style={styles.subTitle}>
          Enter the details of your pet below.
        </Text>

        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
              style={styles.input}
              value={petName}
              onChangeText={setPetName}
              placeholder="Smokie"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="2 Months"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={{ ...styles.inputRow, zIndex: 1000 }}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={styles.dropdown}
              textStyle={styles.textStyle}
              dropDownContainerStyle={styles.dropdownContainer}
              onOpen={() => Keyboard.dismiss()}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Eye Color</Text>
            <TextInput
              style={styles.input}
              value={eyeColor}
              onChangeText={setEyeColor}
              placeholder="Crystal Blue"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="2 Kg"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Price</Text>
            <DropDownPicker
              open={priceOpen}
              value={price}
              items={priceItems}
              setOpen={setPriceOpen}
              setValue={setPrice}
              setItems={setPriceItems}
              placeholder="Select Price"
              style={styles.dropdown}
              textStyle={styles.textStyle}
              dropDownContainerStyle={styles.dropdownContainer}
              dropDownDirection="BOTTOM"
              onOpen={() => Keyboard.dismiss()}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.ContinueButton,
              { backgroundColor: isFormValid ? "#2BBFFF" : "#ccc" },
            ]}
            onPress={() => {
              if (validateAndSubmit()) {
                handleContinue();
              }
            }}
            disabled={!isFormValid} // Disable button if form is not valid
          >
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <Toast ref={toastRef} />
      </Animated.View>
    </TouchableWithoutFeedback>
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
    paddingBottom: 25,
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "90%",
    zIndex: 10,
  },
  inputBox: {
    width: "45%",
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 2,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: "300",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#FDFDFD",
    minHeight: 42, // Matches the input field height
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  dropdownContainer: {
    borderColor: "#eee",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "300",
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
  },
  ContinueText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
