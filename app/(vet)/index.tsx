import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  AiBrain01Icon,
  BodyPartLegIcon,
  Cardiogram02Icon,
  DentalToothIcon,
  MaskIcon,
  Shield01Icon,
  Shield02Icon,
  StarIcon,
  TimeQuarter02Icon,
} from "@hugeicons/core-free-icons";
import { s, vs, ms } from "react-native-size-matters";
import { router } from "expo-router";

const bannerData = [
  {
    image: require("../../assets/images/vetBannerOne.png"),
    title: "Stay at Home!",
    description: "We are here to help you with online consultancy.",
    buttonText: "Meet Online",
  },
  {
    image: require("../../assets/images/vetBannerTwo.png"),
    title: "In-Clinic Appt.",
    description: "We are here to serve your pet.",
    buttonText: "Book Now",
  },
  {
    image: require("../../assets/images/vetBannerThree.png"),
    title: "Laboratory Tests",
    description: "We are here to help you discover any abnormalities",
    buttonText: "Apply Now",
  },
];
const width = 330;
const BANNER_HEIGHT = 151;
const AUTO_SCROLL_INTERVAL = 3000;

const allVets = [
  {
    id: 1,
    name: "Dr Asad",
    clinicName: "Model Town Pets Clinic",
    rating: 5.0,
    startTime: "11AM",
    endTime: "10PM",
    distance: "1.7km Away",
    image: require("../../assets/images/vet1.jpg"),
  },
  {
    id: 2,
    name: "Dr Sara",
    clinicName: "Rehman Veterinary Clinic",
    rating: 4.8,
    startTime: "12AM",
    endTime: "05PM",
    distance: "1.7km Away",
    image: require("../../assets/images/vet2.jpg"),
  },
  {
    id: 3,
    name: "Dr Rabia",
    clinicName: "City Vets Pet Clinic",
    rating: 4.7,
    startTime: "09AM",
    endTime: "10PM",
    distance: "1.7km Away",
    image: require("../../assets/images/vet3.jpg"),
  },
  {
    id: 4,
    name: "Dr Saif",
    clinicName: "Mercy Pets Care Clinic, Lahore",
    rating: 4.9,
    startTime: "10AM",
    endTime: "06PM",
    distance: "1.7km Away",
    image: require("../../assets/images/vet4.jpg"),
  },
];

const speciality = [
  { icon: MaskIcon, label: "Surgeon" },
  { icon: Cardiogram02Icon, label: "Cardio" },
  { icon: AiBrain01Icon, label: "Neuro" },
  { icon: BodyPartLegIcon, label: "Ortho" },
  { icon: DentalToothIcon, label: "Dental" },
];

export default function VetScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndex = useRef(0);
  const [activeDot, setActiveDot] = useState(0);
  const dotAnimations = useRef(
    bannerData.map(() => new Animated.Value(6))
  ).current;

  const [currentBanner, setCurrentBanner] = useState(bannerData[0]);

  useEffect(() => {
    dotAnimations[0].setValue(18);

    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % bannerData.length;

      // Animate dots first
      dotAnimations.forEach((dot, i) => {
        Animated.timing(dot, {
          toValue: i === nextIndex ? 18 : 6,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });

      // Sequence fade out and content change
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(50), // optional delay to make fade-in smoother
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      // Change content in between fade-out and fade-in
      setTimeout(() => {
        currentIndex.current = nextIndex;
        setCurrentBanner(bannerData[nextIndex]);
        setActiveDot(nextIndex);
      }, 100); // sync with fade-out
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.wrapper}>
            <Animated.Image
              source={currentBanner.image}
              style={[styles.bannerImage, { opacity: fadeAnim }]}
            />

            <Animated.View
              style={[styles.textContainer, { opacity: fadeAnim }]}
            >
              <Text style={styles.bannerTitle}>{currentBanner.title}</Text>
              <Text style={styles.bannerDescription}>
                {currentBanner.description}
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.buttonText}>
                  {currentBanner.buttonText}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Pagination Outside */}
          <View style={styles.paginationContainer}>
            {bannerData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotAnimations[index],
                    backgroundColor: activeDot === index ? "#2DBCFB" : "#ccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.vaccineBanner}>
          <HugeiconsIcon
            icon={Shield02Icon}
            color="#ffffff"
            strokeWidth={2}
            size={30}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>Get Vaccinated Now!</Text>
            <Text style={styles.subTitle}>Fight FVRCP & Rabbies Together </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Vet Speciality</Text>
          <View style={styles.specialityRow}>
            {speciality.map((item, index) => (
              <View key={index}>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.specialityItem}>
                    <HugeiconsIcon icon={item.icon} size={30} color="#2bbfff" />
                  </View>
                  <Text style={styles.specialityLabel}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {allVets.map((vet) => (
              <TouchableOpacity
                key={vet.id}
                style={styles.vetCard}
                onPress={() => router.push("./vetDetail")}
              >
                <Image source={vet.image} style={styles.petImage} />
                <View style={styles.petInfo}>
                  <Text style={styles.name}>{vet.name}</Text>
                  <View style={styles.nameInfo}>
                    <Text style={styles.clinicName}>
                      {vet.clinicName.length > 10
                        ? vet.clinicName.substring(0, 10) + "..."
                        : vet.clinicName}
                    </Text>
                    <View>
                      <HugeiconsIcon
                        icon={StarIcon}
                        size={14}
                        fill={"#2bbfff"}
                        color={"#2bbfff"}
                      />
                    </View>
                    <Text style={styles.rating}>{vet.rating}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <HugeiconsIcon
                      icon={TimeQuarter02Icon}
                      size={18}
                      color={"#2bbfff"}
                    />
                    <Text style={styles.time}>
                      {vet.startTime} - {vet.endTime}
                    </Text>
                  </View>
                  <Text style={styles.distanceText}>{vet.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          </ScrollView>
        </View>
      </View>
    </Animated.View>
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
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "125%" : "154%",
  },
  wrapper: {
    width: width,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 8,
    marginTop: 20,
  },
  bannerImage: {
    width: "45%",
    height: "100%",
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
    height: "100%",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 6,
  },
  bannerDescription: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    width: "100%",
  },
  bannerButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#2bbfff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  paginationContainer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  vaccineBanner: {
    width: width,
    height: "10%",
    backgroundColor: "#2bbfff",
    alignSelf: "center",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  title: { fontSize: 18, color: "#fff", fontWeight: "600", marginBottom: 5 },
  subTitle: { fontSize: 12, color: "#fff", fontWeight: "400" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  specialityRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  specialityItem: {
    alignItems: "center",
    justifyContent: "center",
    //padding: 12,
    backgroundColor: "#C9EFFF",
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  specialityLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
  },
  vetCard: {
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
  name: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize: Platform.OS === "ios" ? ms(26) : ms(21),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  clinicName: {
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    color: "#ACACAC",
    fontWeight: "500",
    marginRight: 8,
    marginTop: 5,
  },
  rating: {
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    color: "#ACACAC",
    fontWeight: "500",
    marginLeft: 5,
  },
  timeContainer: {
    width: 125,
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginTop: 15,
    flexDirection: "row",
    gap: 5,
  },
  time: {
    fontSize: Platform.OS === "ios" ? ms(13) : ms(10),
    fontWeight: "400",
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
