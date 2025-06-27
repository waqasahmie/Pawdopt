import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "../../components/utils/toast";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

type PetInfoBSProps = {
  onCloseAndOpenModal?: () => void;
  direction?: "vertical" | "horizontal"; 
  category: string;
};

const screenHeight = Dimensions.get("window").height;

export const PetInfoBS = ({ onCloseAndOpenModal, direction = "vertical",category }: PetInfoBSProps) => {
  const { updatePetListingData ,petListingData} = useAppContext();
  const [petName, setPetName] = useState(petListingData.name || "");
  const [age, setAge] = useState(petListingData.age || "");
  const [eyeColor, setEyeColor] = useState(petListingData.eyeColor || "");
  const [weight, setWeight] = useState(petListingData.weight || "");
  const [gender, setGender] = useState(petListingData.gender || "");
  const [price, setPrice] = useState(petListingData.price || "");

  // Gender dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  // Price dropdown
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceItems, setPriceItems] = useState([
    { label: "0 PKR (Free)", value: "0" },
    { label: "5000 PKR", value: "5000" },
  ]);

  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const isParrot = category.toLowerCase() === "parrot";
  const toastRef = useRef<any>({});

  const validateAndSubmit = () => {
    const ageValue = age;

    if (parseFloat(ageValue) < 0.2) {
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
  gender !== "" &&
  price !== "" &&
  (isParrot || (eyeColor !== "" && weight !== ""));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const [fadeAnim] = useState(new Animated.Value(1));

  const handleContinue = () => {
    updatePetListingData("name", petName); 
    updatePetListingData("age", age); 
    updatePetListingData("gender", gender); 
    updatePetListingData("price", price);

    if (!isParrot) {
      updatePetListingData("eyeColor", eyeColor);
      updatePetListingData("weight", weight);
    } 
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onCloseAndOpenModal && onCloseAndOpenModal();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            <Text style={styles.label}>Age <Text style={{ fontSize: Platform.OS === "ios" ? responsive.fontSize(10) : responsive.fontSize(8), color: 'gray' }}>(in years)</Text></Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="2 Years"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {!isParrot && (
        <View style={{ ...styles.inputRow, zIndex: 1000 }}>
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
        )}

        <View style={styles.inputRow}>
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
               dropDownDirection="BOTTOM"
              onOpen={() => Keyboard.dismiss()}
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: "300",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#FDFDFD",
    minHeight: 42, 
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  dropdownContainer: {
    borderColor: "#eee",
  },
  textStyle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
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
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#fff",
    fontWeight: "700",
  },
});
