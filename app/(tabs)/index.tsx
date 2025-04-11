// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ImageBackground } from "react-native";
// import { FontAwesome, AntDesign } from "@expo/vector-icons";

// export default function GetStarted() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
    
//         {/* Top Left Background Image */}
//         <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />
    
//         {/* Bottom Right Background Image */}
//         <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />
    
//         <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />
//         <Text style={styles.title}>Let’s Get Started!</Text>
//         <Text style={styles.subtitle}>Join us and find your new furry friend!</Text>
    
//         <TouchableOpacity style={styles.socialButton}>
//           <FontAwesome name="facebook" size={20} color="#1877F2" style={styles.socialIcon} />
//           <Text style={styles.socialText}>Continue with Facebook</Text>
//         </TouchableOpacity>
    
//         <TouchableOpacity style={styles.socialButton}>
//           <AntDesign name="twitter" size={20} color="#1DA1F2" style={styles.socialIcon} />
//           <Text style={styles.socialText}>Continue with Twitter</Text>
//         </TouchableOpacity>
    
//         <TouchableOpacity style={styles.socialButton}>
//           <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
//           <Text style={styles.socialText}>Continue with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.socialButton}>
//           <AntDesign name="apple1" size={20} color="black" style={styles.socialIcon} />
//           <Text style={styles.socialText}>Continue with Apple</Text>
//         </TouchableOpacity>
    
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={styles.signupButton}>
//             <Text style={styles.signupText}>Sign up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.signinButton}>
//             <Text style={styles.signinText}>Sign in</Text>
//           </TouchableOpacity>
//         </View>
    
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Privacy Policy</Text>
//           <Text style={styles.footerText2}> - </Text>
//           <Text style={styles.footerText}>Terms Of Services</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   pawIcon: {
//     width: 61,
//     height: 63,
//     marginBottom: 10,
//     marginTop: 55,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "700",
//     color: "#000",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 20,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 90, // Change to 50 if needed
//     width: "100%",
//   },
//   socialButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     marginBottom: 15,
//     marginVertical: 5,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.2, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   socialText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//   },
//   socialIcon: {
//     position: "absolute",
//     left: 20, // Icon ko left side fix karne ke liye
//   },
//   signupButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     marginTop: 30,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.1, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   signupText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   signinButton: {
//     backgroundColor: "#E5F1FD",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     marginTop: 20,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.1, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   signinText: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 30,
//     flexDirection: "row",
//     justifyContent: "center",
//     width: "100%",
//   },
//   footerText: {
//     color: "#808080",
//     fontSize: 14,
//   },
//   footerText2: {
//     color: "#808080",
//     marginHorizontal: 20,
//   },
// });




// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { AntDesign, Feather } from "@expo/vector-icons";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function SignInScreen() {
//   const [checked, setChecked] = useState(false);
//   const navigation = useNavigation();
//   const dismissKeyboard = () => Keyboard.dismiss();

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button (Positioned Below Status Bar) */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 10 }} >
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Top Left Background Image */}
//            <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

//            {/* Bottom Right Background Image */}
//            <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

//           {/* Logo Icon */}
//           <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

//           {/* Welcome Text */}
//           <View style={styles.textContainer}>
//             <View style={styles.titleRow}>
//               <Text style={styles.title}>Welcome Back!</Text>
//               <Image source={require("../../assets/images/paws.png")} style={styles.paws} />
//             </View>
//             <Text style={styles.subtitle}>A world of furry possibilities awaits you.</Text>
//           </View>

//           {/* Input Fields */}
//           <TextInput placeholder="Email or Phone number" style={styles.input} placeholderTextColor="#939393" />
//           <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#939393" />

//           <View style={{ width: "90%", alignItems: "flex-end" }}>
//             <TouchableOpacity>
//               <Text style={styles.forgotPassword}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Terms & Conditions Checkbox */}
//           <View style={styles.termsContainer}>
//             <TouchableOpacity style={[styles.checkbox, checked && styles.checkedBox]} onPress={() => setChecked(!checked)} > {checked && <Feather name="check" size={16} color="white" />} </TouchableOpacity>
//             <Text style={styles.termsText}>I agree to Pawdopt <Text style={styles.linkText}>Terms & Conditions</Text></Text>
//           </View>

//           {/* Sign Up Link */}
//           <Text style={styles.signupText}>Don’t have an account? <Text style={styles.linkText}>Sign up</Text></Text>

//           {/* Social Logins */}

//           <View style={styles.orContainer}>
//             <View style={styles.line} />
//             <Text style={styles.orText}>{"   "} or {"   "}</Text>
//             <View style={styles.line} />
//           </View>
          
//           {/* Social Buttons */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={styles.socialButton}>
//               <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
//               <Text style={styles.socialText}>Continue with Google</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.socialButton}>
//               <AntDesign name="apple1" size={20} color="black" style={styles.socialIcon} />
//               <Text style={styles.socialText}>Continue with Apple</Text>
//             </TouchableOpacity>

//             {/* Continue Button */}
//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.continueText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>  
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20,
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   pawIcon: {
//     width: 61,
//     height: 63,
//     marginBottom: 10,
//     marginTop: 25,
//   },
//   textContainer: {
//     alignSelf: "flex-start", // Aligns the container to the left
//     width: "100%", // Ensures full width
//     paddingHorizontal: 15, // Adjust if needed
//   },
//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center", // Align text and icon in one row
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   paws: {
//     width: 24,
//     height: 24,
//     resizeMode: "contain",
//     marginBottom: 15,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 20,
//   },
//   input: {
//     width: "90%",
//     paddingVertical: 15, // Adjust vertical padding
//     borderBottomWidth: 1,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//   },
//   forgotPassword: {
//     color: "#2BBFFF",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   termsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start", // Left align
//     alignSelf: "flex-start", // Ensure it stays on the left
//     marginBottom: 10,
//     marginLeft: 15,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#2BBFFF",
//     marginRight: 10,
//     alignItems: "center", // Center tick horizontally
//     justifyContent: "center", // Center tick vertically
//   },
//   checkedBox: {
//     backgroundColor: "#2BBFFF", // Change background when checked
//     borderColor: "#2BBFFF",
//   },
//   termsText: {
//     color: "#000",
//     fontSize: 14,
//   },
//   linkText: {
//     color: "#2BBFFF",
//   },
//   signupText: {
//     color: "#000",
//     marginTop: 10,
//     marginBottom: 30,
//   },
//   orContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     marginBottom: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#d3d3d3",
//   },
//   orText: {
//     color: "#939393",
//     marginVertical: 10,
//   },
//   socialButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     marginBottom: 15,
//     marginVertical: 5,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.2, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   socialText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//   },
//   socialIcon: {
//     position: "absolute",
//     left: 20, // Icon ko left side fix karne ke liye
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 50, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     marginTop: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });






// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function ForgotPasswordEmailScreen() {
//   const navigation = useNavigation();
//   const dismissKeyboard = () => Keyboard.dismiss();

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button (Positioned Below Status Bar) */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 10 }} >
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Top Left Background Image */}
//            <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

//            {/* Bottom Right Background Image */}
//            <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

//           {/* Logo Icon */}
//           <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

//           {/* Welcome Text */}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>Forgot Your Password?</Text>
//             <Text style={styles.subtitle}>We’ve got you covered. Enter your registered email to reset your password. We will send an OTP code to your email for the next steps.</Text>
//           </View>

//           {/* Input Fields */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>Your Registered Email?</Text>
//           </View>
//           <TextInput placeholder="waqasahmed@gmail.com" style={styles.input} placeholderTextColor="#939393" />

//           <View>
//             <TouchableOpacity>
//               <Text style={styles.mobileNumber}>Use mobile number</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Continue Button */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.continueText}>Send OTP</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   pawIcon: {
//     width: 61,
//     height: 63,
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 30,
//   },
//   inputHeader: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: 500,
//   },
//   input: {
//     width: "100%",
//     padding: 15, // Adjust vertical padding
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//     fontSize: 16,
//   },
//   subsubtitle: {
//     fontSize: 14,
//     color: "#787D7F",
//     marginTop: 5,
//   },
//   mobileNumber: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     marginTop: 15,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });




// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function ForgotPasswordPhoneScreen() {
//   const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
//   const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [visible, setVisible] = useState<boolean>(false);
//   const navigation = useNavigation();

//   const dismissKeyboard = () => Keyboard.dismiss();
  
//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button (Positioned Below Status Bar) */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style = {{ zIndex : 10 }}>
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Top Left Background Image */}
//            <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

//            {/* Bottom Right Background Image */}
//            <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

//           {/* Logo Icon */}
//           <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

//           {/* Welcome Text */}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>Forgot Your Password?</Text>
//             <Text style={styles.subtitle}>We’ve got you covered. Enter your registered phone number to reset your password. We will send an OTP code to your number for the next steps.</Text>
//           </View>

//           {/* Input Fields */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>Your Registered Number?</Text>
//           </View>

//           <View style={styles.InputContainer}>
//             {/* Country Picker Button */}
//             <TouchableOpacity style={styles.countryPicker} onPress={() => setVisible(true)}>
//             <CountryPicker 
//               visible={visible || false}  // Default to false
//               withFilter={true}
//               withFlag={true}
//               withCallingCode={true}
//               withModal={true}
//               countryCode={countryCode || "PK"}  // Default to "PK"
//               onSelect={(country: Country) => {
//                 setCountryCode(country?.cca2 as CountryCode || "PK"); 
//                 setCallingCode(country?.callingCode[0] || "92");
//                 setVisible(false);
//               }}
//               onClose={() => setVisible(false)}
//             />

//               <Text style={styles.callingCode}>+{callingCode} ▼</Text>
//             </TouchableOpacity>
//             {/* Phone Number Input */}
//             <TextInput
//               style={styles.phoneNumberInput} placeholder="Enter phone number" keyboardType="numeric" value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)}
//             />
//           </View>

//           <Text style={styles.subsubtitle}>You will receive an SMS verification that may apply message and data rates.</Text>
//           <View>
//             <TouchableOpacity>
//               <Text style={styles.mobileNumber}>Use email</Text>
//             </TouchableOpacity>
//           </View>
            
//           {/* Continue Button */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.continueText}>Send OTP</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20,
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   pawIcon: {
//     width: 61,
//     height: 63,
//     marginBottom: 10,
//     marginTop: 25,
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 30,
//   },
//   inputHeader: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: 500,
//   },
//   subsubtitle: {
//     fontSize: 14,
//     color: "#787D7F",
//     marginTop: 5,
//   },
//   InputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//   },
//   phoneNumberInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     marginTop: 15,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });






// import React, { useState } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, 
//   Keyboard, TouchableWithoutFeedback
// } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function NewPassword() {
//   const navigation = useNavigation();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
//   const handleConfirmPasswordChange = (text: React.SetStateAction<string>) => setConfirmPassword(text);

//   const passwordsMatch = password === confirmPassword && password.length > 0;

//   const toggleShowPassword = () => setShowPassword(!showPassword);
//   const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

//   const isValidPassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   // Handle keyboard dismiss on tap
//   const dismissKeyboard = () => Keyboard.dismiss();

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Top Left Background Image */}
//           <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

//           {/* Bottom Right Background Image */}
//           <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />

//           {/* Logo Icon */}
//           <Image source={require("../../assets/images/paw.png")} style={styles.pawIcon} />

//           {/* Title & Subtitle */}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>Secure Your Account</Text>
//             <Text style={styles.subtitle}>Almost there! Create a new password for your Pawdopt account to keep it secure. Remember to choose a strong and unique password.</Text>
//           </View>

//           {/* New Password Input */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>New Password</Text>
//           </View>
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Enter password"
//               style={styles.input}
//               placeholderTextColor="#939393"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={handlePasswordChange}
//             />
            
//            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//              <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//            </TouchableOpacity>
//           </View>
//           {/* Error Message */}
//           {!isValidPassword(password) && password.length > 0 && (
//             <Text style={styles.errorText}>Must Contain One Upper Case, Lower Case, Number & Special Character.</Text>
//           )}

//           {/* Confirm Password Input */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>Confirm New Password</Text>
//           </View>
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Enter password"
//               style={styles.input}
//               placeholderTextColor="#939393"
//               secureTextEntry={!showConfirmPassword}
//               value={confirmPassword}
//               onChangeText={handleConfirmPasswordChange}
//             />
//             <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
//               <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//             </TouchableOpacity>
//           </View>
//           {/* Error Message */}
//           {!passwordsMatch && password.length > 0 && (
//             <Text style={styles.errorText}>Confirm Password does not match.</Text>
//           )}

//           {/* Continue Button */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={[styles.continueButton, !passwordsMatch && styles.disabledButton]} disabled={!passwordsMatch}>
//               <Text style={styles.continueText}>Save New Password</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   pawIcon: {
//     width: 61,
//     height: 63,
//     marginBottom: 10,
//     marginTop: 25,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//   },
//   textContainer: {
//     alignSelf: "flex-start",
//     width: "100%",
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 20,
//   },
//   inputHeader: {
//     fontSize: 16,
//     marginTop: 10,
//     marginBottom: 10,
//     fontWeight: "500",
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 15,
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 10,
//     textAlign: "left",
//     width: "100%",
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });







// import React from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// export default function PasswordResetSuccessfully() {

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* Top Left Background Image */}
//        <Image source={require("../../assets/images/PawprintT.png")} style={styles.topLeftImage} />

//        {/* Bottom Right Background Image */}
//        <Image source={require("../../assets/images/PawprintB.png")} style={styles.bottomRightImage} />
      
//       <View style={styles.centerWrapper}>
//         {/* Logo Icon */}
//         <Image source={require("../../assets/images/SuccessTick.png")} style={styles.successIcon} />

//         {/* Success Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>You’re All Set</Text>
//           <Text style={styles.subtitle}>Your password has been successfully changed.</Text>
//         </View>
//       </View>

//       {/* Continue Button */}
//       <View style={styles.bottomContainer}>
//         <TouchableOpacity style={styles.continueButton}>
//           <Text style={styles.continueText}>Go To Homepage</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     height: "100%", // Ensure it takes full screen height
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   centerWrapper: {
//     position: "absolute",
//     top: "50%",
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     transform: [{ translateY: -hp("20%") }], // Adjust to perfect center
//   },
//   successIcon: {
//     width: 102, // Adjust percentage as needed
//     height: 102, // Adjust percentage as needed
//     marginBottom: 10,
//   },
//   textContainer: {
//     alignItems: "center",
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "700",
//     color: "#000",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 10,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });








// import React, { useRef, useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function OTPVerification() {
//   const navigation = useNavigation();
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//   // Handle OTP input changes
//   const handleInputChange = (text: string, index: number) => {
//     if (text.length === 1 && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//   };

//   // Handle Backspace key
//   const handleBackspace = (text: string, index: number) => {
//     if (text === "" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//   };

//   // Handle keyboard dismiss on tap
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 50} // Adjust this value as needed
//       style={styles.container}
//     >
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex : 10}}>
//           <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Change email</Text>
//         </View>

//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Enter authentication code</Text>
//           <Text style={styles.subtitle}>Enter the 4-digit that we have sent via the email  w********e@gmail.com</Text>
//         </View>

//         {/* Input Fields */}
//         <View style={styles.otpContainer}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               style={[styles.otpInput, digit ? styles.filledOtpInput : styles.emptyOtpInput]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={(text) => handleInputChange(text, index)}
//               onKeyPress={({ nativeEvent }) =>
//                 nativeEvent.key === "Backspace" && handleBackspace("", index)
//               }
//             />
//           ))}
//         </View>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={[styles.continueButton, otp.join("").length < 4 && styles.disabledButton]} disabled={otp.join("").length < 4}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.resendContainer}>
//             <Text style={styles.resendText}>Resend code</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20,
//   },
//   navText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#2BBFFF",
//   },
//   textContainer: {
//     width: "100%",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#000",
//     marginBottom: 30,
//     marginTop: 10,
//     textAlign: "center",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 30,
//   },
//   otpInput: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     textAlign: "center",
//     fontSize: 22,
//     borderRadius: 10,
//   },
//   emptyOtpInput: {
//     borderColor: "#d3d3d3",
//     backgroundColor: "#F9F9F9",
//   },
//   filledOtpInput: {
//     borderColor: "#2BBFFF",
//     backgroundColor: "#fff",
//   },
//   bottomContainer: {
//     position: "absolute",
//     width: "100%",
//     bottom: 40,
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   resendContainer: {
//     backgroundColor: "transprent",
//     width: "100%",
//     padding: 15,
//     alignItems: "center",
//   },
//   resendText: {
//     marginTop: 10,
//     color: "#2BBFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   }
// });







// import React, { useState } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Keyboard, TouchableWithoutFeedback, StatusBar, StyleSheet, 
//   KeyboardAvoidingView,
//   Platform
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function SignupEmail() {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState(""); // Store the email input

//   // Handle email input change
//   const handleEmailChange = (text: string) => {
//     setEmail(text);
//   };

//   // Function to check if the entered email is valid
//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
//     return emailRegex.test(email);
//   };

//   // Handle keyboard dismiss on tap
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 50} // Adjust this value as needed
//       style={styles.container}
//     >
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* Progress Bar */}
//         <View style={styles.progressBarContainer}>
//           <View style={styles.emptyHalf} />
//           <View style={styles.progressBar} />
//         </View>

//         {/* Title */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>What’s your email address?</Text>
//         </View>

//         {/* Email Input Field */}
//         <TextInput 
//           placeholder="waqasahmie@gmail.com" 
//           style={styles.input} 
//           placeholderTextColor="#939393"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={handleEmailChange}
//         />

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity 
//             style={[
//               styles.continueButton, 
//               !isValidEmail(email) && styles.disabledButton
//             ]} 
//             disabled={!isValidEmail(email)}
//           >
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.resendContainer}>
//             <Text style={styles.resendText}>Use phone number, instead</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "97%",
//     height: 4,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 2,
//     marginTop: 30,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   emptyHalf: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Keeps the first half empty
//   },
//   progressBar: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "transparent",
//     borderRadius: 2,
//   },
//   textContainer: {
//     width: "100%",
//     marginTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "500",
//     color: "#000",
//     marginBottom: 10,
//   },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     fontSize: 16,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   resendContainer: {
//     width: "100%",
//     padding: 15,
//     alignItems: "center",
//   },
//   resendText: {
//     marginTop: 10,
//     color: "#2BBFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   }
// });








// import React, { useState } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Keyboard, TouchableWithoutFeedback, StatusBar, StyleSheet, 
//   KeyboardAvoidingView,
//   Platform
// } from "react-native";
// import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function SignupPhone() {
//   const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
//   const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [visible, setVisible] = useState<boolean>(false);
//   const navigation = useNavigation();

//   // Function to check if the entered phone number is valid
//   const isValidPhoneNumber = (number: string) => {
//     const phoneRegex = /^[0-9]{7,15}$/; // Allows 7-15 digit numbers
//     return phoneRegex.test(number);
//   };

//   // Handle keyboard dismiss on tap
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 50} // Adjust this value as needed
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.emptyHalf} />
//             <View style={styles.progressBar} />
//           </View>

//           {/* Title */}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>What’s your mobile number?</Text>
//           </View>

//           {/* Phone Input with Country Picker */}
//           <View style={styles.InputContainer}>
//             {/* Country Picker Button */}
//             <TouchableOpacity style={styles.countryPicker} onPress={() => setVisible(true)}>
//               <CountryPicker 
//                 visible={visible}
//                 withFilter={true}
//                 withFlag={true}
//                 withCallingCode={true}
//                 withModal={true}
//                 countryCode={countryCode}
//                 onSelect={(country: Country) => {
//                   setCountryCode(country?.cca2 as CountryCode || "PK");
//                   setCallingCode(country?.callingCode[0] || "92");
//                   setVisible(false);
//                 }}
//                 onClose={() => setVisible(false)}
//               />
//               <Text style={styles.callingCode}>+{callingCode} ▼</Text>
//             </TouchableOpacity>
              
//             {/* Phone Number Input */}
//             <TextInput
//               style={styles.phoneNumberInput}
//               placeholder="Enter phone number"
//               keyboardType="numeric"
//               value={phoneNumber}
//               onChangeText={(text) => setPhoneNumber(text)}
//             />
//           </View>

//           {/* Disclaimer */}
//           <Text style={styles.subsubtitle}>
//             You will receive an SMS verification that may apply message and data rates.
//           </Text>

