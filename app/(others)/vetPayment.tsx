import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Payment() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const starImages = [
    require("../../assets/images/poor.png"),
    require("../../assets/images/better.png"),
    require("../../assets/images/neutral.png"),
    require("../../assets/images/good.png"),
    require("../../assets/images/excited.png"),
  ];
  const filledStarImages = [
    require("../../assets/images/poor_fill.png"),
    require("../../assets/images/better_fill.png"),
    require("../../assets/images/neutral_fill.png"),
    require("../../assets/images/good_fill.png"),
    require("../../assets/images/excited_fill.png"),
  ];
  const [comment, setComment] = useState<string>("");

  const isPayButtonDisabled = rating === 0 || comment.trim() === "";

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
          <Text style={styles.navText}>Payment</Text>
        </View>
        <View style={styles.scrollContainer}>
           <TouchableWithoutFeedback onPress={dismissKeyboard}>
             <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Service</Text>
            <Text style={styles.value}>
              Surgery (Spaying)
            </Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={[styles.label, { alignSelf: "center" }]}>Doctor</Text>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.value}>
                Dr. Asad
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.ReviewContainer}>
          <Text style={styles.reviewText}>Tell us about your experience?</Text>
          <View style={styles.stars}>
            {starImages.map((_image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
              >
                <Image
                  source={
                    rating > index ? filledStarImages[index] : starImages[index]
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
                placeholder="Dr. Asad is professional, caring, & ......"
                style={styles.commentBox}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={comment}
                onChangeText={setComment}
                multiline={true}
              />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Total amount</Text>
            <Text style={[styles.value, { fontSize: 14 }]}>PKR 15499.00</Text>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.paymentCard}>
              <Image
                source={require("../../assets/images/Apple Pay.png")}
                style={styles.paymentIcon}
              />
            </View>
            <Text style={styles.paymentCardText}>Apple Pay</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.payButton, isPayButtonDisabled && styles.disabledButton]} disabled={isPayButtonDisabled}>
            <Text style={styles.payText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
  navText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "50%",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    marginBottom: 28,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#939393",
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
    color: "#ACACAC",
  },
  ReviewContainer: {
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    marginBottom: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#5B555C",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 24,
    marginTop: 6,
  },
  starIcon: {
    width: 44,
    height: 44,
    marginHorizontal: 4,
  },
  commentBox: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 400,
  },
  paymentCard: {
    width: 43,
    height: 30,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentIcon: {
    width: 30,
    height: 12,
  },
  paymentCardText: {
    fontSize: 16,
    fontWeight: 600,
    flex: 1,
    alignSelf: "center",
    color: "#939393",
  },
  changeButton: {
    backgroundColor: "#C9EFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  changeText: {
    fontSize: 14,
    color: "#2bbfff",
    fontWeight: 700,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, // Change to 50 if needed
    width: "100%",
  },
  payButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
});