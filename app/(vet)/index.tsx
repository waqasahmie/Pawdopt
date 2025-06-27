import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  FlatList,
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
import { router, useFocusEffect } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; 
import * as Location from "expo-location";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import { useUser } from "@clerk/clerk-expo";

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

interface Vet {
  id: string;
  name: string;
  clinicName: string;
  rating: number;
  startTime: string;
  endTime: string;
  image: { uri: string };
  longitude: number;
  latitude: number;
  address: string;
}

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
  const { user } = useUser();
  const dotAnimations = useRef(
    bannerData.map(() => new Animated.Value(6))
  ).current;
  const [vetsData, setVetsData] = useState<Vet[]>([]);
  const { userData } = useAppContext();
  const getRandomFloat = (
    min: number,
    max: number,
    decimals: number = 1
  ): number => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  };

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "vet"));
        const querySnapshot = await getDocs(q);
        const vets: Vet[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          vets.push({
            id: doc.id,
            name: `${data.title || ""} ${data.firstName} ${data.lastName}`,
            clinicName: data.clinicName,
            rating: getRandomFloat(2.0, 5.0),
            startTime: formatTime(data.startTime),
            endTime: formatTime(data.endTime),
            image: { uri: data.profilePicUrl }, 
            longitude: data.longitude,
            latitude: data.latitude,
            address: data.address,
          });
        });
        setVetsData(vets);
      } catch (error) {
        console.log("Error fetching vets: ", error);
      }
    };

    fetchVets();
  }, []);

  const formatTime = (timestamp: { toDate: () => any }) => {
    if (!timestamp?.toDate) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
        Animated.delay(50), 
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        currentIndex.current = nextIndex;
        setCurrentBanner(bannerData[nextIndex]);
        setActiveDot(nextIndex);
      }, 100); 
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkCompletedAppointments = async () => {
        if (!user?.id) return;

        try {
          const appointmentsRef = collection(db, "appointments");
          const q = query(
            appointmentsRef,
            where("patientId", "==", user.id),
            where("status", "==", "completed"),
            where("fees", "!=", null)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            const bookingId = firstDoc.id;
            router.replace({
              pathname: "/(others)/vetPayment",
              params: { bookingId },
            });
          }
        } catch (error) {
          console.log("Error checking completed appointments:", error);
        }
      };

      checkCompletedAppointments();
    }, [user?.id, router])
  );

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return parseFloat(distance.toFixed(1));
  };

  const renderVetItem = ({ item: vet }: { item: any }) => {
    const vetLat = Number(vet.latitude);
    const vetLon = Number(vet.longitude);
    const userLat = Number(userData?.latitude);
    const userLon = Number(userData?.longitude);

    const distance =
      userLat && userLon && vetLat && vetLon
        ? getDistanceFromLatLonInKm(userLat, userLon, vetLat, vetLon)
        : null;

    return (
      <TouchableOpacity
        style={styles.vetCard}
        onPress={() => router.push(`/vetDetail?id=${vet.id}`)}
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
            <HugeiconsIcon
              icon={StarIcon}
              size={14}
              fill={"#2bbfff"}
              color={"#2bbfff"}
            />
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
          <Text style={styles.distanceText}>
            {distance != null ? `${distance} km away` : "Distance unavailable"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

        <FlatList
          data={vetsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVetItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            vetsData.length === 0
              ? { flex: 1,alignItems: "center" }
              : undefined
          }
          ListEmptyComponent={
            <Text style={styles.noAppointmentText}>No vets found</Text>
          }
          ListFooterComponent={
            vetsData.length > 0 ? (
              <Text style={styles.note}>
                Looks like you've reached the end!
              </Text>
            ) : null
          }
        />
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
    paddingHorizontal: 20,
    gap: 20,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "125%" : "124%",
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "500",
    marginBottom: 6,
  },
  bannerDescription: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#fff",
    fontWeight: "600",
    marginBottom: 5,
  },
  subTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    color: "#fff",
    fontWeight: "400",
  },
  sectionTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "600",
    marginBottom: 10,
  },
  specialityRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  specialityItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C9EFFF",
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  specialityLabel: {
    marginTop: 6,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "500",
  },
  vetCard: {
    flexDirection: "row",
    marginBottom: 25,
    marginTop: 2,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 145,
    height: 170,
    borderRadius: 14,
  },
  petInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
  name: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  clinicName: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#ACACAC",
    fontWeight: "500",
    marginRight: 8,
    marginTop: 5,
  },
  rating: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#ACACAC",
    fontWeight: "500",
    marginLeft: 5,
  },
  timeContainer: {
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginTop: 15,
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 5,
  },
  time: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: "400",
  },
  genderImage: {
    marginTop: 10,
    marginLeft: 6,
  },
  distanceText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    color: "#ACACAC",
    position: "absolute",
    bottom: 1,
    right: 10,
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 25,
  },
  noAppointmentText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 25,
  },
});