//           {/* Continue Button */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity 
//               style={[
//                 styles.continueButton, 
//                 !isValidPhoneNumber(phoneNumber) && styles.disabledButton
//               ]} 
//               disabled={!isValidPhoneNumber(phoneNumber)}
//             >
//               <Text style={styles.continueText}>Continue</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.resendContainer}>
//               <Text style={styles.resendText}>Use email, instead</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "97%",
//     height: 4,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 2,
//     marginTop: 30,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   emptyHalf: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Keeps the first half empty
//   },
//   progressBar: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "transparent",
//     borderRadius: 2,
//   },
//   textContainer: {
//     width: "100%",
//     marginTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "500",
//     color: "#000",
//     marginBottom: 10,
//   },
//   subsubtitle: {
//     fontSize: 14,
//     color: "#787D7F",
//     marginTop: 5,
//   },
//   InputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//   },
//   phoneNumberInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     marginTop: 340,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   resendContainer: {
//     width: "100%",
//     padding: 15,
//     alignItems: "center",
//   },
//   resendText: {
//     marginTop: 10,
//     color: "#2BBFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   }
// });






// import React, { useState } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Keyboard, TouchableWithoutFeedback, StatusBar, StyleSheet, KeyboardAvoidingView, Platform 
// } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function SignupCreatePassword() {
//   const navigation = useNavigation();
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
//   const toggleShowPassword = () => setShowPassword(!showPassword);

//   const isValidPassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const dismissKeyboard = () => Keyboard.dismiss();

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 50} // Adjust this value as needed
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.emptyHalf} />
//             <View style={styles.progressBar} />
//           </View>


//           {/* Title */}
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>Create your password.</Text>
//             <Text style={styles.passwordHint}>
//               Must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character.
//             </Text>
//           </View>

//           {/* Password Input Field */}
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Enter password" 
//               style={styles.input} 
//               placeholderTextColor="#939393"
//               secureTextEntry={!showPassword} 
//               value={password}
//               onChangeText={handlePasswordChange}
//             />
//             <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//               <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//             </TouchableOpacity>
//           </View>
//           {/* Error Message */}
//           {!isValidPassword(password) && password.length > 0 && (
//             <Text style={styles.errorText}>Password does not meet requirements</Text>
//           )}

//           {/* Terms & Conditions */}
//           <Text style={[styles.subsubtitle, !isValidPassword(password) && styles.subsubtitleWithError]}>
//             By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
//           </Text>

//           {/* Continue Button Fixed at Bottom */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity 
//               style={[
//                 styles.continueButton, 
//                 !isValidPassword(password) && styles.disabledButton
//               ]} 
//               disabled={!isValidPassword(password)}
//             >
//               <Text style={styles.continueText}>Continue</Text>
//             </TouchableOpacity>
//           </View>

//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "97%",
//     height: 4,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 2,
//     marginTop: 30,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   emptyHalf: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "transparent", // Keeps the first half empty
//   },
//   progressBar: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Second half blue
//     borderRadius: 2,
//   },
//   textContainer: {
//     width: "100%",
//     marginTop: 30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "500",
//     color: "#000",
//     marginBottom: 10,
//   },
//   passwordHint: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 15,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 5,
//     textAlign: "left",
//     width: "100%",
//   },
//   subsubtitle: {
//     fontSize: 14,
//     color: "#000",
//     marginTop: 10,
//   },
//   subsubtitleWithError: {
//     marginTop: 5,
//   },
//   linkText: {
//     color: "#2BBFFF",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });








// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
// } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function RBAC() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar} />
//           </View>

//           <Text style={{ fontSize: 16, color: "#939393" }}>1/4</Text>
//         </View>

//         {/* Top Left Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintT.png")}
//           style={styles.topLeftImage}
//         />

//         {/* Bottom Right Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintB.png")}
//           style={styles.bottomRightImage}
//         />

//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Tell us about yourself</Text>
//           <Text style={styles.subtitle}>
//             Are you a pet owner or organization ready to find loving homes? or a
//             pet adopter looking for a new best friend? or are you a veterinarian
//             dedicated to ensuring the health and well-being of pets?
//           </Text>
//         </View>

//         {/* Role Buttons */}
//         <TouchableOpacity style={styles.roleButton}>
//           <Text style={styles.roleText}>Pet Adopter</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.roleButton}>
//           <Text style={styles.roleText}>Pet Owner</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.roleButton}>
//           <Text style={styles.roleText}>Organization</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.roleButton}>
//           <Text style={styles.roleText}>Veterinarian</Text>
//         </TouchableOpacity>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={styles.continueButton}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     marginBottom: 30,
//     lineHeight: 24, // 1.5 times the font size (16 * 1.5)
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "70%",
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   progressBar: {
//     width: "25%",
//     height: "100%",
//     backgroundColor: "#2BBFFF",
//     borderRadius: 4,
//   },
//   roleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F2FBFF",
//     width: "90%",
//     padding: 18,
//     borderRadius: 30,
//     marginBottom: 15,
//     marginVertical: 5,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.1, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   roleText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2BBFFF",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });








// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
// } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function FindMatch() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar} />
//           </View>
//           <Text style={{ color: "#939393", fontSize: 16 }}>2/4</Text>
//         </View>

//         {/* Top Left Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintT.png")}
//           style={styles.topLeftImage}
//         />

//         {/* Bottom Right Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintB.png")}
//           style={styles.bottomRightImage}
//         />

//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Let’s Find Your Match!</Text>
//           <Text style={styles.subtitle}>
//             What type of animal are you looking to adopt? Don’t worry you can
//             always change this later.
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.categoryButton}>
//           <Text style={styles.categoryText}>A Cat</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.categoryButton}>
//           <Text style={styles.categoryText}>A Dog</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.categoryButton}>
//           <Text style={styles.categoryText}>A Parrot</Text>
//         </TouchableOpacity>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={styles.continueButton}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     lineHeight: 24, // 1.5 times the font size (16 * 1.5)
//     marginBottom: 70,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "70%",
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   progressBar: {
//     width: "50%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Second half blue
//     borderRadius: 4,
//   },
//   categoryButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F2FBFF",
//     width: "90%",
//     padding: 18,
//     borderRadius: 30,
//     marginBottom: 15,
//     marginVertical: 5,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.1, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   categoryText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2BBFFF",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });






// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
// } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// const breeds = [
//   "Persian",
//   "Siamese",
//   "Ragdoll",
//   "Maine Coon",
//   "Scottish Fold",
//   "British Shorthair",
//   "Himalayan",
//   "American Shorthair",
//   "Siberian",
//   "Russian Blue",
//   "Bengal Cat",
//   "Sphynx Cat",
//   "Exotic Shorthair",
// ];

// export default function BreedPreferences() {
//   const navigation = useNavigation();
//   const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

//   const toggleSelection = (breed: string) => {
//     if (selectedBreeds.includes(breed)) {
//       setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
//     } else {
//       setSelectedBreeds([...selectedBreeds, breed]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar} />
//           </View>
//           <Text style={{ color: "#939393", fontSize: 16 }}>3/4</Text>
//         </View>

//         {/* Top Left Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintT.png")}
//           style={styles.topLeftImage}
//         />

//         {/* Bottom Right Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintB.png")}
//           style={styles.bottomRightImage}
//         />

//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Breed Preferences</Text>
//           <Text style={styles.subtitle}>
//             Specify your preferences for the breed of the animal you’d like to
//             adopt. Based on your previous choice. Select all that apply.
//           </Text>
//         </View>

//         {/* Breed Selection */}
//         <View style={styles.breedContainer}>
//           {breeds.map((breed, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.breedButton,
//                 selectedBreeds.includes(breed) && styles.selectedBreedButton,
//               ]}
//               onPress={() => toggleSelection(breed)}
//             >
//               <Text
//                 style={[
//                   styles.breedText,
//                   selectedBreeds.includes(breed) && styles.selectedBreedText,
//                 ]}
//               >
//                 {breed}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={styles.continueButton}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     lineHeight: 24, // 1.5 times the font size (16 * 1.5)
//     marginBottom: 30,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "70%",
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   progressBar: {
//     width: "75%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Second half blue
//     borderRadius: 4,
//   },
//   breedContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "flex-start",
//     width: "100%",
//   },
//   breedButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     borderWidth: 1,
//     borderColor: "#2BBFFF",
//     margin: 5,
//     marginBottom: 10,
//     marginRight: 10,
//   },
//   selectedBreedButton: {
//     backgroundColor: "#2BBFFF",
//   },
//   breedText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#2BBFFF",
//   },
//   selectedBreedText: {
//     color: "#FFFFFF",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });







// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
// import { Ionicons } from "@expo/vector-icons";
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Feather from '@expo/vector-icons/Feather';
// import DropDownPicker from "react-native-dropdown-picker";

// export default function FinalStepsAdopterowner() {
//   const navigation = useNavigation();
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
//   const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [visible, setVisible] = useState<boolean>(false);
//   const [cnic, setCnic] = useState<string>("");
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//     { label: "Others", value: "others" },
//   ]);
//   const [cnicFront, setCnicFront] = useState<string | null>(null);
//   const [cnicBack, setCnicBack] = useState<string | null>(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//   // Validation functions
//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhoneNumber = (number: string) =>
//     /^(?:\d{10,11})$/.test(number);
//   const validateCnic = (cnic: string) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

//   // Auto-format CNIC as user types
//   const formatCnic = (value: string) => {
//     let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
//     if (numericValue.length > 13) numericValue = numericValue.slice(0, 13);

//     if (numericValue.length <= 5) return numericValue;
//     if (numericValue.length <= 12)
//       return `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
//     return `${numericValue.slice(0, 5)}-${numericValue.slice(
//       5,
//       12
//     )}-${numericValue.slice(12)}`;
//   };

//   useEffect(() => {
//     if (
//       firstName &&
//       lastName &&
//       value &&
//       validateEmail(email) &&
//       validatePhoneNumber(phoneNumber) &&
//       validateCnic(cnic) &&
//       cnicFront &&
//       cnicBack
//     ) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   }, [firstName, lastName, value, email, phoneNumber, cnic, cnicFront, cnicBack]);

//   const handleImagePicker = async (side: "front" | "back") => {
//     Alert.alert(
//       `Upload CNIC ${side === "front" ? "Front" : "Back"}`,
//       "Choose an option",
//       [
//         { text: "Take Photo", onPress: () => openCamera(side) },
//         { text: "Choose from Gallery", onPress: () => openGallery(side) },
//         { text: "Cancel", style: "cancel" },
//       ]
//     );
//   };

//   // Open camera
//   const openCamera = async (side: "front" | "back") => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Denied", "Allow camera access to take a photo.");
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       if (side === "front") {
//         setCnicFront(result.assets[0].uri);
//       } else {
//         setCnicBack(result.assets[0].uri);
//       }
//     }
//   };

//   // Open gallery
//   const openGallery = async (side: "front" | "back") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       if (side === "front") {
//         setCnicFront(result.assets[0].uri);
//       } else {
//         setCnicBack(result.assets[0].uri);
//       }
//     }
//   };

//   const renderUploader = (side: "front" | "back", image: string | null) => (
//     <TouchableOpacity
//       style={styles.uploadBox}
//       onPress={() => handleImagePicker(side)}
//     >
//       {image ? (
//         <Image source={{ uri: image }} style={styles.uploadedImage} />
//       ) : (
//         <>
//           <Feather name="upload-cloud" size={22} color="black" />
//           <Text style={styles.uploadText}>
//             Browse or capture the {side === "front" ? "front" : "back"} side of
//             your CNIC.
//           </Text>
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => openCamera(side)}
//             >
//               <Ionicons name="camera" size={18} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => openGallery(side)}
//             >
//               <AntDesign name="plus" size={18} color="white" />
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </TouchableOpacity>
//   );
//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar} />
//           </View>
//           <Text style={{ color: "#939393", fontSize: 16 }}>4/4</Text>
//         </View>
//         {/* Top Left Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintT.png")}
//           style={styles.topLeftImage}
//         />
//         {/* Bottom Right Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintB.png")}
//           style={styles.bottomRightImage}
//         />
//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Final Steps!</Text>
//           <Text style={styles.subtitle}>
//             We’re almost there! Fill in your personal details to create a
//             profile and start your journey towards a responsible Adopter.
//           </Text>
//         </View>
//         <View style={styles.scrollContainer}>
//           <TouchableWithoutFeedback onPress={dismissKeyboard}>
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//               keyboardDismissMode="on-drag"
//             >
//               {/* Input Fields */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>First Name</Text>
//               </View>
//               <TextInput
//                 placeholder="Waqas"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Last Name</Text>
//               </View>
//               <TextInput
//                 placeholder="Ahmed"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//               {/* Email Input Field */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Email</Text>
//               </View>
//               <TextInput
//                 placeholder="waqasahmed@gmail.com"
//                 style={styles.input}
//                 value={email}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="none"
//                 onChangeText={setEmail}
//               />
//               {/* Phone Number Input */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Phone Number</Text>
//               </View>
//               <View style={styles.InputContainer}>
//                 <TouchableOpacity
//                   style={styles.countryPicker}
//                   onPress={() => setVisible(true)}
//                 >
//                   <CountryPicker
//                     visible={visible}
//                     withFilter={true}
//                     withFlag={true}
//                     withCallingCode={true}
//                     withModal={true}
//                     countryCode={countryCode}
//                     onSelect={(country: Country) => {
//                       setCountryCode((country?.cca2 as CountryCode) || "PK");
//                       setCallingCode(country?.callingCode[0] || "92");
//                       setVisible(false);
//                     }}
//                     onClose={() => setVisible(false)}
//                   />
//                   <Text style={styles.callingCode}>+{callingCode} ▼</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.phoneNumberInput}
//                   placeholder="Enter phone number"
//                   placeholderTextColor="#939393"
//                   keyboardType="numeric"
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Gender</Text>
//               </View>
//               <DropDownPicker
//                 listMode="SCROLLVIEW"
//                 open={open}
//                 value={value}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setValue}
//                 setItems={setItems}
//                 placeholder="Select Gender"
//                 style={styles.dropdown}
//                 dropDownContainerStyle={styles.dropdownContainer}
//                 containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
//                 dropDownDirection="BOTTOM"
//               />
//               {/* CNIC Input */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Number</Text>
//               </View>
//               <TextInput
//                 placeholder="Enter CNIC (XXXXX-XXXXXXX-X)"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 keyboardType="numeric"
//                 value={cnic}
//                 onChangeText={(text) => setCnic(formatCnic(text))}
//               />
//               {/* CNIC Front */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Front</Text>
//               </View>
//               {renderUploader("front", cnicFront)}

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Back</Text>
//               </View>
//               {renderUploader("back", cnicBack)}
//               <Text style={styles.inputNote}>
//                 We request a picture of your CNIC to ensure the security of your
//                 account and protect against fraudulent activities and scams.
//                 This helps us verify your identity and maintain a safe
//                 environment for all users.
//               </Text>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </View>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity
//             style={[
//               styles.continueButton,
//               isButtonDisabled && styles.disabledButton,
//             ]}
//             disabled={isButtonDisabled}
//           >
//             <Text style={styles.continueText}>Finish</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//     width: "100%",
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "85%",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     lineHeight: 24, // 1.5 times the font size (16 * 1.5)
//     marginBottom: 30,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "70%",
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   progressBar: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Second half blue
//     borderRadius: 4,
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   inputHeader: {
//     fontSize: 14,
//     marginBottom: 5,
//     fontWeight: 400,
//     marginLeft: 5,
//   },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   inputNote: {
//     color: "#939393",
//     fontSize: 10,
//     marginTop: -10,
//     marginBottom: 30,
//   },
//   InputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//   },
//   phoneNumberInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     marginTop: 15,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     paddingHorizontal: 10, // Padding inside the dropdown box
//     paddingVertical: 8,
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     padding: 10, // Padding inside the dropdown options container
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     width: "100%",
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 15,
//   },
//   uploadText: {
//     color: "#000",
//     textAlign: "center",
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 300,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 10,
//   },
//   button: {
//     width: 30,
//     height: 30,
//     borderRadius: 5,
//     marginTop: 10,
//     backgroundColor: "#2BBFFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   uploadedImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//     resizeMode: "cover",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });









// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Alert,
//   Modal,
//   SafeAreaView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
// import { Ionicons } from "@expo/vector-icons";
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Feather from '@expo/vector-icons/Feather';
// import DropDownPicker from "react-native-dropdown-picker";
// import { WebView } from "react-native-webview";


// export default function FinalStepsVet() {
//   const navigation = useNavigation();
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
//   const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [visible, setVisible] = useState<boolean>(false);
//   const [title, setTitle] = useState<string>("");
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//     { label: "Others", value: "others" },
//   ]);
//   const [experience, setExperience] = useState<string>("");
//   const [license, setLicense] = useState<string | null>(null);
//   const [cnic, setCnic] = useState<string>("");
//   const [cnicFront, setCnicFront] = useState<string | null>(null);
//   const [cnicBack, setCnicBack] = useState<string | null>(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false); // For Cal.com

//   // Validation functions
//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhoneNumber = (number: string) =>
//     /^(?:\d{10,11})$/.test(number);
//   const validateCnic = (cnic: string) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

//   // Auto-format CNIC as user types
//   const formatCnic = (value: string) => {
//     let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
//     if (numericValue.length > 13) numericValue = numericValue.slice(0, 13);

//     if (numericValue.length <= 5) return numericValue;
//     if (numericValue.length <= 12)
//       return `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
//     return `${numericValue.slice(0, 5)}-${numericValue.slice(
//       5,
//       12
//     )}-${numericValue.slice(12)}`;
//   };

//   // Auto-format Title field
//   const formatTitle = (value: string) => {
//     let trimmedValue = value.replace(/\./g, "").trim(); // Remove existing dots and trim spaces
//     if (!trimmedValue) return ""; // Return empty if input is empty
//     return `${trimmedValue}.`;
//   };

//   // Auto-format Experience as user types
//   const formatExperience = (value: string) => {
//     let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
//     let experience = parseInt(numericValue, 10);
    
//     if (isNaN(experience) || experience < 1) return ""; // Reject values 1 or less
    
//     return `${experience} Years`;
//   };

//   useEffect(() => {
//     if (
//       title &&
//       firstName &&
//       value &&
//       license &&
//       validateEmail(email) &&
//       validatePhoneNumber(phoneNumber) &&
//       validateCnic(cnic) &&
//       cnicFront &&
//       cnicBack
//     ) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   }, [title, firstName, value, license, email, phoneNumber, cnic, cnicFront, cnicBack]);

//   const handleImagePicker = async (side: "front" | "back" | "license") => {
//     Alert.alert(
//       `Upload ${side === "front" ? "CNIC Front" :  side == "license" ? "Vet License" : "CNIC Back"}`,
//       "Choose an option",
//       [
//         { text: "Take Photo", onPress: () => openCamera(side) },
//         { text: "Choose from Gallery", onPress: () => openGallery(side) },
//         { text: "Cancel", style: "cancel" },
//       ]
//     );
//   };

//   // Open camera
//   const openCamera = async (side: "front" | "back" | "license") => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Denied", "Allow camera access to take a photo.");
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       if (side === "front") {
//         setCnicFront(result.assets[0].uri);
//       } else if (side === "license") {
//         setLicense(result.assets[0].uri);
//       } else {
//         setCnicBack(result.assets[0].uri);
//       }
//     }
//   };

//   // Open gallery
//   const openGallery = async (side: "front" | "back" | "license") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       if (side === "front") {
//         setCnicFront(result.assets[0].uri);
//       } else if (side === "license") {
//         setLicense(result.assets[0].uri);
//       } else {
//         setCnicBack(result.assets[0].uri);
//       }
//     }
//   };

//   const renderUploader = (side: "front" | "back" | "license", image: string | null) => (
//     <TouchableOpacity
//       style={styles.uploadBox}
//       onPress={() => handleImagePicker(side)}
//     >
//       {image ? (
//         <Image source={{ uri: image }} style={styles.uploadedImage} />
//       ) : (
//         <>
//           <Feather name="upload-cloud" size={22} color="black" />
//           <Text style={styles.uploadText}>
//             Browse or capture {side === "front" ? "the Front side of your CNIC." :  side == "license" ? "your Vet License." : "the Back side of your CNIC."}
//           </Text>
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => openCamera(side)}
//             >
//               <Ionicons name="camera" size={18} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => openGallery(side)}
//             >
//               <AntDesign name="plus" size={18} color="white" />
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </TouchableOpacity>
//   );
//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar} />
//           </View>
//           <Text style={{ color: "#939393", fontSize: 16 }}>4/4</Text>
//         </View>
//         {/* Top Left Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintT.png")}
//           style={styles.topLeftImage}
//         />
//         {/* Bottom Right Background Image */}
//         <Image
//           source={require("../../assets/images/PawprintB.png")}
//           style={styles.bottomRightImage}
//         />
//         {/* Welcome Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Final Steps!</Text>
//           <Text style={styles.subtitle}>
//             We’re almost there! Fill in your personal details to create a
//             profile and start your journey towards a responsible Adopter.
//           </Text>
//         </View>
//         <View style={styles.scrollContainer}>
//           <TouchableWithoutFeedback onPress={dismissKeyboard}>
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//               keyboardDismissMode="on-drag"
//             >
//               {/* Input Fields */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Title</Text>
//               </View>
//               <TextInput
//                 placeholder="Dr."
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={title}
//                 onChangeText={(text) => setTitle(formatTitle(text))}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>First Name</Text>
//               </View>
//               <TextInput
//                 placeholder="Waqas"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>
//                   Last Name <Text style={{ color: "#939393" }}>(Optional)</Text>
//                 </Text>
//               </View>
//               <TextInput
//                 placeholder="Ahmed"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//               {/* Email Input Field */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Email</Text>
//               </View>
//               <TextInput
//                 placeholder="drwaqasahmed@gmail.com"
//                 style={styles.input}
//                 value={email}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="none"
//                 onChangeText={setEmail}
//               />
//               {/* Phone Number Input */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Phone Number</Text>
//               </View>
//               <View style={styles.InputContainer}>
//                 <TouchableOpacity
//                   style={styles.countryPicker}
//                   onPress={() => setVisible(true)}
//                 >
//                   <CountryPicker
//                     visible={visible}
//                     withFilter={true}
//                     withFlag={true}
//                     withCallingCode={true}
//                     withModal={true}
//                     countryCode={countryCode}
//                     onSelect={(country: Country) => {
//                       setCountryCode((country?.cca2 as CountryCode) || "PK");
//                       setCallingCode(country?.callingCode[0] || "92");
//                       setVisible(false);
//                     }}
//                     onClose={() => setVisible(false)}
//                   />
//                   <Text style={styles.callingCode}>+{callingCode} ▼</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.phoneNumberInput}
//                   placeholder="Enter phone number"
//                   placeholderTextColor="#939393"
//                   keyboardType="numeric"
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                 />
//               </View>
//               {/* Gender Dropdown */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Gender</Text>
//               </View>
//               <DropDownPicker
//                 listMode="SCROLLVIEW"
//                 open={open}
//                 value={value}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setValue}
//                 setItems={setItems}
//                 placeholder="Select Gender"
//                 style={styles.dropdown}
//                 dropDownContainerStyle={styles.dropdownContainer}
//                 containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
//                 dropDownDirection="BOTTOM"
//               />
//               {/* Experience Input */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Experience</Text>
//               </View>
//               <TextInput
//                 placeholder="5 Years"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 keyboardType="numeric"
//                 value={experience}
//                 onChangeText={(text) => setExperience(formatExperience(text))}
//               />
//               {/* CNIC Front */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Vet License</Text>
//               </View>
//               {renderUploader("license", license)}
//               {/* CNIC Input */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Number</Text>
//               </View>
//               <TextInput
//                 placeholder="Enter CNIC (XXXXX-XXXXXXX-X)"
//                 style={styles.input}
//                 placeholderTextColor="#939393"
//                 keyboardType="numeric"
//                 maxLength={15}
//                 value={cnic}
//                 onChangeText={(text) => setCnic(formatCnic(text))}
//               />
//               {/* CNIC Front */}
//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Front</Text>
//               </View>
//               {renderUploader("front", cnicFront)}

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>CNIC Back</Text>
//               </View>
//               {renderUploader("back", cnicBack)}
//               <Text style={styles.inputNote}>
//                 We request a picture of your CNIC to ensure the security of your
//                 account and protect against fraudulent activities and scams.
//                 This helps us verify your identity and maintain a safe
//                 environment for all users.
//               </Text>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </View>

//         {/* Continue Button */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity
//             style={[
//               styles.continueButton,
//               isButtonDisabled && styles.disabledButton,
//             ]}
//             disabled={isButtonDisabled}
//             onPress={() => setModalVisible(true)}
//           >
//             <Text style={styles.continueText}>Setup Interview Meeting</Text>
//           </TouchableOpacity>
//           <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
//             {/* <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}> */}
//             <TouchableOpacity
//           style={styles.modalCloseButton}
//           onPress={() => setModalVisible(false)}
//         >
//           <Ionicons name="close" size={22} color="black" />
//         </TouchableOpacity>
//               <WebView
//                 source={{
//                   uri: "https://cal.com/pawdopt/pawdoptvetinterview",
//                 }}
//                 // onNavigationStateChange={(navState) => {
//                 //   if (navState.url.includes("https://cal.com/booking/1YYGGvgmJtcg24Yvf3nmQ2?flag.coep=false&isSuccessBookingPage=true&email=hehe%40gmail.com&eventTypeSlug=15min")) { // Change this based on Cal.com confirmation URL
//                 //     setModalVisible(false);
//                 //     navigation.navigate("");
//                 //   }
//                 // }}
//               />
//             {/* </SafeAreaView> */}
//             {/* <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.modalButtonText}>Close</Text>
//             </TouchableOpacity> */}
//           </Modal>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//     width: "100%",
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "80%",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Back button left & email right
//     width: "100%",
//     marginTop: 20, // To place it below the status bar
//   },
//   topLeftImage: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: wp("90%"),
//     height: hp("40%"),
//     resizeMode: "contain",
//   },
//   bottomRightImage: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: wp("96%"),
//     height: hp("49%"),
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#939393",
//     lineHeight: 24, // 1.5 times the font size (16 * 1.5)
//     marginBottom: 30,
//   },
//   progressBarContainer: {
//     flexDirection: "row", // new
//     width: "70%",
//     height: 8,
//     backgroundColor: "#E0E0E0",
//     borderRadius: 4,
//     overflow: "hidden", // Ensures the border radius is applied correctly
//   },
//   progressBar: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#2BBFFF", // Second half blue
//     borderRadius: 4,
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   inputHeader: {
//     fontSize: 14,
//     marginBottom: 5,
//     fontWeight: 400,
//     marginLeft: 5,
//   },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   inputNote: {
//     color: "#939393",
//     fontSize: 10,
//     marginTop: -10,
//     marginBottom: 30,
//   },
//   InputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//   },
//   phoneNumberInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     marginTop: 15,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     paddingHorizontal: 10, // Padding inside the dropdown box
//     paddingVertical: 8,
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     padding: 10, // Padding inside the dropdown options container
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     width: "100%",
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 15,
//   },
//   uploadText: {
//     color: "#000",
//     textAlign: "center",
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 300,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 10,
//   },
//   button: {
//     width: 30,
//     height: 30,
//     borderRadius: 5,
//     marginTop: 10,
//     backgroundColor: "#2BBFFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   uploadedImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//     resizeMode: "cover",
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalCloseButton: {
//     // backgroundColor: "#2BBFFF",
//     // paddingVertical: 15,
//     // paddingHorizontal: 20,
//     // marginTop: 10,
//     // // bottom: 30,
//     // marginBottom: 30,
//     // borderRadius: 30,
//     // width: "90%",
//     // alignItems: "center",
//     // alignSelf: "center",
//     // justifyContent: "center",
//     position: "absolute",
//     top: 20,
//     right: 20,
//     zIndex: 10,
//     // backgroundColor: "rgba(0,0,0,0.1)",
//     // padding: 10,
//     // borderRadius: 20,
//   },
//   modalButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });






// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Switch } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function NotificationSettings() {
//   const navigation = useNavigation();
  
//   // Create state for each switch
//   const [switches, setSwitches] = useState(Array(7).fill(false));

//   const toggleSwitch = (index: number) => {
//     setSwitches(prevState => {
//       const updatedSwitches = [...prevState];
//       updatedSwitches[index] = !updatedSwitches[index];
//       return updatedSwitches;
//     });
//   };

//   const toggleButtons = [
//     "Security Alerts",
//     "Shelter Updates",
//     "Event Reminders",
//     "Adoption Updates",
//     "General App Updates",
//     "App Tips and Tutorials",
//     "Important Announcements",
//   ]

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Notification & Privacy</Text>
//         </View>

//         {/* Toggle Text & Switch Components */}
//         {toggleButtons.map((label, index) => (
//           <View key={index} style={styles.toggleContainer}>
//             <Text style={styles.toggleText}>{label}</Text>
//             <Switch
//               onValueChange={() => toggleSwitch(index)}
//               value={switches[index]}
//               trackColor={{ true: "#2BBFFF" }}
//             />
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 20,
//   },
//   toggleText: {
//     fontSize: 22,
//     fontWeight: "400",
//     color: "#000",
//     width: "80%",
//   },
// });








// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Switch,
//   Pressable,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Ionicons } from "@expo/vector-icons";

// export default function SecuritySettings() {
//   const navigation = useNavigation();

//   // Create state for each switch
//   const [switchValue, setswitchValue] = useState(false);

//   const toggleSwitch = (value: boolean | ((prevState: boolean) => boolean)) => {
//     setswitchValue(value);
//   };

//   const settingOptions = [
//     {
//       title: "Change Password",
//       subtitle: "Need a new password? Change it in a few steps",
//     },
//     {
//       title: "Ad preferences",
//       subtitle: "Manage your ad personalization settings. Tailor your ad experience",
//     },
//     {
//       title: "Data Usage",
//       subtitle: "Control how your data is used for analytics. Customize your preferences",
//     },
//     {
//       title: "Download my data",
//       subtitle: "Request a copy of your data. Your information, your control",
//     },
//     {
//       title: "Deactivate Account",
//       subtitle: "Temporarily deactivate your account. Easily activate when you’re ready",
//     },
//     {
//       title: "Delete Account",
//       subtitle: "Permanently delete your account and data. Proceed with caution",
//       isLast: true,
//     },
//   ]  

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Account & Security</Text>
//         </View>

//         {/* Toggle Text & Toggle Switch */}
//         <View style={styles.toggleContainer}>
//           <Text style={styles.toggleText}>Two-Factor Authentication</Text>
//           <Switch
//             onValueChange={toggleSwitch}
//             value={switchValue}
//             trackColor={{ true: "#2BBFFF" }} // Change track color
//           />
//         </View>

//         {/* Settings Cards */}
//         {settingOptions.map((item, index) => (
//           <Pressable key={index} style={styles.cardContainer}>
//             <View>
//               <Text style={[ styles.cardTitle, item.isLast && { color: "red"},]}>{item.title}</Text>
//               <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
//             </View>
//               <Ionicons
//                 name="chevron-forward"
//                 size={20}
//                 color="#000"
//                 style={{ marginRight: 15 }}
//               />
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 20,
//   },
//   toggleText: {
//     fontSize: 22,
//     fontWeight: "400",
//     color: "#000",
//     width: "80%",
//   },
//   cardContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     marginBottom: 20,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: "400",
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     fontWeight: 300,
//     color: "#939393",
//     marginTop: 10,
//     width: 260,
//     lineHeight: 14 * 1.5,
//   },
// });






// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   TouchableWithoutFeedback,
//   TextInput,
//   Keyboard,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import CountryPicker, {
//   Country,
//   CountryCode,
// } from "react-native-country-picker-modal";
// import DropDownPicker from "react-native-dropdown-picker";
// import * as ImagePicker from "expo-image-picker";

// export default function ProfileScreen() {
//   const navigation = useNavigation();
//   const dismissKeyboard = () => Keyboard.dismiss();

//   const [initialUser, setInitialUser] = useState({
//     firstName: "Waqas",
//     lastName: "Ahmed",
//     email: "waqasahmed@gmail.com",
//     phoneNumber: "3147544535",
//     gender: "male",
//     cnic: "32304-9995584-3",
//     countryCode: "PK",
//     callingCode: "92",
//   });

//   const [user, setUser] = useState(initialUser);

//   const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
//   const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
//   const [visible, setVisible] = useState<boolean>(false);
//   const [open, setOpen] = useState(false);
//   const [gender, setGender] = useState(user.gender);
//   const [items, setItems] = useState([
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//     { label: "Others", value: "others" },
//   ]);

//   // Validation functions
//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhoneNumber = (number: string) =>
//     /^(?:\d{10,11})$/.test(number);

//   const [isUpdated, setIsUpdated] = useState(false);

//   useEffect(() => {
//     const emailValid = validateEmail(user.email);
//     const phoneValid = validatePhoneNumber(user.phoneNumber);

//     const firstNameChanged = user.firstName !== initialUser.firstName;
//     const lastNameChanged = user.lastName !== initialUser.lastName;
//     const emailChanged = user.email !== initialUser.email;
//     const phoneChanged = user.phoneNumber !== initialUser.phoneNumber;
//     const genderChanged = gender !== initialUser.gender;
//     const countryChanged = countryCode !== initialUser.countryCode;
//     const callingChanged = callingCode !== initialUser.callingCode;

//     // Check if any change is made
//     const hasChanges =
//       firstNameChanged ||
//       lastNameChanged ||
//       genderChanged ||
//       countryChanged ||
//       callingChanged ||
//       emailChanged ||
//       phoneChanged;

//     // Check if the update is valid
//     const hasValidUpdate =
//       hasChanges &&
//       (!emailChanged || emailValid) &&
//       (!phoneChanged || phoneValid);

//     setIsUpdated(hasValidUpdate);
//   }, [user, gender, countryCode, callingCode]);

//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const handleImagePicker = async () => {
//     Alert.alert("Change Profile Picture", "Choose an option", [
//       { text: "Take Photo", onPress: openCamera },
//       { text: "Choose from Gallery", onPress: openGallery },
//       { text: "Cancel", style: "cancel" },
//     ]);
//   };

//   // Open camera
//   const openCamera = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Denied", "Allow camera access to take a photo.");
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri); // Update profile picture
//     }
//   };

//   // Open gallery
//   const openGallery = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri); // Update profile picture
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>My Profile</Text>
//         </View>

//         <View style={styles.profileContainer}>
//           <Image
//             source={
//               profileImage
//                 ? { uri: profileImage }
//                 : require("../../assets/images/avatar.png")
//             }
//             style={styles.avatar}
//           />

//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={handleImagePicker}
//           >
//             <Image
//               source={require("../../assets/images/edit.png")}
//               style={styles.editicon}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.scrollContainer}>
//           <TouchableWithoutFeedback onPress={dismissKeyboard}>
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//               keyboardDismissMode="on-drag"
//             >
//               <View style={[styles.textContainer, { paddingTop: 26 }]}>
//                 <Text style={styles.inputHeader}>First Name</Text>
//               </View>
//               <TextInput
//                 style={styles.input}
//                 autoCapitalize="sentences"
//                 value={user.firstName}
//                 onChangeText={(text) => {
//                   setUser({ ...user, firstName: text });
//                   setIsUpdated(true);
//                 }}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Last Name</Text>
//               </View>
//               <TextInput
//                 style={styles.input}
//                 value={user.lastName}
//                 autoCapitalize="sentences"
//                 onChangeText={(text) => {
//                   setUser({ ...user, lastName: text });
//                   setIsUpdated(true);
//                 }}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Email</Text>
//               </View>
//               <TextInput
//                 style={styles.input}
//                 value={user.email}
//                 keyboardType="email-address"
//                 onChangeText={(text) => {
//                   setUser({ ...user, email: text });
//                   setIsUpdated(true);
//                 }}
//               />

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Phone Number</Text>
//               </View>
//               <View style={styles.InputContainer}>
//                 <TouchableOpacity
//                   style={styles.countryPicker}
//                   onPress={() => setVisible(true)}
//                 >
//                   <CountryPicker
//                     visible={visible}
//                     withFilter={true}
//                     withFlag={true}
//                     withCallingCode={true}
//                     withModal={true}
//                     countryCode={countryCode}
//                     onSelect={(country: Country) => {
//                       setCountryCode((country?.cca2 as CountryCode) || "PK");
//                       setCallingCode(country?.callingCode[0] || "92");
//                       setVisible(false);
//                       setIsUpdated(true);
//                     }}
//                     onClose={() => setVisible(false)}
//                   />
//                   <Text style={styles.callingCode}>+{callingCode} ▼</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.phoneNumberInput}
//                   value={user.phoneNumber}
//                   keyboardType="numeric"
//                   maxLength={11}
//                   onChangeText={(text) => {
//                     setUser({ ...user, phoneNumber: text });
//                     setIsUpdated(true);
//                   }}
//                 />
//               </View>

//               <View style={styles.textContainer}>
//                 <Text style={styles.inputHeader}>Gender</Text>
//               </View>
//               <DropDownPicker
//                 listMode="SCROLLVIEW"
//                 open={open}
//                 value={gender}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setGender}
//                 onChangeValue={() => {
//                   setIsUpdated(true); // Mark the form as updated
//                 }}
//                 setItems={setItems}
//                 style={styles.dropdown}
//                 dropDownContainerStyle={styles.dropdownContainer}
//                 containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
//                 dropDownDirection="BOTTOM"
//               />
//               <View style={{marginBottom: 50}}>
//                 <View style={styles.textContainer}>
//                   <Text style={styles.inputHeader}>CNIC Number</Text>
//                 </View>
//                 <TextInput
//                   style={[
//                     styles.input,
//                     {
//                       backgroundColor: "#F6F6F6",
//                       color: "#ABABAB",
//                       borderColor: "#e3e5e5",
//                     },
//                   ]}
//                   value={user.cnic}
//                   editable={false}
//                   selectTextOnFocus={false}
//                 />
//               </View>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </View>

//         {isUpdated && (
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity
//               style={styles.continueButton}
//               onPress={() => {
//                 Keyboard.dismiss();
//                 setUser((prevUser) => {
//                   const updatedUser = { ...prevUser, gender };
//                   setInitialUser(updatedUser); // Update initialUser
//                   return updatedUser;
//                 });
//                 setIsUpdated(false);
//               }}
//             >
//               <Text style={styles.continueText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   profileContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 15,
//   },
//   avatar: {
//     width: 135,
//     height: 135,
//     alignSelf: "center",
//     borderRadius: 100,
//     marginRight: 15,
//   },
//   editButton: {
//     position: "absolute",
//     width: 17,
//     height: 17,
//     bottom: 10,
//     right: 28,
//     backgroundColor: "#2bbfff",
//     borderRadius: 4,
//     padding: 6,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   editicon: {
//     width: 11,
//     height: 11,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "85%",
//   },
//   textContainer: {
//     width: "100%", // Ensures full width
//   },
//   inputHeader: {
//     fontSize: 14,
//     marginBottom: 5,
//     fontWeight: 400,
//     marginLeft: 5,
//   },
//   input: {
//     width: "100%",
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   InputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     backgroundColor: "#fff",
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   callingCode: {
//     fontSize: 16,
//   },
//   phoneNumberInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   mobileNumber: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     marginTop: 15,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     paddingHorizontal: 10, // Padding inside the dropdown box
//     paddingVertical: 8,
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     borderRadius: 8,
//     padding: 10, // Padding inside the dropdown options container
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });








// import React, { useRef, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Image, Animated } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
// import * as Haptics from "expo-haptics";
// import Toast from '../../components/utils/toast';

// export default function MyListings() {
//   const toastRef = useRef<any>({});
//   const navigation = useNavigation();
//   const [listings, setListings] = useState([
//     { id: 1, petType: "Maine Coon", name: "Smokey", gender: require("../../assets/images/male.png"), image: require("../../assets/images/mainecoon.jpg") },
//     { id: 2, petType: "Macaw", name: "Lily", gender: require("../../assets/images/female.png"), image: require("../../assets/images/macaw.jpg") },
//     { id: 3, petType: "Golden Ret.", name: "Lucy", gender: require("../../assets/images/female.png"), image: require("../../assets/images/goldenretriever.jpg") },
//     { id: 4, petType: "British Short.", name: "Raya", gender: require("../../assets/images/male.png"), image: require("../../assets/images/britishshorthair.jpg") },
//     { id: 5, petType: "Cockatoo", name: "Smiley", gender: require("../../assets/images/female.png"), image: require("../../assets/images/cockatoo.jpg") },
//     { id: 6, petType: "Ragdoll", name: "Leo", gender: require("../../assets/images/male.png"), image: require("../../assets/images/ragdoll.jpg") },
//     { id: 7, petType: "Samoyed", name: "Frosty", gender: require("../../assets/images/male.png"), image: require("../../assets/images/samoyed.jpg") },
//     { id: 8, petType: "African Grey", name: "Gizmo", gender: require("../../assets/images/female.png"), image: require("../../assets/images/africangrey.jpg") },
//     { id: 9, petType: "Persian", name: "Abby", gender: require("../../assets/images/female.png"), image: require("../../assets/images/persian.jpg") },
//   ]);

//   // Function to delete an item
//   const deleteItem = (id: number, petName: string) => {
//     setListings(listings.filter((item) => item.id !== id));

    // toastRef.current.show({
    //   type: 'success',
    //   title: 'Successfully Deleted',
    //   description: `${petName} has been removed.`,
    // });

//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
//   };

//   // Render the delete button
//   const renderRightActions = (id: number, petName: string, progress: Animated.AnimatedInterpolation<string | number>) => {
//     const opacity = progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     });

//     return (
//       <TouchableOpacity
//         onPress={() => deleteItem(id, petName)}
//         style={styles.deleteButton}
//         >
//         <Animated.Text style={[styles.deleteText, { opacity }]}>Delete</Animated.Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>My Listings</Text>
//         </View>

//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
//           {listings.map((item) => (
//             <Swipeable key={item.id} renderRightActions={(progress) => renderRightActions(item.id, item.name, progress)} onSwipeableWillOpen={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
//               <View style={styles.listingCard}>
//                 <Image source={item.image} style={styles.petImage} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.petType}>{item.petType}</Text>
//                   <View style={styles.nameGender}>
//                     <Text style={styles.petName}>{item.name}</Text>
//                     <Image source={item.gender} style={styles.genderIcon} />
//                   </View>
//                 </View>
//                 <Image source={require("../../assets/images/editListing.png")} style={styles.editlistingIcon} />
//               </View>
//             </Swipeable>
//           ))}
//         </ScrollView>
//       </View>
//       <Toast ref={toastRef} />
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   listingCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     marginBottom: 15,
//     padding: 7,
//     width: "100%",
//   },
//   petImage: {
//     width: 73,
//     height: 73,
//     borderRadius: 8,
//     marginRight: 15,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   petType: {
//     fontFamily:"JUST Sans Outline ExBold",
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#AAAAAA",
//     marginBottom: 10,
//   },
//   nameGender: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   petName: {
//     fontSize: 16,
//     color: "#ACACAC",
//     fontWeight: "600",
//   },
//   genderIcon: {
//     width: 14,
//     height: 14,
//     marginLeft: 8,
//     marginTop: 2,
//     resizeMode: "contain",
//   },
//   editlistingIcon: {
//     width: 16,
//     height: 16,
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 60,
//     height: "85%",
//     borderRadius: 15,
//     marginLeft: 5,
//   },
//   deleteText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });





// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Feather } from "@expo/vector-icons";

// export default function DeleteAccount() {
//   const navigation = useNavigation();
//   const dismissKeyboard = () => Keyboard.dismiss();
//   const [checked, setChecked] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Delete Account</Text>
//         </View>
//       </View>

//       <View style={styles.line} />

//       <View style={styles.innerContainer}>
//         <View style={styles.scrollContainer}>
//           <TouchableWithoutFeedback onPress={dismissKeyboard}>
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//               keyboardDismissMode="on-drag"
//             >
//               <Text style={styles.Title}>
//                 Are you sure you want to delete your account?
//               </Text>
//               <Text style={styles.Subtitle}>If you delete your account:</Text>
//               <View style={styles.infoContainer}>
//                 <View style={styles.infoTextContainer}>
//                   <Image
//                     source={require("../../assets/images/bookmark.png")}
//                     style={{ width: 15, height: 18.74, marginRight: 24 }}
//                   />
//                   <Text style={styles.Subsubtitle}>
//                     All your saved preferences, pet profiles, and adoption
//                     history will be permanently deleted.
//                   </Text>
//                 </View>
//                 <View style={styles.infoTextContainer}>
//                   <Image
//                     source={require("../../assets/images/Adoption icon.png")}
//                     style={{ width: 20, height: 20, marginRight: 20 }}
//                   />
//                   <Text style={styles.Subsubtitle}>
//                     You won’t be able to view or manage your ongoing adoption
//                     requests or updates from shelters.
//                   </Text>
//                 </View>
//                 <View style={styles.infoTextContainer}>
//                   <Image
//                     source={require("../../assets/images/info-link.png")}
//                     style={{ width: 18, height: 18, marginRight: 22 }}
//                   />
//                   <Text style={styles.Subsubtitle}>
//                     Any linked accounts or notifications from adoption centers
//                     will be disconnected.
//                   </Text>
//                 </View>
//               </View>
//               <View>
//                 <Text style={[styles.Subsubtitle, styles.infoPara]}>
//                   Once you delete your account, you’ll be logged out
//                   immediately. If you are logged into the Pawdopt platform on
//                   other devices, it may take a few minutes for the session to
//                   expire.
//                 </Text>
//                 <Text style={styles.Subsubtitle}>
//                   For assistance with account deletion or accessing previous
//                   adoption records, please contact.
//                 </Text>
//                 <Text
//                   style={[
//                     styles.Subsubtitle,
//                     styles.infoPara,
//                     { color: "#2bbfff" },
//                   ]}
//                 >
//                   support@pawdopt.com
//                 </Text>
//                 <Text style={[styles.Subsubtitle, styles.infoPara]}>
//                   If you change your mind you can always come back and open a
//                   new account with us.
//                 </Text>
//                 <Text style={[styles.Subtitle, styles.infoPara]}>
//                   Are you sure you want to delete your account? (This can’t be
//                   undone)
//                 </Text>
//                 <View style={styles.checkContainer}>
//                   <TouchableOpacity
//                     style={[styles.checkbox, checked && styles.checkedBox]}
//                     onPress={() => setChecked(!checked)}
//                   >
//                     {" "}
//                     {checked && (
//                       <Feather name="check" size={20} color="white" />
//                     )}{" "}
//                   </TouchableOpacity>
//                   <Text style={[styles.Subtitle, styles.infoPara]}>
//                     Yes, I want to delete my account.
//                   </Text>
//                 </View>
//                 <Text style={styles.inputNote}>
//                   After you submit your request, we will disable your account.
//                   It may take up to 30 days to fully delete and remove all of
//                   your data.
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.deleteButton,
//                   { backgroundColor: checked ? "#2bbfff" : "#E3E5E5" },
//                 ]}
//                 disabled={!checked}
//               >
//                 <Text
//                   style={[
//                     styles.deleteText,
//                     { color: checked ? "#fff" : "#939393" },
//                   ]}
//                 >
//                   Delete My Account
//                 </Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </TouchableWithoutFeedback>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "22%",
//   },

//   Title: {
//     fontSize: 24,
//     fontWeight: "500",
//     marginTop: 20,
//     marginBottom: 18,
//   },
//   Subtitle: {
//     fontSize: 18,
//     fontWeight: "500",
//   },
//   Subsubtitle: {
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   infoContainer: {
//     width: "100%", // Ensures full width
//     marginVertical: 18,
//   },
//   infoTextContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     padding: 5,
//   },
//   infoPara: {
//     width: "100%", // Ensures full width
//     marginBottom: 16,
//   },
//   checkContainer: {
//     flexDirection: "row",
//     width: "90%",
//     marginBottom: 10,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: "#2BBFFF",
//     marginRight: 10,
//     alignItems: "center", // Center tick horizontally
//     justifyContent: "center", // Center tick vertically
//   },
//   checkedBox: {
//     backgroundColor: "#2BBFFF", // Change background when checked
//     borderColor: "#2BBFFF",
//   },
//   inputNote: {
//     color: "#939393",
//     fontSize: 10,
//     marginTop: -10,
//   },
//   deleteButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     marginVertical: 20,
//     shadowColor: "#000", // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
//     shadowOpacity: 0.1, // Adjust shadow visibility
//     shadowRadius: 4, // Blur effect for shadow
//     elevation: 3, // For Android shadow
//   },
//   deleteText: {
//     color: "#2BBFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   line: {
//     height: 1,
//     width: "100%",
//     backgroundColor: "#F0F0F0",
//   },
// });







// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   Pressable,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function NotificationScreen() {
//   const navigation = useNavigation();

//   const [readNotifications, setReadNotifications] = useState<{ [key: string]: boolean }>({});

//   const handlePress = (id: string) => {
//     setReadNotifications((prev) => ({ ...prev, [id]: true }));
//   };

//   const notifications = [
//     {
//       id: "1",
//       title: "New device login reminder\n",
//       description:
//         "We noticed that your Pawdopt account aleyshaamir@gmail.com was logged in on a new device on 01/08/25, 10:30 PM. To ensure the security of your account, we send you this notification as a reminder.\nLogin details:\n• Device type: Android\n• Login time: 08/01/25, 7:06 PM\nIf this login was you, please ignore this notification.\n",
//       timestamp: "08-01 19:06",
//     },
//     {
//       id: "2",
//       title: "One-time verification code.\n",
//       description:
//         "You requested a verification code to link your account.\nVerification code: 987654\nIf you didn’t request this, please contact support immediately.\n",
//       timestamp: "20-12 2:30",
//     },
//     {
//       id: "3",
//       title: "Upcoming appointment reminder\n",
//       description:
//         "You have an appointment scheduled with Dr. John Smith on 08/12/25, 05:06 PM.\nLocation: HealthCare Center, Block A.\nPlease arrive 10 minutes early.\n",
//       timestamp: "08-12 17:06",
//     },
//     {
//       id: "4",
//       title: "New pet alert in your area!\n",
//       description:
//         "A Labrador Retriever is available for adoption near your location!\nDistance: 2.5 km\nCheck it out on the Pawdopt app.\n",
//       timestamp: "15-12 12:09",
//     },
//     {
//       id: "5",
//       title: "Updated map details available.\n",
//       description:
//         "New vet clinics and shelters have been added to the map. Open the app to explore updated locations near you.\n",
//       timestamp: "28-11 20:02",
//     },
//     {
//       id: "6",
//       title: "Password successfully updated\n",
//       description:
//         "You have successfully updated your Pawdopt account password on 28/11/25, 10:06 PM.\nIf you did not make this change, please reset your password immediately.\n",
//       timestamp: "28-11 22:06",
//     },
//     {
//       id: "7",
//       title: "Adoption request approved\n",
//       description:
//         "Congratulations! Your request to adopt Bella (Golden Retriever) has been approved.\nPlease contact the shelter within 3 days to complete the adoption process.\n",
//       timestamp: "03-11 11:16",
//     },
//     {
//       id: "8",
//       title: "You've arrived at your destination\n",
//       description:
//         "Welcome to City Vet Clinic! Tap to check in or navigate back using Pawdopt.\n",
//       timestamp: "28-10 14:26",
//     },
//     {
//       id: "9",
//       title: "Volunteer with us!\n",
//       description:
//         "We’re looking for volunteers for our upcoming adoption drive on 22/10/25. Sign up in the app to join.\n",
//       timestamp: "22-10 13:26",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Notifications</Text>
//         </View>
//         <View style={styles.scrollContainer}>

//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {notifications.map((item, index) => {
//           const isRead = readNotifications[item.id];
//           return (
//             <View key={item.id}>
//               <Pressable style={styles.notificationItems} onPress={() => handlePress(item.id)}>
//                 <View style={[styles.dot, isRead && { backgroundColor: "#acacac" }]} />
//                 <View>
//                   <Text style={[styles.title, isRead && { color: "#acacac" }]}>{item.title}</Text>
//                   <Text style={[styles.description, isRead && { color: "#acacac" }]}>{item.description}</Text>
//                   <Text style={[styles.timestamp,isRead && { color: "#acacac" }]}>{item.timestamp}</Text>
//                 </View>
//               </Pressable>
//               {index !== notifications.length - 1 && <View style={styles.line} />}
//             </View>
//           );
//         })}
//         </ScrollView>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 20,
//   },
  // navText: {
  //   fontSize: 24,
  //   fontWeight: "500",
  //   color: "#000",
  //   position: "absolute",
  //   textAlign: "center",
  //   left: 0,
  //   right: 0,
  // },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "25%",
//     marginTop: 10,
//   },
//   notificationItems: {
//     flexDirection: "row",
//     paddingVertical: 14,
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 6,
//     backgroundColor: "#2bbfff",
//     marginRight: 12,
//     marginTop: 4,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 500,
//     marginBottom: 4,
//   },
//   description: {
//     fontSize: 12,
//     fontWeight: 300,
//     lineHeight: 12*1.5,
//   },
//   timestamp: {
//     fontSize: 14,
//     fontWeight: 300,
//     marginTop: 4,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     width: "100%",
//     backgroundColor: "#F0F0F0",
//   },
// });








// import React, { useState } from "react";
// import { 
//   View, Image, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, 
//   Keyboard, TouchableWithoutFeedback, Alert
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// export default function changePassword() {
//   const navigation = useNavigation();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleCurrentPasswordChange = (text: React.SetStateAction<string>) => setCurrentPassword(text);
//   const handlePasswordChange = (text: React.SetStateAction<string>) => setPassword(text);
//   const handleConfirmPasswordChange = (text: React.SetStateAction<string>) => setConfirmPassword(text);

//   const passwordsMatch = password === confirmPassword && password.length > 0;
//   const emptyCurrentPassword = currentPassword.length > 0;

//   const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
//   const toggleShowPassword = () => setShowPassword(!showPassword);
//   const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

//   const isValidPassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   // Simulating the actual current password stored in the system
//   const storedPassword = "CurrentPass123!";  // Replace with actual backend verification
//   const handleSavePassword = () => {
//     if (currentPassword !== storedPassword) {
//       Alert.alert("Incorrect Password", "Your current password is incorrect. Try again, or reset your password to get back in.");
//       return;
//     }
//   };  

//   const dismissKeyboard = () => Keyboard.dismiss();

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={dismissKeyboard}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="dark-content" />

//           {/* Back Button */}
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
//               <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.navText}>Change Password</Text>
//           </View>

//           {/* Current Password Input */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>Current Password</Text>
//           </View>
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Enter current password"
//               style={styles.input}
//               placeholderTextColor="#939393"
//               secureTextEntry={!showCurrentPassword}
//               value={currentPassword}
//               onChangeText={handleCurrentPasswordChange}
//             />
//             <TouchableOpacity onPress={toggleShowCurrentPassword} style={styles.eyeIcon}>
//               <MaterialIcons name={showCurrentPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//             </TouchableOpacity>
//           </View>

//           {/* New Password Input */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>New Password</Text>
//           </View>
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Enter new password"
//               style={styles.input}
//               placeholderTextColor="#939393"
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={handlePasswordChange}
//             />
//             <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
//               <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//             </TouchableOpacity>
//           </View>
//           {!isValidPassword(password) && password.length > 0 && (
//             <Text style={styles.errorText}>Must Contain One Upper Case, Lower Case, Number & Special Character.</Text>
//           )}

//           {/* Confirm Password Input */}
//           <View style={styles.textContainer}>
//             <Text style={styles.inputHeader}>Confirm New Password</Text>
//           </View>
//           <View style={styles.inputWrapper}>
//             <TextInput 
//               placeholder="Confirm new password"
//               style={styles.input}
//               placeholderTextColor="#939393"
//               secureTextEntry={!showConfirmPassword}
//               value={confirmPassword}
//               onChangeText={handleConfirmPasswordChange}
//             />
//             <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
//               <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={18} color="#939393" />
//             </TouchableOpacity>
//           </View>
//           {!passwordsMatch && password.length > 0 && (
//             <Text style={styles.errorText}>Confirm Password does not match.</Text>
//           )}

//           <View style={{ width: "100%", alignItems: "flex-end" }}>
//             <TouchableOpacity>
//               <Text style={styles.forgotPassword}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//             <View style={styles.noteContainer}>
//               <Image source={require("../../assets/images/noteExclaimation.png")} style={styles.noteIcon} />
//               <Text style={styles.noteText}>Avoid using spaces, your name, email, or passwords
//               you have used before.</Text>
//             </View>

//           {/* Continue Button */}
//           <View style={styles.bottomContainer}>
//             <TouchableOpacity style={[styles.continueButton, (!passwordsMatch || !emptyCurrentPassword) && styles.disabledButton]} disabled={!passwordsMatch} onPress={handleSavePassword}>
//               <Text style={styles.continueText}>Save New Password</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   textContainer: {
//     alignSelf: "flex-start",
//     width: "100%",
//   },
//   inputHeader: {
//     fontSize: 14,
//     marginTop: 10,
//     marginBottom: 10,
//     fontWeight: "400",
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: "#d3d3d3",
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     padding: 15,
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 10,
//     textAlign: "left",
//     width: "100%",
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//   },
//   forgotPassword: {
//     color: "#2BBFFF",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   noteContainer: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderRadius: 15,
//     borderColor: "#d3d3d3",
//     width: "95%",
//     alignItems: "center",
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     marginTop: 30,
//   },
//   noteIcon: {
//     height: 16,
//     width: 16,
//   },
//   noteText: {
//     fontSize: 12,
//     lineHeight: 10 * 1.5,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   continueButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
//   continueText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });






// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   TextInput,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   ScrollView,
// } from "react-native";
// import { Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// export default function Payment() {
//   const navigation = useNavigation();
//   const [rating, setRating] = useState(0);
//   const starImages = [
//     require("../../assets/images/poor.png"),
//     require("../../assets/images/better.png"),
//     require("../../assets/images/neutral.png"),
//     require("../../assets/images/good.png"),
//     require("../../assets/images/excited.png"),
//   ];
//   const filledStarImages = [
//     require("../../assets/images/poor_fill.png"),
//     require("../../assets/images/better_fill.png"),
//     require("../../assets/images/neutral_fill.png"),
//     require("../../assets/images/good_fill.png"),
//     require("../../assets/images/excited_fill.png"),
//   ];
//   const [comment, setComment] = useState<string>("");

//   const isPayButtonDisabled = rating === 0 || comment.trim() === "";

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Payment</Text>
//         </View>
//         <View style={styles.scrollContainer}>
//            <TouchableWithoutFeedback onPress={dismissKeyboard}>
//              <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//             >
//         <View style={styles.cardContainer}>
//           <View style={styles.cardRow}>
//             <Text style={styles.label}>Service</Text>
//             <Text style={[styles.value, { fontSize: 14 }]}>
//               Surgery (Spaying)
//             </Text>
//           </View>
//           <View style={styles.cardRow}>
//             <Text style={[styles.label, { alignSelf: "center" }]}>Cost</Text>
//             <View style={{ flexDirection: "column" }}>
//               <Text style={[styles.value, { fontSize: 12 }]}>
//                 Surgeon Fee...
//               </Text>
//               <Text style={[styles.value, { fontSize: 12 }]}>
//                 Anesthesia...
//               </Text>
//               <Text style={[styles.value, { fontSize: 12 }]}>
//                 Monitoring...
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.ReviewContainer}>
//           <Text style={styles.reviewText}>Tell us about your experience?</Text>
//           <View style={styles.stars}>
//             {starImages.map((_image, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setRating(index + 1)}
//               >
//                 <Image
//                   source={
//                     rating > index ? filledStarImages[index] : starImages[index]
//                   }
//                   style={styles.starIcon}
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
//           <TextInput
//                 placeholder="Dr. Asad is professional, caring, & ......"
//                 style={styles.commentBox}
//                 placeholderTextColor="#939393"
//                 autoCapitalize="sentences"
//                 value={comment}
//                 onChangeText={setComment}
//                 multiline={true}
//               />
//         </View>
//         <View style={styles.cardContainer}>
//           <View style={styles.cardRow}>
//             <Text style={styles.label}>Total amount</Text>
//             <Text style={[styles.value, { fontSize: 14 }]}>PKR 15499.00</Text>
//           </View>
//           <View style={styles.cardRow}>
//             <View style={styles.paymentCard}>
//               <Image
//                 source={require("../../assets/images/Apple Pay.png")}
//                 style={styles.paymentIcon}
//               />
//             </View>
//             <Text style={styles.paymentCardText}>Apple Pay</Text>
//             <TouchableOpacity style={styles.changeButton}>
//               <Text style={styles.changeText}>Change</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         </ScrollView>
//         </TouchableWithoutFeedback>
//         </View>
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity style={[styles.payButton, isPayButtonDisabled && styles.disabledButton]} disabled={isPayButtonDisabled}>
//             <Text style={styles.payText}>Pay</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   navText: {
//     fontSize: 24,
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "50%",
//   },
//   cardContainer: {
//     width: "100%",
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#DCDCDC",
//     marginBottom: 28,
//   },
//   cardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 20,
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 600,
//     color: "#939393",
//   },
//   value: {
//     fontWeight: 500,
//     color: "#ACACAC",
//   },
//   ReviewContainer: {
//     width: "100%",
//     paddingHorizontal: 28,
//     paddingVertical: 18,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#DCDCDC",
//     marginBottom: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   reviewText: {
//     fontSize: 18,
//     fontWeight: 500,
//     color: "#5B555C",
//   },
//   stars: {
//     flexDirection: "row",
//     marginBottom: 24,
//     marginTop: 6,
//   },
//   starIcon: {
//     width: 44,
//     height: 44,
//     marginHorizontal: 4,
//   },
//   commentBox: {
//     backgroundColor: "#F6F6F6",
//     width: "100%",
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     fontSize: 16,
//     fontWeight: 400,
//   },
//   paymentCard: {
//     width: 43,
//     height: 30,
//     marginRight: 10,
//     borderWidth: 1,
//     borderRadius: 4,
//     borderColor: "#000",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paymentIcon: {
//     width: 30,
//     height: 12,
//   },
//   paymentCardText: {
//     fontSize: 16,
//     fontWeight: 600,
//     flex: 1,
//     alignSelf: "center",
//     color: "#939393",
//   },
//   changeButton: {
//     backgroundColor: "#C9EFFF",
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   changeText: {
//     fontSize: 14,
//     color: "#2bbfff",
//     fontWeight: 700,
//   },
//   bottomContainer: {
//     position: "absolute",
//     bottom: 40, // Change to 50 if needed
//     width: "100%",
//   },
//   payButton: {
//     backgroundColor: "#2BBFFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   payText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     backgroundColor: "#E3E5E5",
//   },
// });








// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   TouchableOpacity,
//   Animated,
//   Easing,
//   Platform,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Ionicons } from "@expo/vector-icons";
// import { s, vs, ms } from 'react-native-size-matters';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// const contactDetails = [
//   {
//     id: 1,
//     icon: require("../../assets/images/Black-Location.png"),
//     text: "74/6 Wellington St, East Melbourne",
//     iconStyle: { width: 13, height: 15, marginTop: ms(12) },
//   },
//   {
//     id: 2,
//     icon: require("../../assets/images/phone.png"),
//     text: "+92 314 7544535",
//     iconStyle: { width: 13, height: 13, marginTop: ms(12) },
//   },
//   {
//     id: 3,
//     icon: require("../../assets/images/Mail.png"),
//     text: "waqasahmie@gmail.com",
//     iconStyle: { width: 14, height: 10, marginTop: ms(12) },
//   },
// ];

// const pets = [
//   {
//     id: 1,
//     breed: "Maine Coon",
//     name: "Smokey",
//     gender: require("../../assets/images/male.png"),
//     size: { width: 16, height: 16 },
//     distance: "1.7km Away",
//     image: require("../../assets/images/mainecoon.jpg"),
//   },
//   {
//     id: 2,
//     breed: "Golden Ret.",
//     name: "Lucy",
//     gender: require("../../assets/images/female.png"),
//     size: { width: 14, height: 16 },
//     distance: "1.3km Away",
//     image: require("../../assets/images/goldenretriever.jpg"),
//   },
//   {
//     id: 3,
//     breed: "Cockatoo",
//     name: "Smiley",
//     gender: require("../../assets/images/male.png"),
//     size: { width: 16, height: 16 },
//     distance: "3.0km Away",
//     image: require("../../assets/images/cockatoo.jpg"),
//   },
// ];

// const policies = [
//   {
//     title: "Adoption Requirements",
//     description:
//       "Adopters must meet age, identification, and housing criteria to ensure a stable environment for the pet.",
//   },
//   {
//     title: "Pet Selection Process",
//     description:
//       "Potential adopters must choose a pet that matches their lifestyle, living situation, and experience.",
//   },
//   {
//     title: "Adoption Fees (if any)",
//     description:
//       "All adoption fees are non-refundable and cover the medical care and upkeep of the pet before adoption.",
//   },
//   {
//     title: "Health and Vaccinations",
//     description:
//       "Every pet is spayed/neutered (if their owner wants to) and vaccinated before going to their new home.",
//   },
//   {
//     title: "Return Policy",
//     description:
//       "Pets can be returned if unforeseen circumstances arise, and we’ll help rehome them responsibly.",
//   },
//   {
//     title: "Adopter Responsibilities",
//     description:
//       "Adopters are expected to provide a loving, safe, and permanent home with adequate care and veterinary support.",
//   },
//   {
//     title: "Rehoming",
//     description:
//       "If at any point the adopter cannot keep the pet, they are required to return the pet to our organization.",
//   },
// ];

// export default function Owner_Organization() {
//   const navigation = useNavigation();
//   const [showPolicy, setShowPolicy] = useState(false);
//   const [activeTab, setActiveTab] = useState("Listings");
//   const tabBarPosition = useRef(new Animated.Value(0)).current;
//   useEffect(() => {
//     Animated.timing(tabBarPosition, {
//       toValue: activeTab === "Listings" ? 0 : 1,
//       duration: 300,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: false,
//     }).start();
//   }, [activeTab]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{ zIndex: 10 }}
//           >
//             <MaterialIcons name="arrow-back-ios-new" size={ms(15)} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.navText}>Owner/Organization</Text>
//         </View>

//         <View style={styles.profileCard}>
//           <Image
//             source={require("../../assets/images/avatar.png")}
//             style={styles.avatar}
//           />
//           <View>
//             <Text style={styles.profileTitle}>The Crazy Pets</Text>
//             {contactDetails.map((item) => (
//               <View
//                 key={item.id}
//                 style={{ flexDirection: "row", alignItems: "center" }}
//               >
//                 <View style={{ width: 20 }}>
//                   <Image source={item.icon} style={item.iconStyle} />
//                 </View>
//                 <Text style={styles.profileSubtitle}>{item.text}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <Pressable
//           style={styles.dropdown}
//           onPress={() => setShowPolicy(!showPolicy)}
//         >
//           <Text style={styles.dropdownText}>Adoption Policy</Text>
//           <Ionicons
//             name={showPolicy ? "chevron-up" : "chevron-down"}
//             size={ms(19)}
//             color="black"
//           />
//         </Pressable>
//         <View
//           style={
//             showPolicy
//               ? styles.policyContainerOpen
//               : styles.policyContainerClosed
//           }
//         >
//           <View>
//             <ScrollView
//               // nestedScrollEnabled={true}
//               style={styles.policyScroll}
//               showsVerticalScrollIndicator={false}
//             >
//               {policies.map((policy, index) => (
//                 <View key={index}>
//                   <Text style={styles.policyHeader}>{policy.title}</Text>
//                   <Text style={styles.policyText}>{policy.description}</Text>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>

//         <View style={styles.tabsWrapper}>
//           <View style={styles.tabsContainer}>
//             <TouchableOpacity onPress={() => setActiveTab("Listings")}>
//               <Text
//                 style={
//                   activeTab === "Listings"
//                     ? styles.activeTab
//                     : styles.inactiveTab
//                 }
//               >
//                 Listings
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setActiveTab("Reviews")}>
//               <Text
//                 style={
//                   activeTab === "Reviews"
//                     ? styles.activeTab
//                     : styles.inactiveTab
//                 }
//               >
//                 Reviews
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.tabBarBackground}>
//             <Animated.View
//               style={[
//                 styles.tabBar,
//                 {
//                   left: tabBarPosition.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: ["0%", "50%"],
//                   }),
//                 },
//               ]}
//             />
//           </View>
//         </View>
        
//         {activeTab === "Listings" && (
//           <View style={styles.scrollContainer}>
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               showsVerticalScrollIndicator={false}
//             >
//               <View>
//                 {pets.map((pet) => (
//                   <View key={pet.id} style={styles.petCard}>
//                     <Image source={pet.image} style={styles.petImage} />
//                     <View style={styles.petInfo}>
//                       <Text style={styles.breedText}>{pet.breed}</Text>
//                       <View style={styles.nameInfo}>
//                         <Text style={styles.nameText}>{pet.name}</Text>
//                         <Image
//                           source={pet.gender}
//                           style={[styles.genderImage, pet.size]}
//                         />
//                       </View>
//                       <Text style={styles.distanceText}>{pet.distance}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//               <Text style={styles.note}> Looks like you reached the end!</Text>
//             </ScrollView>
//           </View>
//         )}

//         {activeTab === "Reviews" && (
//           <View style={styles.reviewContainer}>
//             <Text style={styles.note}>No reviews available.</Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingHorizontal: s(20),
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginTop: ms(20),
//     marginBottom: ms(40),
//   },
//   navText: {
//     fontSize: Platform.OS === 'ios' ? ms(23) : ms(20),
//     fontWeight: "500",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: Platform.OS === 'ios' ? "110%" : "120%",
//   },
//   profileCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: vs(15),
//     paddingHorizontal: s(8),
//     borderWidth: 1,
//     borderRadius: 15,
//     borderColor: "#f0f0f0",
//     marginBottom: ms(30),
//   },
//   avatar: {
//     width: ms(75),
//     height: ms(75),
//     borderRadius: 50,
//     marginRight: ms(15),
//   },
//   profileTitle: {
//     fontSize: Platform.OS === 'ios' ? ms(21) : ms(18),
//     fontWeight: "500",
//     marginTop: ms(5),
//   },
//   profileSubtitle: {
//     width: "80%",
//     marginTop: ms(10),
//     fontSize: Platform.OS === 'ios' ? ms(11) : ms(8),
//     fontWeight: "400",
//     color: "#939393",
//   },
//   dropdown: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: ms(16),
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//   },
//   dropdownText: {
//     fontSize: Platform.OS === 'ios' ? ms(15) : ms(12),
//   },
//   policyScroll: {
//     maxHeight: vs(250),
//   },
//   policyContainerOpen: {
//     marginTop: ms(5),
//     paddingHorizontal: s(16),
//     paddingVertical: vs(5),
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//   },
//   policyContainerClosed: {
//     display: "none",
//   },
//   policyHeader: {
//     fontSize: Platform.OS === 'ios' ? ms(17) : ms(14),
//     fontWeight: "500",
//     marginTop: ms(15),
//     marginBottom: ms(5),
//   },
//   policyText: {
//     fontSize: Platform.OS === 'ios' ? ms(15) : ms(12),
//     fontWeight: "300",
//     marginBottom: ms(15),
//   },
//   tabsWrapper: {
//     marginVertical: vs(24),
//     marginHorizontal: s(8),
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: ms(10),
//   },
//   tabBarBackground: {
//     position: "relative",
//     height: vs(4),
//     backgroundColor: "#dcdcdc",
//     borderRadius: 5,
//     marginTop: ms(8),
//     overflow: "hidden",
//   },
//   tabBar: {
//     height: vs(4),
//     width: "50%",
//     borderRadius: 5,
//     backgroundColor: "#2bbfff",
//   },
//   activeTab: {
//     fontSize: Platform.OS === 'ios' ? ms(17) : ms(14),
//     color: "#2bbfff",
//     marginRight: ms(20),
//   },
//   inactiveTab: {
//     fontSize: Platform.OS === 'ios' ? ms(17) : ms(14),
//     color: "#dcdcdc",
//     marginRight: ms(20),
//   },
//   petCard: {
//     flexDirection: "row",
//     marginBottom: ms(25),
//     marginTop: ms(2),
//     padding: ms(6),
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: vs(4) },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   petImage: {
//     width: ms(145),
//     height: ms(170),
//     // width: 150,
//     // height: 170,
//     borderRadius: 14,
//   },
//   petInfo: {
//     paddingHorizontal: s(15),
//     paddingVertical: vs(10),
//     flex: 1,
//   },
//   breedText: {
//     fontSize: Platform.OS === 'ios' ? ms(21) : ms(18),
//     fontWeight: "600",
//     color: "#D4D4D4",
//   },
//   nameInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   nameText: {
//     fontSize: Platform.OS === 'ios' ? ms(17) : ms(14),
//     color: "#ACACAC",
//     marginTop: ms(5),
//   },
//   genderImage: {
//     marginTop: ms(8),
//     marginLeft: ms(10),
//   },
//   distanceText: {
//     fontSize: Platform.OS === 'ios' ? ms(11) : ms(8),
//     color: "#ACACAC",
//     position: "absolute",
//     bottom: 1,
//     right: 10,
//   },
//   note: {
//     fontSize: Platform.OS === 'ios' ? ms(11) : ms(8),
//     fontWeight: "400",
//     alignSelf: "center",
//     color: "#ACACAC",
//     marginBottom: ms(25),
//   },
//   reviewContainer: {
//     marginHorizontal: s(20),
//     marginTop: ms(10),
//   },
// });





// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   ScrollView,
//   StyleSheet,
//   StatusBar,
//   Pressable,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import { s, vs, ms } from 'react-native-size-matters';

// const messages = [
//   {
//     id: 1,
//     name: "The Crazy Pets",
//     message:
//       "A new pet, Max, has been added. Check him out in the adoption list!",
//     time: "2h",
//     image: require("../../assets/images/user1.png"),
//     isOnline: true,
//   },
//   {
//     id: 2,
//     name: "Waqas Ahmed",
//     message:
//       "I’m interested in adopting your cat. Could you share more details about her?",
//     time: "4h",
//     image: require("../../assets/images/user2.png"),
//     isOnline: true,
//   },
//   {
//     id: 3,
//     name: "Faisal Awan",
//     message:
//       "When can I visit to meet your cat? I’d like to see if she’s a good fit for our family.",
//     time: "6h",
//     image: require("../../assets/images/user3.png"),
//     isOnline: false,
//   },
//   {
//     id: 4,
//     name: "Aleysha Amir",
//     message: "I will send you Smokie’s vaccination records for his new vet.",
//     time: "1d",
//     image: require("../../assets/images/user4.png"),
//     isOnline: false,
//   },
//   {
//     id: 5,
//     name: "James Norris",
//     message:
//       "Leo has a calm temperament. Would you like to know more about Leo?",
//     time: "1d",
//     image: require("../../assets/images/user5.png"),
//     isOnline: true,
//   },
//   {
//     id: 6,
//     name: "Dr. Sara",
//     message: "Can I schedule a check-up for Bella next week?",
//     time: "1d",
//     image: require("../../assets/images/user6.png"),
//     isOnline: false,
//   },
//   {
//     id: 7,
//     name: "Dr. Asad",
//     message: "Luna is recovering well. Make sure she gets plenty of rest.",
//     time: "2d",
//     image: require("../../assets/images/user7.png"),
//     isOnline: true,
//   },
//   {
//     id: 8,
//     name: "Dr. Saif",
//     message: "Bella’s X-rays are clear. She can resume her regular activities!",
//     time: "4d",
//     image: require("../../assets/images/user8.png"),
//     isOnline: false,
//   },
//   {
//     id: 9,
//     name: "Aleysha Amir",
//     message: "I will send you Smokie’s vaccination records for his new vet.",
//     time: "1d",
//     image: require("../../assets/images/user4.png"),
//     isOnline: false,
//   },
//   {
//     id: 10,
//     name: "James Norris",
//     message:
//       "Leo has a calm temperament. Would you like to know more about Leo?",
//     time: "1d",
//     image: require("../../assets/images/user5.png"),
//     isOnline: true,
//   },
//   {
//     id: 11,
//     name: "Dr. Sara",
//     message: "Can I schedule a check-up for Bella next week?",
//     time: "1d",
//     image: require("../../assets/images/user6.png"),
//     isOnline: false,
//   },
//   {
//     id: 12,
//     name: "Dr. Asad",
//     message: "Luna is recovering well. Make sure she gets plenty of rest.",
//     time: "2d",
//     image: require("../../assets/images/user7.png"),
//     isOnline: true,
//   },
//   {
//     id: 13,
//     name: "Dr. Saif",
//     message: "Bella’s X-rays are clear. She can resume her regular activities!",
//     time: "4d",
//     image: require("../../assets/images/user8.png"),
//     isOnline: false,
//   },
// ];

// export default function InboxScreen() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [readMessage, setReadMessage] = useState<{ [key: number]: boolean }>(
//     {}
//   );

//   const handlePress = (id: number) => {
//     setReadMessage((prev) => ({ ...prev, [id]: true }));
//   };

//   const filteredMessages = messages.filter((msg) =>
//     msg.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />
//         <View style={styles.headerContainer}>
//           <TextInput
//             placeholder="Search for owners and vets"
//             style={styles.searchInput}
//             placeholderTextColor="#939393"
//             value={searchTerm}
//             onChangeText={setSearchTerm}
//           />
//           <Ionicons name="search" size={ms(19)} style={styles.searchIcon} />
//           <Image
//             source={require("../../assets/images/avatar.png")}
//             style={styles.avatar}
//           />
//         </View>
//         <Text style={styles.header}>Inbox</Text>
//         <View style={styles.scrollContainer}>
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {filteredMessages.map((item) => (
//             <Pressable
//               key={item.id}
//               style={styles.messageItem}
//               onPress={() => handlePress(item.id)}
//             >
//               <View style={styles.imageContainer}>
//                 <Image source={item.image} style={styles.users} />
//                 <View
//                   style={[
//                     styles.onlineIndicator,
//                     { backgroundColor: item.isOnline ? "#2bbfff" : "#ACACAC" },
//                   ]}
//                 />
//               </View>
//               <View style={styles.messageContent}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text
//                   style={[
//                     styles.messageText,
//                     readMessage[item.id] && styles.readMessageText,
//                   ]}
//                 >
//                   {item.message} · {item.time}
//                 </Text>
//               </View>
//             </Pressable>
//           ))}
//           <View style={styles.noteContainer}>
//             <FontAwesome6 name="lock" size={ms(12)} color="#939393" />
//             <Text style={styles.note}>Your personal messages are <Text style={styles.noteColor}>end-to-end encrypted</Text></Text>
//           </View>
//         </ScrollView>
//         </View>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     // top: 40,
//     justifyContent: "flex-start",
//     paddingHorizontal: s(20),
//   },
//   headerContainer: {
//     flexDirection: "row",
//     width: "100%",
//     marginVertical: vs(20),
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   searchInput: {
//     width: "80%",
//     height: ms(40),
//     fontSize: Platform.OS === 'ios' ? ms(15) : ms(12),
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: "#dcdcdc",
//     paddingVertical: vs(10),
//     paddingLeft: ms(20),
//     paddingRight: ms(40),
//   },
//   searchIcon: {
//     position: "absolute",
//     right: 85,
//     color: "#000",
//   },
//   avatar: {
//     width: ms(40),
//     height: ms(40),
//     borderRadius: 50,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: Platform.OS === 'ios' ? "30%" : "40%",
//   },
//   header: {
//     fontSize: Platform.OS === 'ios' ? ms(33) : ms(30),
//     fontWeight: "600",
//     marginBottom: ms(20),
//   },
//   messageItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: ms(22),
//   },
//   imageContainer: {
//     marginRight: ms(12),
//     marginLeft: ms(3),
//   },
//   users: {
//     width: ms(40),
//     height: ms(40),
//     borderRadius: 25,
//   },
//   onlineIndicator: {
//     position: "absolute",
//     right: 1,
//     bottom: 0,
//     width: ms(10),
//     height: ms(10),
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: "#FFF",
//   },
//   messageContent: {
//     width: "82%",
//   },
//   name: {
//     fontWeight: "500",
//     fontSize: Platform.OS === 'ios' ? ms(15) : ms(12),
//   },
//   messageText: {
//     fontWeight: "400",
//     fontSize: Platform.OS === 'ios' ? ms(13) : ms(10),
//   },
//   readMessageText: {
//     color: "#939393",
//   },
//   noteContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: ms(50),
//   },
//   note: {
//     fontSize: Platform.OS === 'ios' ? ms(13) : ms(10),
//     fontWeight: "400",
//     color: "#939393",
//   },
//   noteColor: {
//     fontSize: Platform.OS === 'ios' ? ms(13) : ms(10),
//     fontWeight: "600",
//     color: "#2BBFFF",
//   },
// });








// import { View, Text, StyleSheet } from "react-native";

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>🏡 Home Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// require("../../assets/images/mainecoon.jpg"),
// require("../../assets/images/mainecoon.jpg"),
// require("../../assets/images/mainecoon.jpg"),
// require("../../assets/images/mainecoon.jpg"),
// require("../../assets/images/mainecoon.jpg"),



// import React, { useState, useRef } from 'react';
// import { View, Image, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');

// const images = [
//   require('../../assets/images/mainecoon.jpg'),
//   require('../../assets/images/britishshorthair.jpg'),
//   require('../../assets/images/cockatoo.jpg'),
//   require('../../assets/images/goldenretriever.jpg'),
//   require('../../assets/images/mcockatoo.jpg'),
// ];

// const OverlappingImages = () => {
//   // imageIndexes array holds the order for left, main, right images
//   const [imageIndexes, setImageIndexes] = useState([0, 1, 2, 3, 4]);
//   // current main image is imageIndexes[2]
//   const [nextMain, setNextMain] = useState(null); // for incoming main image index during swipe

//   // Animated values for current image
//   const currentScale = useRef(new Animated.Value(1)).current;
//   const currentOpacity = useRef(new Animated.Value(1)).current;
//   // Animated values for incoming (next) image
//   const nextScale = useRef(new Animated.Value(1.2)).current;
//   const nextOpacity = useRef(new Animated.Value(0)).current;
//   const nextTranslateY = useRef(new Animated.Value(-20)).current; // optional vertical movement for incoming

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderRelease: (evt, gestureState) => {
//       if (gestureState.dx > 50) {
//         swipe('left');
//       } else if (gestureState.dx < -50) {
//         swipe('right');
//       }
//     },
//   });

//   const swipe = (direction) => {
//     // Determine new main image index based on swipe direction
//     let newIndexes = [...imageIndexes];
//     if (direction === 'left') {
//       // left swipe: last element becomes main
//       newIndexes.unshift(newIndexes.pop());
//     } else if (direction === 'right') {
//       // right swipe: first element becomes main
//       newIndexes.push(newIndexes.shift());
//     }
//     // Set next main image immediately
//     setNextMain(newIndexes[2]);

//     // Start outgoing animation for current main image
//     Animated.parallel([
//       Animated.timing(currentScale, {
//         toValue: 0.8,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.timing(currentOpacity, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Outgoing animation complete.
//       // Immediately reset outgoing animated values for future use
//       currentScale.setValue(1);
//       currentOpacity.setValue(1);
//     });

//     // Start incoming animation concurrently
//     Animated.parallel([
//       Animated.timing(nextScale, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.timing(nextOpacity, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.timing(nextTranslateY, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // After both animations complete, update state with new ordering
//       setImageIndexes(newIndexes);
//       // Clear nextMain so only one Animated.Image (current) is shown
//       setNextMain(null);
//       // Reset incoming values for next swipe
//       nextScale.setValue(1.2);
//       nextOpacity.setValue(0);
//       nextTranslateY.setValue(-20);
//     });
//   };

//   return (
//     <View style={styles.container} {...panResponder.panHandlers}>
//       {/* Left Side Images */}
//       <View style={styles.imageContainer}>
//         <Image source={images[imageIndexes[0]]} style={[styles.image, styles.leftImage1]} />
//         <Image source={images[imageIndexes[1]]} style={[styles.image, styles.leftImage2]} />
//       </View>

//       {/* Animated Current Main Image */}
//       <Animated.Image
//         source={images[imageIndexes[2]]}
//         style={[
//           styles.mainImage,
//           {
//             transform: [{ scale: currentScale }],
//             opacity: currentOpacity,
//           },
//         ]}
//       />

//       {/* Animated Incoming Main Image - rendered only during swipe */}
//       {nextMain !== null && (
//         <Animated.Image
//           source={images[nextMain]}
//           style={[
//             styles.mainImage,
//             {
//               position: 'absolute',
//               transform: [{ translateY: nextTranslateY }, { scale: nextScale }],
//               opacity: nextOpacity,
//             },
//           ]}
//         />
//       )}

//       {/* Right Side Images */}
//       <View style={styles.imageContainer}>
//         <Image source={images[imageIndexes[3]]} style={[styles.image, styles.rightImage1]} />
//         <Image source={images[imageIndexes[4]]} style={[styles.image, styles.rightImage2]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   imageContainer: {
//     position: 'relative',
//     width: screenWidth * 0.25,
//   },
//   image: {
//     width: '100%',
//     height: 400,
//     borderRadius: 30,
//     position: 'absolute',
//   },
//   mainImage: {
//     width: screenWidth * 0.7,
//     height: 400,
//     borderRadius: 30,
//     zIndex: 3,
//   },
//   leftImage1: {
//     width: screenWidth * 0.6,
//     height: 300,
//     left: 50,
//     top: -140,
//     zIndex: 1,
//     opacity: 0.4,
//   },
//   leftImage2: {
//     width: screenWidth * 0.6,
//     height: 350,
//     left: 70,
//     top: -170,
//     zIndex: 2,
//     opacity: 0.6,
//   },
//   rightImage1: {
//     width: screenWidth * 0.6,
//     height: 300,
//     right: 50,
//     top: -140,
//     zIndex: 1,
//     opacity: 0.4,
//   },
//   rightImage2: {
//     width: screenWidth * 0.6,
//     height: 350,
//     right: 70,
//     top: -170,
//     zIndex: 2,
//     opacity: 0.6,
//   },
// });

// export default OverlappingImages;







// const images = [
//   require('../../assets/images/mainecoon.jpg'),
//   require('../../assets/images/britishshorthair.jpg'),
//   require('../../assets/images/cockatoo.jpg'),
//   require('../../assets/images/goldenretriever.jpg'),
//   require('../../assets/images/mcockatoo.jpg'),
// ];





// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   PanResponder,
//   Easing,
//   LayoutAnimation,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const images = [
//   require('../../assets/images/mainecoon.jpg'),
//   require('../../assets/images/britishshorthair.jpg'),
//   require('../../assets/images/cockatoo.jpg'),
//   require('../../assets/images/goldenretriever.jpg'),
//   require('../../assets/images/mcockatoo.jpg'),
// ];

// const OverlappingImages = () => {
//   const [imageIndexes, setImageIndexes] = useState([0, 1, 2, 3, 4]);
  
//   // Animations for main image
//   const translateX = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(0)).current;
//   const rotate = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
  
//   // Animations for next/previous images
//   const nextImageOpacity = useRef(new Animated.Value(0)).current;
//   const nextImageTranslateX = useRef(new Animated.Value(screenWidth * 0.5)).current;
//   const nextImageScale = useRef(new Animated.Value(0.8)).current;
//   const nextImageRotate = useRef(new Animated.Value(30)).current;
  
//   const prevImageOpacity = useRef(new Animated.Value(0)).current;
//   const prevImageTranslateX = useRef(new Animated.Value(-screenWidth * 0.5)).current;
//   const prevImageScale = useRef(new Animated.Value(0.8)).current;
//   const prevImageRotate = useRef(new Animated.Value(-30)).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       translateX.setValue(0);
//       translateY.setValue(0);
//       rotate.setValue(0);
//       scaleAnim.setValue(1);
//       nextImageOpacity.setValue(0);
//       nextImageTranslateX.setValue(screenWidth * 0.5);
//       nextImageScale.setValue(0.8);
//       nextImageRotate.setValue(30);
//       prevImageOpacity.setValue(0);
//       prevImageTranslateX.setValue(-screenWidth * 0.5);
//       prevImageScale.setValue(0.8);
//       prevImageRotate.setValue(-30);
//     },
//     onPanResponderMove: (_, { dx }) => {
//       const normalizedDx = dx / screenWidth;
//       translateX.setValue(dx * 0.7);
//       // Circular motion - using sine wave for vertical movement
//       translateY.setValue(Math.sin(Math.abs(normalizedDx) * Math.PI) * 100);
//       rotate.setValue(normalizedDx * -30);
//       scaleAnim.setValue(Math.max(1 - Math.abs(normalizedDx) * 0.5, 0.7));
      
//       if (dx < 0) {
//         // Left swipe - show next image
//         const progress = Math.min(Math.abs(dx) / screenWidth, 1);
//         nextImageOpacity.setValue(progress);
//         nextImageTranslateX.setValue(screenWidth * 0.5 * (1 - progress));
//         nextImageScale.setValue(0.8 + progress * 0.2);
//         nextImageRotate.setValue(30 * (1 - progress));
//       } else {
//         // Right swipe - show previous image
//         const progress = Math.min(Math.abs(dx) / screenWidth, 1);
//         prevImageOpacity.setValue(progress);
//         prevImageTranslateX.setValue(-screenWidth * 0.5 * (1 - progress));
//         prevImageScale.setValue(0.8 + progress * 0.2);
//         prevImageRotate.setValue(-30 * (1 - progress));
//       }
//     },
//     onPanResponderRelease: (_, { dx, vx }) => {
//       const swipeThreshold = screenWidth * 0.2;
//       const velocityThreshold = 0.5;
//       const isLeftSwipe = dx < 0;
//       const isRightSwipe = dx > 0;
      
//       if ((Math.abs(dx) > swipeThreshold || Math.abs(vx) > velocityThreshold) && 
//           (isLeftSwipe || isRightSwipe)) {
//         // Animate based on swipe direction
//         const animations = [];
        
//         if (isLeftSwipe) {
//           animations.push(
//             Animated.timing(translateX, {
//               toValue: -screenWidth * 0.3,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(translateY, {
//               toValue: 100,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(rotate, {
//               toValue: -30,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(scaleAnim, {
//               toValue: 0.7,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(nextImageOpacity, {
//               toValue: 1,
//               duration: 600,
//               useNativeDriver: true,
//             }),
//             Animated.timing(nextImageTranslateX, {
//               toValue: 0,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(nextImageScale, {
//               toValue: 1,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(nextImageRotate, {
//               toValue: 0,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             })
//           );
//         } else {
//           animations.push(
//             Animated.timing(translateX, {
//               toValue: screenWidth * 0.3,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(translateY, {
//               toValue: 100,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(rotate, {
//               toValue: 30,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(scaleAnim, {
//               toValue: 0.7,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(prevImageOpacity, {
//               toValue: 1,
//               duration: 600,
//               useNativeDriver: true,
//             }),
//             Animated.timing(prevImageTranslateX, {
//               toValue: 0,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(prevImageScale, {
//               toValue: 1,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             }),
//             Animated.timing(prevImageRotate, {
//               toValue: 0,
//               duration: 800,
//               easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//               useNativeDriver: true,
//             })
//           );
//         }

//         Animated.parallel(animations).start(() => {
//           // Reset all animations
//           translateX.setValue(0);
//           translateY.setValue(0);
//           rotate.setValue(0);
//           scaleAnim.setValue(1);
//           nextImageOpacity.setValue(0);
//           nextImageTranslateX.setValue(screenWidth * 0.5);
//           nextImageScale.setValue(0.8);
//           nextImageRotate.setValue(30);
//           prevImageOpacity.setValue(0);
//           prevImageTranslateX.setValue(-screenWidth * 0.5);
//           prevImageScale.setValue(0.8);
//           prevImageRotate.setValue(-30);
          
//           // Update image indexes
//           handleSwipeComplete(isRightSwipe);
//           LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         });
//       } else {
//         // Return to original position
//         Animated.parallel([
//           Animated.spring(translateX, {
//             toValue: 0,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(translateY, {
//             toValue: 0,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(rotate, {
//             toValue: 0,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.timing(nextImageOpacity, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.spring(nextImageTranslateX, {
//             toValue: screenWidth * 0.5,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(nextImageScale, {
//             toValue: 0.8,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(nextImageRotate, {
//             toValue: 30,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.timing(prevImageOpacity, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.spring(prevImageTranslateX, {
//             toValue: -screenWidth * 0.5,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(prevImageScale, {
//             toValue: 0.8,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//           Animated.spring(prevImageRotate, {
//             toValue: -30,
//             useNativeDriver: true,
//             bounciness: 10,
//           }),
//         ]).start();
//       }
//     },
//   });

//   const handleSwipeComplete = (isRightSwipe: boolean) => {
//     setImageIndexes(prev => {
//       const newIndexes = [...prev];
//       if (isRightSwipe) {
//         const last = newIndexes.pop();
//         if (last !== undefined) newIndexes.unshift(last);
//       } else {
//         const first = newIndexes.shift();
//         if (first !== undefined) newIndexes.push(first);
//       }
//       return newIndexes;
//     });
//   };

//   const getNextImageIndex = () => {
//     const currentIndex = imageIndexes[2];
//     return currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
//   };

//   const getPrevImageIndex = () => {
//     const currentIndex = imageIndexes[2];
//     return currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
//   };

//   return (
//     <View style={styles.container} {...panResponder.panHandlers}>
//       {/* Left Images */}
//       <View style={styles.imageContainer}>
//         <Image source={images[imageIndexes[0]]} style={[styles.image, styles.leftImage1]} />
//         <Image source={images[imageIndexes[1]]} style={[styles.image, styles.leftImage2]} />
//       </View>

//       {/* Main Image and Next/Previous Image Previews */}
//       <View style={styles.mainImageContainer}>
//         {/* Previous Image Preview */}
//         <Animated.Image
//           source={images[getPrevImageIndex()]}
//           style={[
//             styles.mainImage,
//             styles.prevImage,
//             {
//               opacity: prevImageOpacity,
//               transform: [
//                 { translateX: prevImageTranslateX },
//                 { scale: prevImageScale },
//                 { rotate: prevImageRotate.interpolate({
//                     inputRange: [-30, 0],
//                     outputRange: ['-30deg', '0deg']
//                   }) 
//                 },
//               ],
//             },
//           ]}
//         />
        
//         {/* Next Image Preview */}
//         <Animated.Image
//           source={images[getNextImageIndex()]}
//           style={[
//             styles.mainImage,
//             styles.nextImage,
//             {
//               opacity: nextImageOpacity,
//               transform: [
//                 { translateX: nextImageTranslateX },
//                 { scale: nextImageScale },
//                 { rotate: nextImageRotate.interpolate({
//                     inputRange: [0, 30],
//                     outputRange: ['0deg', '30deg']
//                   }) 
//                 },
//               ],
//             },
//           ]}
//         />
        
//         {/* Main Image */}
//         <Animated.Image
//           source={images[imageIndexes[2]]}
//           style={[
//             styles.mainImage,
//             {
//               transform: [
//                 { translateX: translateX },
//                 { translateY: translateY },
//                 { scale: scaleAnim },
//                 { rotate: rotate.interpolate({
//                     inputRange: [-30, 0, 30],
//                     outputRange: ['-30deg', '0deg', '30deg']
//                   }) 
//                 },
//               ],
//             },
//           ]}
//         />
//       </View>

//       {/* Right Images */}
//       <View style={styles.imageContainer}>
//         <Image source={images[imageIndexes[3]]} style={[styles.image, styles.rightImage1]} />
//         <Image source={images[imageIndexes[4]]} style={[styles.image, styles.rightImage2]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   imageContainer: {
//     position: 'relative',
//     width: screenWidth * 0.25,
//   },
//   mainImageContainer: {
//     position: 'relative',
//     width: screenWidth * 0.7,
//     height: 400,
//   },
//   image: {
//     width: '100%',
//     height: 350,
//     borderRadius: 30,
//     position: 'absolute',
//   },
//   mainImage: {
//     width: '100%',
//     height: 400,
//     borderRadius: 30,
//     position: 'absolute',
//     zIndex: 3,
//   },
//   nextImage: {
//     zIndex: 2,
//   },
//   prevImage: {
//     zIndex: 2,
//   },
//   leftImage1: {
//     width: screenWidth * 0.6,
//     height: 300,
//     left: 50,
//     top: -140,
//     zIndex: 1,
//     opacity: 0.4,
//   },
//   leftImage2: {
//     width: screenWidth * 0.6,
//     height: 350,
//     left: 70,
//     top: -170,
//     zIndex: 2,
//     opacity: 0.6,
//   },
//   rightImage1: {
//     width: screenWidth * 0.6,
//     height: 300,
//     right: 50,
//     top: -140,
//     zIndex: 1,
//     opacity: 0.4,
//   },
//   rightImage2: {
//     width: screenWidth * 0.6,
//     height: 350,
//     right: 70,
//     top: -170,
//     zIndex: 2,
//     opacity: 0.6,
//   },
// });

// export default OverlappingImages;





// import { StyleSheet, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Animated, {
//   useAnimatedRef,
//   useAnimatedStyle,
//   useScrollViewOffset,
// } from 'react-native-reanimated';

// import { CARD_HEIGHT, CARD_WIDTH, Card } from '../../components/utils/card';

// const CARDS = [
//   {
//     color: '#F1EEE0', // Soft beige
//   },
//   {
//     color: '#F3D9BC', // Light peach
//   },
//   {
//     color: '#F4ACB7', // Pale pink
//   },
//   {
//     color: '#F6DFEB', // Soft lavender
//   },
//   {
//     color: '#E2F0CB', // Light green
//   },
//   {
//     color: '#C7E3D4', // Mint green
//   },
//   {
//     color: '#AFCBFF', // Soft blue
//   },
//   {
//     color: '#E3DFFF', // Lavender blue
//   },
//   {
//     color: '#FFE5E0', // Light coral
//   },
//   {
//     color: '#FFD1DC', // Baby pink
//   },
// ];

// const VerticalListPadding = 25;

// export default function cardSwiping () {
//   const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   const scrollOffset = useScrollViewOffset(scrollRef);

//   const rListViewStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: scrollOffset.value,
//         },
//       ],
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />

//       <View
//         style={{
//           marginBottom: CARD_HEIGHT,
//         }}>
//         {/*
//          * The beauty of this approach is that we're not coordinating custom gesture detectors.
//          * Instead we're using just one ScrollView with paging enabled.
//          * This way we can leverage infinite potential cards with a single ScrollView.
//          */}
//         <Animated.ScrollView
//           ref={scrollRef}
//           horizontal
//           snapToInterval={CARD_WIDTH}
//           disableIntervalMomentum
//           pagingEnabled
//           decelerationRate="fast"
//           style={{
//             maxHeight: CARD_HEIGHT + VerticalListPadding * 2,
//             position: 'absolute',
//           }}
//           contentContainerStyle={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: CARD_HEIGHT + VerticalListPadding * 2,
//             paddingHorizontal: CARD_WIDTH,
//           }}>
//           {CARDS.map((_, i) => {
//             return (
//               <View
//                 key={i}
//                 style={{
//                   height: CARD_HEIGHT,
//                   width: CARD_WIDTH,
//                   // IMPORTANT: This is the key to the magic 🪄
//                   // backgroundColor: 'red',
//                   // borderColor: 'white',
//                   // borderWidth: 1,
//                 }}
//               />
//             );
//           })}
//           <Animated.View
//             style={[
//               {
//                 position: 'absolute',
//                 top: VerticalListPadding,
//                 bottom: VerticalListPadding,
//                 left: 0,
//                 right: 0,
//               },
//               rListViewStyle,
//             ]}>
//             {CARDS.map((item, i) => {
//               return (
//                 <Card
//                   scrollOffset={scrollOffset}
//                   index={i}
//                   color={item.color}
//                   key={i}
//                 />
//               );
//             })}
//           </Animated.View>
//         </Animated.ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
// });



// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { IMessageStack } from '../../components/utils/IMessageStack'; // Import your stack

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <IMessageStack />
//     </GestureHandlerRootView>
//   );
// }




// import React from 'react';
// import { StyleSheet, View, Dimensions } from 'react-native';
// import Animated, {
//   useAnimatedRef,
//   useAnimatedStyle,
//   useScrollViewOffset,
//   Extrapolation,
//   interpolate,
//   SharedValue,
// } from 'react-native-reanimated';


// const { width: WindowWidth } = Dimensions.get('window');

// export const CARD_WIDTH = WindowWidth / 3;
// export const CARD_HEIGHT = (CARD_WIDTH / 3) * 4;
// const VerticalListPadding = 25;

// const CARDS = [
//   { color: '#F1EEE0' }, // Soft beige
//   { color: '#F3D9BC' }, // Light peach
//   { color: '#F4ACB7' }, // Pale pink
//   { color: '#F6DFEB' }, // Soft lavender
//   { color: '#E2F0CB' }, // Light green
//   { color: '#C7E3D4' }, // Mint green
//   { color: '#AFCBFF' }, // Soft blue
//   { color: '#E3DFFF' }, // Lavender blue
//   { color: '#FFE5E0' }, // Light coral
//   { color: '#FFD1DC' }, // Baby pink
// ];

// const Card = ({ index, color, scrollOffset }:{index:number; color:string; scrollOffset:SharedValue<number>;}) => {
//   const inputRange = [
//     (index - 3) * CARD_WIDTH,
//     (index - 2) * CARD_WIDTH,
//     (index - 1) * CARD_WIDTH,
//     index * CARD_WIDTH,
//     (index + 1) * CARD_WIDTH,
//     (index + 2) * CARD_WIDTH,
//     (index + 3) * CARD_WIDTH,
//   ];

//   const rStyle = useAnimatedStyle(() => {
//     const scaleOutputRange = [0.75, 0.8, 0.8, 1, 0.8, 0.8, 0.75];
//     const scale = interpolate(
//       scrollOffset.value,
//       inputRange,
//       scaleOutputRange,
//       Extrapolation.CLAMP,
//     );

//     const rotateOutputRange = [
//       -Math.PI / 5,
//       -Math.PI / 10,
//       -Math.PI / 20,
//       0,
//       Math.PI / 20,
//       Math.PI / 10,
//       Math.PI / 5,
//     ];
//     const rotate = interpolate(
//       scrollOffset.value,
//       inputRange,
//       rotateOutputRange,
//       Extrapolation.CLAMP,
//     );

//     const translateXOutputRange = [
//       -CARD_WIDTH * 0.3,
//       -CARD_WIDTH * 0.25,
//       -CARD_WIDTH * 0.2,
//       0,
//       CARD_WIDTH * 0.2,
//       CARD_WIDTH * 0.25,
//       CARD_WIDTH * 0.3,
//     ];
//     const translateX = interpolate(
//       scrollOffset.value,
//       inputRange,
//       translateXOutputRange,
//       Extrapolation.CLAMP,
//     );

//     const translateYOutputRange = [
//       -CARD_HEIGHT * 0.05,
//       -CARD_HEIGHT * 0.025,
//       -CARD_HEIGHT * 0.04,
//       0,
//       -CARD_HEIGHT * 0.04,
//       -CARD_HEIGHT * 0.025,
//       -CARD_HEIGHT * 0.02,
//     ];
//     const translateY = interpolate(
//       scrollOffset.value,
//       inputRange,
//       translateYOutputRange,
//       Extrapolation.CLAMP,
//     );

//     const zIndexOutputRange = [100, 200, 300, 400, 300, 200, 100];
//     const zIndex = interpolate(
//       scrollOffset.value,
//       inputRange,
//       zIndexOutputRange,
//       // Extrapolation.CLAMP,
//       // Why do we need to clamp the output range?
//       // Try to add the clamp and see what happens while scrolling (till the last card)
//       // hint: look the last card while scrolling slowly
//     );

//     const perspectiveRotateY = interpolate(
//       scrollOffset.value, // The current scroll offset value
//       [
//         (index - 3) * CARD_WIDTH,
//         (index - 2) * CARD_WIDTH,
//         (index - 1) * CARD_WIDTH,
//         (index - 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
//         index * CARD_WIDTH,
//         (index + 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
//         (index + 1) * CARD_WIDTH,
//         (index + 2) * CARD_WIDTH,
//         (index + 3) * CARD_WIDTH,
//       ],
//       [
//         -Math.PI / 10,
//         -Math.PI / 10,
//         -Math.PI / 20,
//         -Math.PI / 5,
//         0,
//         Math.PI / 5,
//         Math.PI / 20,
//         Math.PI / 10,
//         Math.PI / 10,
//       ],
//       Extrapolation.CLAMP,
//     );

//     const additionalTranslateX = interpolate(
//       scrollOffset.value, // The current scroll offset value
//       [
//         (index - 3) * CARD_WIDTH,
//         (index - 2) * CARD_WIDTH,
//         (index - 1) * CARD_WIDTH,
//         (index - 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
//         index * CARD_WIDTH,
//         (index + 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
//         (index + 1) * CARD_WIDTH,
//         (index + 2) * CARD_WIDTH,
//         (index + 3) * CARD_WIDTH,
//       ],
//       // While swapping we push the card to the left or to the right to avoid the overlap
//       // Try to replace -CARD_WIDTH / 2.8 with 0 and see what happens
//       [0, 0, 0, -CARD_WIDTH / 2.8, 0, CARD_WIDTH / 2.8, 0, 0, 0],
//       Extrapolation.CLAMP,
//     );

//     return {
//       transform: [
//         { translateX },
//         { translateY },
//         { translateX: additionalTranslateX },
//         { scale },
//         { rotate: rotate + 'rad' },
//         { perspective: 500 },
//         { rotateY: perspectiveRotateY + 'rad' },
//       ],
//       zIndex: Math.round(zIndex),
//     };
//   },[]);

//   return (
//     <Animated.View
//       style={[
//         {
//           position: 'absolute',
//           left: (WindowWidth - CARD_WIDTH) / 2,
//           height: CARD_HEIGHT,
//           width: CARD_WIDTH,
//           borderRadius: 20,
//           backgroundColor: color,
//           shadowColor: 'rgba(0, 0, 0, 0.3)',
//           shadowOffset: { width: 0, height: 10 },
//           shadowOpacity: 0.2,
//           shadowRadius: 20,
//         },
//         rStyle,
//       ]}
//     />
//   );
// };

// const App = () => {
//   const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   const scrollOffset = useScrollViewOffset(scrollRef);

//   const rListViewStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: scrollOffset.value,
//         },
//       ],
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={{ marginBottom: CARD_HEIGHT }}>
//         <Animated.ScrollView
//           ref={scrollRef}
//           horizontal
//           snapToInterval={CARD_WIDTH}
//           disableIntervalMomentum
//           pagingEnabled
//           decelerationRate="fast"
//           style={{ maxHeight: CARD_HEIGHT + VerticalListPadding * 2, position: 'absolute' }}
//           contentContainerStyle={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: CARD_HEIGHT + VerticalListPadding * 2,
//             paddingHorizontal: CARD_WIDTH,
//           }}>
//           {CARDS.map((_, i) => (
//             <View key={i} style={{ height: CARD_HEIGHT, width: CARD_WIDTH }} />
//           ))}
//           <Animated.View
//             style={[
//               {
//                 position: 'absolute',
//                 top: VerticalListPadding,
//                 bottom: VerticalListPadding,
//                 left: 0,
//                 right: 0,
//               },
//               rListViewStyle,
//             ]}>
//             {CARDS.map((item, i) => (
//               <Card key={i} index={i} color={item.color} scrollOffset={scrollOffset} />
//             ))}
//           </Animated.View>
//         </Animated.ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
// });

// export default App;








// /**
//  * Time Picker App
//  *
//  * Main application component that combines a Clock and TimeRange component
//  * to create an interactive time selection interface.
//  *
//  * Features:
//  * - Analog clock display
//  * - Scrollable time range selector
//  * - Timezone handling
//  * - Smooth animations and transitions
//  */
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

// import { TimeRange } from '../../components/utils/time-range';
// import { Clock } from '../../components/utils/clock';

// // Handle timezone offset to ensure correct time display
// // Note: This is a simple implementation. For production, consider using a proper timezone library
// const TimezoneOffsetMs = -new Date().getTimezoneOffset() * 60000;

// /**
//  * Generate an array of time slots for the time range selector
//  * Creates 20 time slots starting from 13:00 with 30-minute intervals
//  */
// const dates = new Array(20).fill(0).map((_, index) => {
//   const hour = Math.floor(index / 2) + 13;
//   const minutes = index % 2 === 0 ? 0 : 30;
//   return new Date(2025, 0, 1, hour, minutes);
// });

// /**
//  * Main App Component
//  *
//  * Orchestrates the time picker interface by:
//  * 1. Managing shared time state
//  * 2. Handling timezone adjustments
//  * 3. Coordinating between Clock and TimeRange components
//  */
// export default function App () {
//   // Shared value for the current selected time
//   const date = useSharedValue(dates[0].getTime());

//   // Derive the adjusted time for the clock display
//   const clockDate = useDerivedValue(() => {
//     'worklet';
//     return date.value + TimezoneOffsetMs;
//   });

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <View style={styles.pickerContainer}>
//         {/* Analog clock display */}
//         <Clock date={clockDate} size={100} />

//         {/* Time range selector */}
//         <TimeRange
//           dates={dates}
//           onDateChange={updatedDate => {
//             'worklet';
//             date.value = updatedDate;
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// // Styles for the main App component
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 32,
//     padding: 32,
//     borderRadius: 24,
//     backgroundColor: '#111111',
//     borderWidth: 1,
//     borderColor: '#222222',
//     borderCurve: 'continuous',
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 0 },
//   },
// });










// import { Text, View, Button } from 'react-native'
// import React, { useState } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import { Modal } from '@/components/utils/modal'
// import { Logout } from '@/components/utils/logout'
// import { Preference } from '@/components/utils/preference'
// import { LinkedAccount } from '@/components/utils/linkedAccounts'
// import { AccountDisabled } from '@/components/utils/accountDisabled'
// import { PetCategoryBS } from '@/components/utils/petCategoryBS'
// import { PetBreedBS } from '@/components/utils/petBreedBS'
// import { PetImages } from '@/components/utils/petImagesBS'
// import { PetDescription } from '@/components/utils/petDescriptionBS'
// import { PetInfoBS } from '@/components/utils/petInfoBS'

// import { HugeiconsIcon } from '@hugeicons/react-native';
// import { Home04Icon, Location02Icon, FavouriteIcon, Comment02Icon, UserIcon, Share08Icon, Call02Icon, Comment01Icon, Search01Icon, MaleSymbolIcon, FemaleSymbolIcon, DialpadCircle01Icon, MicOff02Icon, VideoCameraAiIcon, Video02Icon, Notification03Icon, Route02Icon, MapsLocation01Icon } from '@hugeicons/core-free-icons';


// const App = () => {
//   const [logoutOpen, setLogoutOpen] = useState(false)
//   const [preferencesOpen, setPreferencesOpen] = useState(false)
//   const [linkedAccountOpen, setLinkedAccountOpen] = useState(false)
//   const [accountDisabledOpen, setAccountDisabledOpen] = useState(false)
//   const [petCategoryBSOpen, setPetCategoryBSOpen] = useState(false)
//   const [petBreedBSOpen, setPetBreedBSOpen] = useState(false)
//   const [petImagesBSOpen, setPetImagesBSOpen] = useState(false)
//   const [petDescriptionBSOpen, setPetDescriptionBSOpen] = useState(false)
//   const [petInfoBSOpen, setPetInfoBSOpen] = useState(false)
//   return (
//     <View>
//       <Text>Modal Testing</Text>
//       <View style={{flex: 1, flexDirection: 'row', paddingBottom: 100, gap: 5, flexWrap:'wrap'}}>
//       <HugeiconsIcon icon={Home04Icon} fill='black'/>
//       <HugeiconsIcon icon={Location02Icon} fill='black'/>
//       <HugeiconsIcon icon={FavouriteIcon} fill='black'/>
//       <HugeiconsIcon icon={Comment02Icon} fill='black'/>
//       <HugeiconsIcon icon={UserIcon} fill='black'/>
//       <HugeiconsIcon icon={Share08Icon} />
//       <HugeiconsIcon icon={Call02Icon} />
//       <HugeiconsIcon icon={Comment01Icon} />
//       <HugeiconsIcon icon={Search01Icon} />
//       <HugeiconsIcon icon={MaleSymbolIcon} />
//       <HugeiconsIcon icon={FemaleSymbolIcon} />
//       <HugeiconsIcon icon={MicOff02Icon} fill='black'/>
//       <HugeiconsIcon icon={Video02Icon} fill='black'/>
//       <HugeiconsIcon icon={DialpadCircle01Icon} fill='black'/>
//       <View style={{ transform: [{ rotate: '135deg' }] }}>
//       <HugeiconsIcon icon={Call02Icon} fill='black' strokeWidth={0.5}/>
//       </View>
//       <HugeiconsIcon icon={Notification03Icon} />
//       <HugeiconsIcon icon={Route02Icon} />
//       <HugeiconsIcon icon={MapsLocation01Icon} />
//       </View>
//       <StatusBar style='auto'/>
//       <Button title='Open Logout' onPress={() => setLogoutOpen(true)}/>
//       <Button title='Open Pet Info' onPress={() => setPetInfoBSOpen(true)}/>
//       <Button title='Open Pet Breed' onPress={() => setPetBreedBSOpen(true)}/>
//       <Button title='Open Preferences' onPress={() => setPreferencesOpen(true)}/>
//       <Button title='Open Pet Category' onPress={() => setPetCategoryBSOpen(true)}/>
//       <Button title='Open Linked Accounts' onPress={() => setLinkedAccountOpen(true)}/>
//       <Button title='Open Pet Description' onPress={() => setPetDescriptionBSOpen(true)}/>
//       <Button title='Open Account Disabled' onPress={() => setAccountDisabledOpen(true)}/>
//       <Button title='Open Pet Image Uploader' onPress={() => setPetImagesBSOpen(true)}/>
//       <Modal isOpen={preferencesOpen} closeModal={() => setPreferencesOpen(false)}>
//         <Preference closeModal={() => setPreferencesOpen(false)}/>
//       </Modal>
//       <Modal isOpen={linkedAccountOpen} closeModal={() => setLinkedAccountOpen(false)}>
//         <LinkedAccount />
//       </Modal>
//       <Modal isOpen={logoutOpen} closeModal={() => setLogoutOpen(false)}>
//         <Logout closeModal={() => setLogoutOpen(false)}/>
//       </Modal>
//       <Modal style={{ justifyContent: 'center'}} isOpen={accountDisabledOpen} closeModal={() => setAccountDisabledOpen(false)}>
//         <AccountDisabled />
//       </Modal>
//       <Modal isOpen={petCategoryBSOpen} closeModal={() => setPetCategoryBSOpen(false)}>
//         <PetCategoryBS closeModal={() => setPetCategoryBSOpen(false)} />
//       </Modal>
//       <Modal isOpen={petBreedBSOpen} closeModal={() => setPetBreedBSOpen(false)}>
//         <PetBreedBS closeModal={() => setPetBreedBSOpen(false)} />
//       </Modal>
//       <Modal isOpen={petImagesBSOpen} closeModal={() => setPetImagesBSOpen(false)}>
//         <PetImages closeModal={() => setPetImagesBSOpen(false)} />
//       </Modal>
//       <Modal isOpen={petDescriptionBSOpen} withInput closeModal={() => setPetDescriptionBSOpen(false)}>
//         <PetDescription closeModal={() => setPetDescriptionBSOpen(false)} />
//       </Modal>
//       <Modal isOpen={petInfoBSOpen} withInput closeModal={() => setPetInfoBSOpen(false)}>
//         <PetInfoBS closeModal={() => setPetInfoBSOpen(false)} />
//       </Modal>
//     </View>
//   )
// }

// export default App










// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   Image,
//   Animated,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { Feather, Ionicons } from "@expo/vector-icons";

// export default function PetDetail() {
//   const navigation = useNavigation();
//   const [liked, setLiked] = useState(false);
//   const scale = useRef(new Animated.Value(1)).current;

//   const animateHeart = () => {
//     Animated.sequence([
//       Animated.timing(scale, {
//         toValue: 1.4,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scale, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     setLiked(!liked);
//   };

//   const infoData = [
//     { title: "Gender", value: "Male" },
//     { title: "Age", value: "1.5 years" },
//     { title: "Breed", value: "Persian" },
//     { title: "Eye Color", value: "Grey" },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <StatusBar barStyle="dark-content" />

//         {/* Back Button (Positioned Below Status Bar) */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={[styles.circle, { zIndex: 10 }]}
//           >
//             <MaterialIcons
//               style={{ right: 1 }}
//               name="arrow-back-ios-new"
//               size={16}
//               color="black"
//             />
//           </TouchableOpacity>

//           <Text style={styles.navText}>Pet Details</Text>

//           <TouchableWithoutFeedback onPress={animateHeart}>
//             <View style={styles.circle}>
//               <Animated.View style={{ transform: [{ scale }] }}>
//                 <Ionicons
//                   name={liked ? "heart" : "heart-outline"}
//                   size={20}
//                   style={{ top: 1 }}
//                   color={liked ? "red" : "black"}
//                 />
//               </Animated.View>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>

//         <View>
//           <Image
//             source={require("../../assets/images/ImageSlider.png")}
//             style={styles.imageContainer}
//           />
//         </View>

//         <View style={styles.infoSection}>
//           <View style={styles.innerInfoSection}>
//             <Text style={styles.title}>Smokey </Text>
//             <Feather
//               style={{ right: 10 }}
//               name="share-2"
//               size={20}
//               color="black"
//             />
//           </View>
//           <Text style={styles.subTitle}>
//             74/6 Wellington St, East Mellbourne
//           </Text>
//         </View>

//         <View style={styles.scrollContainer}>
//           <ScrollView
//             contentContainerStyle={{ flexGrow: 1 }}
//             showsVerticalScrollIndicator={false}
//           >
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.infoBoxWrapper}
//             >
//               {infoData.map((item, index) => (
//                 <View key={index} style={styles.infoBox}>
//                   <Text style={styles.infoTitle}>{item.title}</Text>
//                   <Text style={styles.infoSubtitle}>{item.value}</Text>
//                 </View>
//               ))}
//             </ScrollView>

//             <View style={styles.ownerBox}>
//             <View>
//           <Image
//             source={require("../../assets/images/user1.png")}
//             style={styles.ownerImage}
//           />
//         </View>
//               <View style={styles.ownerTextWrapper}>
//                 <Text style={styles.ownerName}>Waqas Ahmed</Text>
//                 <Text style={styles.ownerRole}>Pet Owner</Text>
//               </View>
//               <View style={styles.contactIcons}>
//                 <TouchableOpacity style={styles.contactIconButton}>
//                   <Feather name="phone" size={18} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.contactIconButton}>
//                   <Feather name="message-circle" size={18} color="black" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.aboutSection}>
//               <Text style={styles.aboutTitle}>About</Text>
//               <Text style={styles.aboutDescription}>
//               Persian cats, known for their luxurious long fur, round faces, and gentle personalities, are one of the most beloved and recognizable breeds in the world. Originating from Persia (modern-day Iran), these cats have been admired for centuries and continue to captivate cat enthusiasts with their distinctive appearance and sweet demeanor.                                          
//               </Text>
//             </View>
//           </ScrollView>
//         </View>
//         <View style={styles.footerBox}>
//           <View>
//             <Text style={styles.priceLabel}>Price</Text>
//             <Text style={styles.priceValue}>Rs 5000</Text>
//           </View>
//           <TouchableOpacity style={styles.adoptButton}>
//             <Text style={styles.adoptText}>Adopt Me</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   circle: {
//     width: 35,
//     height: 35,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: "#DCDCDC",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   navText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#000",
//     position: "absolute",
//     textAlign: "center",
//     left: 0,
//     right: 0,
//   },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: "155%",
//     // paddingBottom: 20,
//     //marginTop: 10,
//     // backgroundColor:"pink"
//   },

//   imageContainer: {
//     width: 304,
//     height: 300,
//     marginBottom: 20,
//   },
//   infoSection: {
//     alignItems: "flex-start",
//     width: "95%",
//     marginBottom: 20,
//     //backgroundColor:"pink"
//   },
//   innerInfoSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "500",
//   },
//   subTitle: {
//     fontSize: 16,
//     color: "#939393",
//     fontWeight: "400",
//   },
//   infoBoxWrapper: {
//     width: "100%",
//     marginBottom: 20,
//     //backgroundColor:"pink"
//   },
//   infoBox: {
//     // flexDirection: "column",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#DCDCDC",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     width: 100,
//     marginRight: 12,
//   },
//   infoTitle: {
//     color: "gray",
//     fontSize: 12,
//     fontWeight: "400",
//   },
//   infoSubtitle: {
//     fontWeight: "500",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   ownerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical:8,
//     marginBottom: 10,
//   },
//   ownerImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   ownerTextWrapper: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   ownerName: {
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   ownerRole: {
//     color: "gray",
//     fontSize: 12,
//   },
//   contactIcons: {
//     flexDirection: "row",
//     gap: 10,
//   },
//   contactIconButton: {
//     backgroundColor: "#f0f0f0",
//     padding: 8,
//     borderRadius: 20,
//   },
//   aboutSection: {
//     marginBottom: 10,
//     width:"95%",
//     alignSelf:"center",
//   },
//   aboutTitle: {
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   aboutDescription: {
//     color: "gray",
//     marginTop: 4,
//     fontSize: 13,
//     marginBottom: 60,
//   },
//   footerBox: {
//     width:"100%",
//     position: "absolute",
//     bottom: 23,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#000",
//     marginHorizontal: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 10, 
//     borderRadius: 50,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowRadius: 10,
//     shadowOpacity: 0.1,
//   },
//   priceLabel: {
//     color: "gray",
//     fontSize: 12,
//     fontWeight: "300",
//     paddingLeft:25,
//   },
//   priceValue: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//     paddingLeft: 25,
//   },
//   adoptButton: {
//     backgroundColor: "white",
//     paddingVertical: 15,
//     paddingHorizontal: 35,
//     borderRadius: 50,
//   },
//   adoptText: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });










// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import Animated, {
//   FadeIn,
//   FadeInUp,
//   FadeOut,
//   SlideInUp,
// } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import EventCard from '@/components/utils/EventCard';
// import Marquee from '@/components/utils/Marquee';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// const events = [
//   {
//     id: 1,
//     image: require('../../assets/images/onboardOne.jpeg'),
//   },
//   {
//     id: 2,
//     image: require('../../assets/images/onboardTwo.jpeg'),
//   },
//   {
//     id: 3,
//     image: require('../../assets/images/onboardThree.jpeg'),
//   },
//   {
//     id: 4,
//     image: require('../../assets/images/onboardFour.jpeg'),
//   },
//   {
//     id: 5,
//     image: require('../../assets/images/onboardFive.jpeg'),
//   },
//   {
//     id: 6,
//     image: require('../../assets/images/onboardSix.jpeg'),
//   },
//   {
//     id: 7,
//     image: require('../../assets/images/onboardSeven.jpeg'),
//   },
//   {
//     id: 8,
//     image: require('../../assets/images/onboardEight.jpeg'),
//   },
// ];

// export default function WelcomeScreen() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const onButtonPress = () => {
//     // router.push('/create');
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//     <View style={styles.container}>
//       <Animated.Image
//         key={events[activeIndex].image}
//         source={events[activeIndex].image}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//         entering={FadeIn.duration(1000)}
//         exiting={FadeOut.duration(1000)}
//       />

//       <View style={styles.overlay} />

//       <BlurView intensity={70} style={styles.flex}>
//         <SafeAreaView edges={['bottom']} style={styles.flex}>
//           <Animated.View
//             style={styles.topContainer}
//             entering={SlideInUp.springify().mass(1).damping(30)}
//           >
//             <Marquee
//               items={events}
//               renderItem={({ item }: { item: any }) => (
//                 <EventCard event={item} />
//               )}
//               onIndexChange={setActiveIndex}
//             />
//           </Animated.View>

//           <View style={styles.bottomContainer}>
//             <Animated.Text
//               style={styles.subheading}
//               entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
//             >
//               Welcome to
//             </Animated.Text>

//             <Animated.Text
//               style={styles.heading}
//               entering={FadeIn.duration(500).delay(500)}
//             >
//               Pawdopt
//             </Animated.Text>

//             <Animated.Text
//               style={styles.description}
//               entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
//             >
//               Embark on a heart warming journey to find your
//               perfect companion. Explore, match, and open
//               your heart to a new furry friend.
//             </Animated.Text>

//             <AnimatedPressable
//               onPress={onButtonPress}
//               style={styles.button}
//               entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
//             >
//               <Text style={styles.buttonText}>Let's Get Started</Text>
//             </AnimatedPressable>
//           </View>
//         </SafeAreaView>
//       </BlurView>
//     </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#3b1700trrr', // Equivalent of 'bg-yellow-950'
//   },
//   backgroundImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '100%',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '100%',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   flex: {
//     flex: 1,
//   },
//   topContainer: {
//     marginTop: 80, // mt-20 = 5 * 16 = 80
//     height: '50%',
//     width: '100%',
//   },
//   bottomContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     gap: 16,
//     padding: 16,
//   },
//   subheading: {
//     textAlign: 'center',
//     fontSize: 20, // text-2xl
//     fontWeight: 'bold',
//     color: 'rgba(255,255,255,0.6)',
//   },
//   heading: {
//     textAlign: 'center',
//     fontSize: 40, // text-5xl
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   description: {
//     marginBottom: 20,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   button: {
//     alignSelf: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     paddingHorizontal: 40,
//     paddingVertical: 16,
//     borderRadius: 9999, // rounded-full
//   },
//   buttonText: {
//     fontSize: 18,
//   },
// });








// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   Animated,
// } from "react-native";
// import { Ionicons, Octicons } from "@expo/vector-icons";
// import { s, vs, ms } from "react-native-size-matters";

// const bannerImages = [
//   require("../../assets/images/bannerOne.png"),
//   require("../../assets/images/bannerTwo.png"),
//   require("../../assets/images/bannerThree.png"),
// ];

// const width = 336;
// const BANNER_HEIGHT = 140;
// const AUTO_SCROLL_INTERVAL = 3000;

// const allPets = [
//   {
//     id: 1,
//     breed: "Maine Coon",
//     name: "Smokey",
//     category: "Cats",
//     gender: require("../../assets/images/male.png"),
//     size: { width: 16, height: 16 },
//     distance: "1.7km Away",
//     image: require("../../assets/images/mainecoon.jpg"),
//   },
//   {
//     id: 2,
//     breed: "Golden Ret.",
//     name: "Lucy",
//     category: "Dogs",
//     gender: require("../../assets/images/female.png"),
//     size: { width: 14, height: 16 },
//     distance: "1.3km Away",
//     image: require("../../assets/images/goldenretriever.jpg"),
//   },
//   {
//     id: 3,
//     breed: "Cockatoo",
//     name: "Smiley",
//     category: "Parrots",
//     gender: require("../../assets/images/male.png"),
//     size: { width: 16, height: 16 },
//     distance: "3.0km Away",
//     image: require("../../assets/images/cockatoo.jpg"),
//   },
// ];

// export default function PetAdoptionScreen() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const fadeAnim = useRef(new Animated.Value(1)).current;
//   const currentIndex = useRef(0);
//   const [activeDot, setActiveDot] = useState(0);
//   const dotAnimations = useRef(
//     bannerImages.map(() => new Animated.Value(6))
//   ).current;
//   const [currentImage, setCurrentImage] = useState(bannerImages[0]);

//   const categories = ["All", "Cats", "Dogs", "Parrots"];

//   const pillAnim = useRef(new Animated.Value(0)).current;
//   const pillWidth = useRef(new Animated.Value(0)).current;
//   const categoryRefs = useRef<{ [key: string]: View | null }>({});

//   const filteredPets =
//     selectedCategory === "All"
//       ? allPets
//       : allPets.filter((pet) => pet.category === selectedCategory);

//   useEffect(() => {
//     dotAnimations[0].setValue(18);
//     const interval = setInterval(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 50,
//         useNativeDriver: true,
//       }).start(() => {
//         currentIndex.current = (currentIndex.current + 1) % bannerImages.length;
//         const newIndex = currentIndex.current;
//         setCurrentImage(bannerImages[newIndex]);
//         setActiveDot(newIndex);

//         dotAnimations.forEach((dot, i) => {
//           Animated.timing(dot, {
//             toValue: i === newIndex ? 18 : 6,
//             duration: 300,
//             useNativeDriver: false,
//           }).start();
//         });

//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 50,
//           useNativeDriver: true,
//         }).start();
//       });
//     }, AUTO_SCROLL_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (categoryRefs.current[selectedCategory]) {
//       categoryRefs.current[selectedCategory].measure((x: any, y: any, width: any) => {
//         Animated.parallel([
//           Animated.spring(pillAnim, {
//             toValue: x,
//             useNativeDriver: false,
//           }),
//           Animated.spring(pillWidth, {
//             toValue: width,
//             useNativeDriver: false,
//           }),
//         ]).start();
//       });
//     }
//   }, [selectedCategory]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         {/* Header */}
//         <View style={styles.headerContainer}>
//           <View style={styles.greetingContainer}>
//             <View style={styles.greeting}>
//               <Text style={styles.greetingText}>Hey, </Text>
//               <Text style={styles.username}>Waqas!</Text>
//             </View>
//             <Image
//               source={require("../../assets/images/Pawprint.png")}
//               style={styles.paw}
//             />
//           </View>
//           <View style={styles.searchContainer}>
//             <TextInput
//               placeholder="Persian Cat"
//               style={styles.searchInput}
//               placeholderTextColor="#939393"
//               value={searchTerm}
//               onChangeText={setSearchTerm}
//             />
//             <Ionicons name="search" size={ms(19)} style={styles.searchIcon} />
//           </View>
//           <View style={styles.iconRow}>
//             <Image
//               source={require("../../assets/images/vet.png")}
//               style={styles.icon}
//             />
//             <Octicons name="bell" size={ms(22)} />
//           </View>
//         </View>

//         {/* Banner */}
//         <View style={styles.wrapper}>
//           <Animated.Image
//             source={currentImage}
//             style={[styles.bannerImage, { opacity: fadeAnim }]}
//           />
//           <View style={styles.paginationContainer}>
//             {bannerImages.map((_, index) => (
//               <Animated.View
//                 key={index}
//                 style={[
//                   styles.dot,
//                   {
//                     width: dotAnimations[index],
//                     backgroundColor: activeDot === index ? "#fff" : "#ccc",
//                   },
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Categories */}
//         <Text style={styles.title}>Pet Categories</Text>
//         <View style={styles.categories}>
//           <Animated.View
//             style={[
//               styles.animatedPill,
//               { transform: [{ translateX: pillAnim }], width: pillWidth },
//             ]}
//           />
//           {categories.map((category) => (
//             <TouchableOpacity
//               key={category}
//               onPress={() => setSelectedCategory(category)}
//               activeOpacity={0.7}
//               ref={(ref) => (categoryRefs.current[category] = ref)}
//               style={styles.categoryButton}
//             >
//               <Text
//                 style={[
//                   styles.categoryText,
//                   selectedCategory === category && {
//                     color: "#fff",
//                     fontWeight: "bold",
//                   },
//                 ]}
//               >
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Pets List */}
//         <View style={styles.scrollContainer}>
//           <ScrollView
//             contentContainerStyle={{ flexGrow: 1 }}
//             showsVerticalScrollIndicator={false}
//           >
//             {filteredPets.map((pet) => (
//               <View key={pet.id} style={styles.petCard}>
//                 <Image source={pet.image} style={styles.petImage} />
//                 <View style={styles.petInfo}>
//                   <Text style={styles.breedText}>{pet.breed}</Text>
//                   <Text style={styles.nameText}>
//                     {pet.name} <Image source={pet.gender} style={pet.size} />
//                   </Text>
//                   <Text style={styles.distanceText}>{pet.distance}</Text>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   innerContainer: { flex: 1, paddingHorizontal: s(20), gap: 20 },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 20,
//   },
//   greetingContainer: { flexDirection: "row" },
//   greeting: { flexDirection: "column" },
//   greetingText: { fontSize: 14, fontWeight: "300" },
//   username: { fontSize: 16, fontWeight: "400" },
//   paw: { width: 20, height: 20, right: 8, top: 14 },
//   searchContainer: { width: "45%", justifyContent: "center" },
//   searchInput: {
//     height: ms(40),
//     fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: "#dcdcdc",
//     paddingVertical: vs(10),
//     paddingLeft: ms(20),
//     paddingRight: ms(40),
//   },
//   searchIcon: { position: "absolute", right: 10, color: "#000" },
//   iconRow: { flexDirection: "row", alignItems: "center", gap: 12 },
//   icon: { width: 40, height: 40 },
//   wrapper: {
//     width: width,
//     height: BANNER_HEIGHT,
//     borderRadius: 16,
//     overflow: "hidden",
//     alignSelf: "center",
//     backgroundColor: "#eee",
//   },
//   bannerImage: {
//     width: width,
//     height: BANNER_HEIGHT,
//     resizeMode: "cover",
//     position: "absolute",
//     top: 0,
//     left: 0,
//   },
//   paginationContainer: {
//     position: "absolute",
//     bottom: 4,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dot: { height: 6, borderRadius: 10, marginHorizontal: 4 },
//   title: { fontSize: 22, fontWeight: "600" },
//   categories: {
//     flexDirection: "row",
//     backgroundColor: "#F2FBFF",
//     padding: 6,
//     borderRadius: 50,
//     justifyContent: "space-between",
//     position: "relative",
//   },
//   categoryButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   animatedPill: {
//     position: "absolute",
//     height: "100%",
//     backgroundColor: "#2bbfff",
//     borderRadius: 50,
//     zIndex: 0,
//   },
//   categoryText: { color: "#000" },
//   scrollContainer: {
//     width: "100%",
//     marginBottom: Platform.OS === "ios" ? "110%" : "120%",
//   },
//   petCard: {
//     flexDirection: "row",
//     marginBottom: ms(25),
//     marginTop: ms(2),
//     padding: ms(6),
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: vs(4) },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   petImage: { width: ms(145), height: ms(170), borderRadius: 14 },
//   petInfo: { paddingHorizontal: s(15), paddingVertical: vs(10), flex: 1 },
//   breedText: {
//     fontSize: Platform.OS === "ios" ? ms(21) : ms(18),
//     fontWeight: "600",
//     color: "#D4D4D4",
//   },
//   nameText: {
//     fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
//     color: "#ACACAC",
//     marginTop: ms(5),
//   },
//   distanceText: {
//     fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
//     color: "#ACACAC",
//     position: "absolute",
//     bottom: 1,
//     right: 10,
//   },
// });








import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { Ionicons, Feather, Octicons } from "@expo/vector-icons";
import { s, vs, ms } from "react-native-size-matters";

const bannerImages = [
  require("../../assets/images/bannerOne.png"),
  require("../../assets/images/bannerTwo.png"),
  require("../../assets/images/bannerThree.png"),
];

const width = 336;
const BANNER_HEIGHT = 140;
const AUTO_SCROLL_INTERVAL = 3000;

const allPets = [
  {
    id: 1,
    breed: "Maine Coon",
    name: "Smokey",
    category: "Cats",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "1.7km Away",
    image: require("../../assets/images/mainecoon.jpg"),
  },
  {
    id: 2,
    breed: "Macaw",
    name: "Lily",
    category: "Parrots",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "3.2km Away",
    image: require("../../assets/images/macaw.jpg"),
  },
  {
    id: 3,
    breed: "Golden Ret.",
    name: "Lucy",
    category: "Dogs",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "1.3km Away",
    image: require("../../assets/images/goldenretriever.jpg"),
  },
  {
    id: 4,
    breed: "British Short.",
    name: "Raya",
    category: "Cats",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "2.9km Away",
    image: require("../../assets/images/britishshorthair.jpg"),
  },
  {
    id: 5,
    breed: "Cockatoo",
    name: "Smiley",
    category: "Parrots",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/cockatoo.jpg"),
  },
  {
    id: 6,
    breed: "Ragdoll",
    name: "Leo",
    category: "Cats",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/ragdoll.jpg"),
  },
  {
    id: 7,
    breed: "Samoyed",
    name: "Frosty",
    category: "Dogs",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "3.1km Away",
    image: require("../../assets/images/samoyed.jpg"),
  },
  {
    id: 8,
    breed: "African Grey",
    name: "Gizmo",
    category: "Parrots",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "1.9km Away",
    image: require("../../assets/images/africangrey.jpg"),
  },
  {
    id: 9,
    breed: "Siberian L.",
    name: "Mila",
    category: "Cats",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/siberian.jpg"),
  },
  {
    id: 10,
    breed: "Labrador R.",
    name: "Daisy",
    category: "Dogs",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/labrador.jpg"),
  },
  {
    id: 11,
    breed: "M. Cockatoo",
    name: "Candy",
    category: "Parrots",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/mcockatoo.jpg"),
  },
  {
    id: 12,
    breed: "German Sh.",
    name: "Bruno",
    category: "Dogs",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "1.8km Away",
    image: require("../../assets/images/german.jpg"),
  },
  {
    id: 13,
    breed: "Sun Conure",
    name: "Cane",
    category: "Parrots",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "1.7km Away",
    image: require("../../assets/images/sunconure.jpg"),
  },
  {
    id: 14,
    breed: "Persian",
    name: "Abby",
    category: "Cats",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "3.8km Away",
    image: require("../../assets/images/persian.jpg"),
  },
  {
    id: 15,
    breed: "Husky",
    name: "Snowy",
    category: "Dogs",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/husky.jpg"),
  },
];

export default function PetAdoptionScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndex = useRef(0);
  const [activeDot, setActiveDot] = useState(0);

  const dotAnimations = useRef(
    bannerImages.map(() => new Animated.Value(6))
  ).current;

  const [currentImage, setCurrentImage] = useState(bannerImages[0]);

  useEffect(() => {
    // Initialize first dot animation
    dotAnimations[0].setValue(18);

    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start(() => {
        // Update index and image
        currentIndex.current = (currentIndex.current + 1) % bannerImages.length;
        const newIndex = currentIndex.current;
        setCurrentImage(bannerImages[newIndex]);
        setActiveDot(newIndex);

        // Update dot animation
        dotAnimations.forEach((dot, i) => {
          Animated.timing(dot, {
            toValue: i === newIndex ? 18 : 6,
            duration: 300,
            useNativeDriver: false,
          }).start();
        });

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }).start();
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Cats", "Dogs", "Parrots"];

  const pillAnim = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const categoryRefs = useRef<{ [key: string]: View | null }>({});

  const filteredPets =
    selectedCategory === "All"
      ? allPets
      : allPets.filter((pet) => pet.category === selectedCategory);

  useEffect(() => {
    if (categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory].measure((x, _y, width) => {
        Animated.parallel([
          Animated.spring(pillAnim, {
            toValue: x,
            stiffness: 150,      // lower = softer spring
            damping: 20,  
            useNativeDriver: false,
          }),
          Animated.spring(pillWidth, {
            toValue: width,
            stiffness: 150,      // lower = softer spring
            damping: 20,  
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.greetingContainer}>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Hey, </Text>
              <Text style={styles.username}>Waqas!</Text>
            </View>
            <Image
              source={require("../../assets/images/Pawprint.png")}
              style={styles.paw}
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Persian Cat"
              returnKeyType="search"
              style={styles.searchInput}
              placeholderTextColor="#939393"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <Ionicons name="search" size={ms(19)} style={styles.searchIcon} />
          </View>
          <View style={styles.iconRow}>
            <Image
              source={require("../../assets/images/vet.png")}
              style={styles.icon}
            />
            <Octicons name="bell" size={ms(22)} />
          </View>
        </View>

        <View style={styles.wrapper}>
          <Animated.Image
            source={currentImage}
            style={[styles.bannerImage, { opacity: fadeAnim }]}
          />

          {/* Pagination */}
          <View style={styles.paginationContainer}>
            {bannerImages.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotAnimations[index],
                    backgroundColor: activeDot === index ? "#fff" : "#ccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.title}>Pet Categories</Text>
        <View style={styles.categories}>
          {/* 🔧 Animated background pill */}
          <Animated.View
            style={[
              styles.activeCategory,
              { transform: [{ translateX: pillAnim }], width: pillWidth },
            ]}
          />
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
              ref={(ref) => (categoryRefs.current[category] = ref)}
              style={styles.categoryButton}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredPets.map((pet) => (
              <View key={pet.id} style={styles.petCard}>
                <Image source={pet.image} style={styles.petImage} />
                <View style={styles.petInfo}>
                  <Text style={styles.breedText}>{pet.breed}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.nameText}>{pet.name}</Text>
                    <View style={styles.genderImage}>
                      <Image source={pet.gender} style={pet.size} />
                    </View>
                  </View>
                  <Text style={styles.distanceText}>{pet.distance}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          </ScrollView>
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
    justifyContent: "flex-start",
    paddingHorizontal: s(20),
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "110%" : "120%",
  },
  greetingContainer: {
    flexDirection: "row",
  },
  greeting: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#acacac",
  },
  username: {
    fontSize: 16,
    fontWeight: "400",
  },
  paw: {
    width: 20,
    height: 20,
    right: 8,
  },
  searchContainer: {
    width: "50%",
    justifyContent: "center",
  },
  searchInput: {
    height: ms(40),
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: vs(10),
    paddingLeft: ms(20),
    paddingRight: ms(40),
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    color: "#000",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  wrapper: {
    width: width,
    height: BANNER_HEIGHT,
    borderRadius: 26,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#eee",
  },
  bannerImage: {
    width: width,
    height: BANNER_HEIGHT,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  categories: {
    flexDirection: "row",
    backgroundColor: "#F2FBFF",
    padding: 6,
    borderRadius: 50,
    justifyContent: "space-between",
    position: "relative",
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    // backgroundColor:"pink",
  },
  activeCategory: {
    alignSelf: "center",
    position: "absolute",
    height: "100%",
    backgroundColor: "#2bbfff",
    borderRadius: 50,
    zIndex: 0,
  },
  categoryText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  petCard: {
    flexDirection: "row",
    marginBottom: ms(25),
    marginTop: ms(2),
    padding: ms(6),
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: ms(145),
    height: ms(170),

    borderRadius: 14,
  },
  petInfo: {
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    flex: 1,
  },
  breedText: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize: Platform.OS === "ios" ? ms(26) : ms(21),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
    color: "#ACACAC",
    marginTop: ms(5),
  },
  genderImage: {
    marginTop: ms(10),
    marginLeft: ms(6),
  },
  distanceText: {
    fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
    color: "#ACACAC",
    position: "absolute",
    bottom: 1,
    right: 10,
  },
  note: {
    fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: ms(25),
  },
});