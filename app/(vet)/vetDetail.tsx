import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Clock } from "@/components/utils/clock";
import { TimeRange } from "@/components/utils/time-range";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  BubbleChatIcon,
  Call02Icon,
  Clock01Icon,
  StarIcon,
  UserMultipleIcon,
  Video02Icon,
} from "@hugeicons/core-free-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useAppContext, UserData } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";

interface VetTimingProps {
  startHour: number;
  endHour: number;
}

const { height } = Dimensions.get("window");

export default function VetProfileScreen() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const { id } = useLocalSearchParams<{ id: string }>();
  const [vetData, setVetData] = useState<DocumentData | null>(null);
  const [timeSlots, setTimeSlots] = useState<Date[]>([]);
  const [bookedTimes, setBookedTimes] = useState<number[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const { userData } = useAppContext();
  const [ratingCount, setRatingCount] = useState<number | null>(null);
  const [patientCount, setPatientCount] = useState<number | null>(null);


  const toastRef = useRef<any>({});

  const handleChatNavigation = () => {
    if (!id) return;
    const ids = [user?.id, id].sort();
    const newChatId = `${ids[0]}_${ids[1]}`;
    setChatId(newChatId);
    router.push({
      pathname: "/(chat)/[chat]", 
      params: { chat: newChatId },
    });
  };

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("vetId", "==", id)
        );
  
        const snapshot = await getDocs(q);
        setPatientCount(snapshot.size); 
      } catch (error) {
        setPatientCount(0);
      }
    };
  
    if (id) fetchPatientCount();
  }, [id]);
  

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const reviewDocRef = doc(db, "reviews", id); 
        const docSnap = await getDoc(reviewDocRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRatingCount(data.ratingCount || 0);
        } else {
          setRatingCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch rating count:", error);
      }
    };
  
    if (id) fetchRating();
  }, [id]);
  

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    const fetchVet = async () => {
      const vetDoc = await getDoc(doc(db, "users", id));
      if (vetDoc.exists()) {
        setVetData(vetDoc.data());
      }
    };
    fetchVet();
  }, [id]);

  useEffect(() => {}, [vetData]);

  const generateDateData = (): {
    day: string;
    date: string;
    fullDate: Date;
    fullyBooked: boolean;
  }[] => {
    const data: any[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      data.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate().toString(),
        fullDate: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
        fullyBooked: false,
      });
    }

    return data;
  };

  function minutesFromString(t: string) {
    const cleaned = t.replace(/\s+/g, " ").trim();
    const [timePart, meridiem] = cleaned.split(" ");
    const parts = timePart.split(":");
    let h = parseInt(parts[0], 10);
    const m = parseInt(parts[1] ?? "0", 10);

    const ampm = meridiem?.toLowerCase();
    if (ampm === "pm" && h < 12) h += 12;
    if (ampm === "am" && h === 12) h = 0;

    return h * 60 + m;
  }

  const [dateData, setDateData] = useState(generateDateData());
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null
  );
  useEffect(() => {
    if (
      selectedDateIndex === null ||
      timeSlots.length === 0 ||
      !dateData[selectedDateIndex]
    ) {
      setBookedTimes([]);
      setAvailableSlots(timeSlots);
      return;
    }

    const loadDaySlots = async () => {
      const day = dateData[selectedDateIndex].fullDate;
      const startOfDay = new Date(day);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(day);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "appointments"),
        where("vetId", "==", id),
        where("appointmentDate", ">=", Timestamp.fromDate(startOfDay)),
        where("appointmentDate", "<=", Timestamp.fromDate(endOfDay))
      );
      const snap = await getDocs(q);

      const bookedMins = new Set<number>(
        snap.docs.map((d) =>
          minutesFromString(d.data().appointmentTime as string)
        )
      );

      const free = timeSlots.filter((slot) => {
        const mins = slot.getHours() * 60 + slot.getMinutes();
        return !bookedMins.has(mins);
      });

      setBookedTimes(Array.from(bookedMins)); 
      setAvailableSlots(free);
    };

    loadDaySlots();
  }, [selectedDateIndex, timeSlots, dateData, id]);

  useEffect(() => {
    if (!vetData) return;

    const start = vetData.startTime.toDate();
    const end = vetData.endTime.toDate();
    const slots: Date[] = [];
    const cursor = new Date();
    cursor.setHours(start.getHours(), start.getMinutes(), 0, 0);

    const endCursor = new Date();
    endCursor.setHours(end.getHours(), end.getMinutes(), 0, 0);

    while (cursor <= endCursor) {
      slots.push(new Date(cursor));
      cursor.setTime(cursor.getTime() + 30 * 60 * 1000);
    }

    setTimeSlots(slots);
  }, [vetData]);

  useEffect(() => {
    if (!vetData || timeSlots.length === 0) return;

    const loadWeekStatus = async () => {
      const updated = await Promise.all(
        dateData.map(async (dayEntry) => {
          const startOfDay = new Date(dayEntry.fullDate);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(dayEntry.fullDate);
          endOfDay.setHours(23, 59, 59, 999);

          const q = query(
            collection(db, "appointments"),
            where("vetId", "==", id),
            where("appointmentDate", ">=", Timestamp.fromDate(startOfDay)),
            where("appointmentDate", "<=", Timestamp.fromDate(endOfDay))
          );
          const snap = await getDocs(q);
          const bookedCount = snap.size;

          return {
            ...dayEntry,
            fullyBooked: bookedCount >= timeSlots.length,
          };
        })
      );
      setDateData(updated);
    };

    loadWeekStatus();
  }, [vetData, timeSlots]);

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTime, setselectedTime] = useState<Date | null>(null);
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);
  const { user } = useUser();
  const patientId = user ? user.id : null;

  const isButtonDisabled = selectedDateIndex === null || selectedTime === null;

  const getFormattedDateTime = () => {
    if (selectedDateIndex === null || !selectedTime) return null;

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + selectedDateIndex);

    const day = baseDate.toLocaleDateString("en-US", { weekday: "short" });
    const month = baseDate.toLocaleDateString("en-US", { month: "long" });
    const date = baseDate.getDate();

    const time = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}, ${month} ${date} at ${time}`;
  };

  const TimezoneOffsetMs = -new Date().getTimezoneOffset() * 60000;

  // Replace this block:
  const vetTiming: VetTimingProps = { startHour: 9, endHour: 17 };
  const dates = [];
  for (let hour = vetTiming.startHour; hour <= vetTiming.endHour; hour++) {
    dates.push(new Date(2025, 0, 1, hour, 0)); // :00
    if (hour !== vetTiming.endHour) {
      dates.push(new Date(2025, 0, 1, hour, 30)); // :30
    }
  }

  const date = useSharedValue(dates[0].getTime());
  const clockDate = useDerivedValue(() => {
    "worklet";
    return date.value + TimezoneOffsetMs;
  });

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setLiked(!liked);
  };

  const bookAppointment = async (
    vetId: string,
    selectedDate: any,
    selectedTime: any
  ) => {
    if (!patientId) {
      return;
    }

    try {
      const namme = `${userData?.firstName ?? ""} ${
        userData?.lastName ?? ""
      }`.trim();
      const today = new Date();
      const selectedDay = selectedDate; // your selected day
      const fullDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        selectedDay
      );

      // Proceed with booking the appointment without checking for availability
      const docRef = await addDoc(collection(db, "appointments"), {
        vetId, // Vet's ID
        patientId, // Patient's ID (from Clerk)
        appointmentDate: Timestamp.fromDate(fullDate), // Date of appointment
        appointmentTime: selectedTime, // Time of appointment
        status: "pending",
        name: namme,
        picture: userData?.profilePicUrl,
        createdAt: Timestamp.now(), // Automatically set the timestamp
      });

      const cleanedTime = selectedTime.replace(/[\u202F\u00A0]/g, " ").trim();

      // Split by space to separate time and am/pm parts
      const [timePart, period] = cleanedTime.split(" "); // e.g. ["1:00:00", "am"]

      // Remove seconds from timePart
      const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":");

      // Recombine with am/pm
      const formattedTime = `${timeWithoutSeconds} ${period}`;

      const fullDatee = new Date(
        today.getFullYear(),
        today.getMonth(),
        selectedDate
      );
      const formattedDate = fullDatee.toISOString().split("T")[0]; // "YYYY-MM-DD"
      const ownerUserRef = doc(db, "users", vetId);
      const ownerSnap = await getDoc(ownerUserRef);
      if (ownerSnap.exists()) {
        const { expoPushToken , loggedIn } = ownerSnap.data();
        const title = "You have a new appointment";
        const description = `${namme} requested an appointment at ${formattedTime} on ${formattedDate}`;
        if (expoPushToken && loggedIn) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: expoPushToken,
              sound: "default",
              title,
              body: description,
              data: { vetId },
            }),
          });
        }
        const ownerNotifRef = collection(db, "users", vetId, "notifications");
        await addDoc(ownerNotifRef, {
          title,
          description,
          timestamp: serverTimestamp(),
          read: false,
          date: formattedDate,
          time: formattedTime,
          app: "abc",
        });
      }

      toastRef.current.show({
        type: "success",
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked!",
      });
    } catch (e) {
      toastRef.current.show({
        type: "error",
        title: "Booking Failed",
        description: "Error booking appointment. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        <Image
          source={{ uri: vetData?.profilePicUrl }}
          style={styles.topImage}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton]}
        >
          <MaterialIcons
            style={{ right: 1 }}
            name="arrow-back-ios-new"
            size={16}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartButton} onPress={animateHeart}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              style={{ top: 1 }}
              color={liked ? "red" : "black"}
            />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.overlayContainer}>
          <View style={styles.topSection}>
            <View style={styles.detailsContainer}>
              <Text style={styles.doctorName}>
                {vetData?.title} {vetData?.firstName}{" "}
                {vetData?.lastName ? vetData.lastName : ""}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (vetData?.latitude && vetData?.longitude) {
                    const url = `https://www.google.com/maps/search/?api=1&query=${vetData.latitude},${vetData.longitude}`;
                    Linking.openURL(url);
                  } else {
                    toastRef.current.show({
                      type: "error",
                      title: "Location Error",
                      description: "Location not available.",
                    });
                  }
                }}
              >
                <Text style={styles.clinicName}>
                  {vetData?.clinicName || "Clinic name not available"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={handleChatNavigation}
              >
                <HugeiconsIcon icon={BubbleChatIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <HugeiconsIcon icon={Clock01Icon} />
              <View style={styles.flexColumn}>
                <Text style={styles.statValue}>{vetData?.experience ?? 0}</Text>

                <Text style={styles.statLabel}>Experience</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <HugeiconsIcon icon={UserMultipleIcon} />
              <View style={styles.flexColumn}>
                <Text style={styles.statValue}>{patientCount !== null ? `${patientCount}` : "Loading..."}</Text>
                <Text style={styles.statLabel}>Patients</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/(others)/vetReviews?id=${id}`)}
              activeOpacity={0.8}
            >
              <View style={styles.statBox}>
                <HugeiconsIcon icon={StarIcon} />
                <View style={styles.flexColumn}>
                  <Text style={styles.statValue}>{ratingCount !== null ? `${ratingCount}` : "Loading..."}</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.overlayInnerContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionTitle}>Choose Date</Text>
              <View style={styles.dateRow}>
                {dateData.map((item, index) => {
                  const isFullyBooked = item.fullyBooked; // <-- declare the flag
                  const isSelected = selectedDateIndex === index;

                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => {
                        if (!isFullyBooked) {
                          setSelectedDateIndex(index);
                        }
                      }}
                    >
                      <View style={styles.dateBox}>
                        <View
                          style={[
                            styles.circle,
                            isFullyBooked && {
                              borderColor: "#ccc",
                              backgroundColor: "#f0f0f0",
                            },
                            isSelected &&
                              !isFullyBooked && {
                                backgroundColor: "#2bbfff",
                                borderColor: "#2bbfff",
                              },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dateNumber,
                              isFullyBooked && { color: "#999" },
                              isSelected &&
                                !isFullyBooked && {
                                  color: "#fff",
                                  fontWeight: "600",
                                },
                            ]}
                          >
                            {item.date}
                          </Text>
                        </View>
                        <Text style={styles.dateDay}>{item.day}</Text>
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor: isFullyBooked
                                ? "#FF3333"
                                : "#00CC66",
                            },
                          ]}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
              <View style={styles.statusRow}>
                <View style={styles.statusInnerRow}>
                  <View
                    style={[styles.statusDot, { backgroundColor: "#FF3333" }]}
                  />
                  <Text style={styles.statusText}>Fully Booked</Text>
                </View>
                <View style={styles.statusInnerRow}>
                  <View
                    style={[styles.statusDot, { backgroundColor: "#00CC66" }]}
                  />
                  <Text style={styles.statusText}>Available</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Choose Time</Text>
              <View style={styles.flexColumn}>
                <ScrollView
                  horizontal
                  nestedScrollEnabled={false} // Allow nested scrolling
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.TimingContainer}>
                    <Clock date={clockDate} size={100} />
                    <TimeRange
                      dates={availableSlots}
                      onDateChange={(updatedDate) => {
                        "worklet";
                        date.value = updatedDate;
                      }}
                    />
                  </View>
                </ScrollView>
                <View>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      if (selectedDateIndex !== null && date.value) {
                        const selected = new Date(date.value);
                        setselectedTime(selected);
                        setIsTimeConfirmed(true);
                        setErrorMessage(""); // Clear error if successful
                      } else {
                        setErrorMessage(
                          "Nothing is selected! Please choose a date and time."
                        );
                      }
                    }}
                  >
                    <Text style={styles.confirmBtnText}>Save</Text>
                  </TouchableOpacity>
                  {errorMessage !== "" && (
                    <Text style={{ color: "red" }}>{errorMessage}</Text>
                  )}

                  <View style={styles.confirmedTimeBox}>
                    <Text style={styles.confirmedTimeLabel}>
                      Appointment Details:
                    </Text>

                    {isTimeConfirmed && (
                      <Text style={styles.confirmedTimeValue}>
                        {getFormattedDateTime()}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.bookButton,
                  isButtonDisabled && { backgroundColor: "#ccc" },
                ]} // Disabled style
                disabled={isButtonDisabled}
                onPress={() => {
                  if (selectedDateIndex !== null && date.value) {
                    const selectedDate = dateData[selectedDateIndex].date;
                    const selected = new Date(date.value);
                    setselectedTime(selected);
                    setIsTimeConfirmed(true);
                    setErrorMessage(""); // Clear error if successful

                    // Call bookAppointment when the user clicks the button
                    bookAppointment(
                      id,
                      selectedDate,
                      selected.toLocaleTimeString()
                    );
                  } else {
                    setErrorMessage(
                      "Something missing! Please choose a date and time."
                    );
                  }
                }}
              >
                <Text style={styles.bookBtnText}>Book Appointment</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
      <Toast ref={toastRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FBFF",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  flexColumn: {
    flexDirection: "column",
  },
  topImage: {
    width: "100%",
    height: height * 0.7,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
  },
  heartButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
  },
  overlayContainer: {
    position: "absolute",
    top: height * 0.4,
    width: "100%",
    backgroundColor: "rgba(227, 227, 227, 0.5)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft:20,
  },
  doctorName: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "600",
    color: "#fff",
  },
  clinicName: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: "400",
    color: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconBtn: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 30,
    marginRight:20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 8,
  },
  statBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    gap: 4,
  },
  statValue: {
    fontWeight: "400",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#2bbfff",
  },
  statLabel: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(9) : responsive.fontSize(7),
    fontWeight: "400",
  },
  overlayInnerContainer: {
    paddingTop: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    height: height * 0.85,
  },
  sectionTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateBox: {
    alignItems: "center",
    gap: 4,
  },
  circle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  dateNumber: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "400",
  },
  dateDay: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#555",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "rgba(229, 229, 229, 0.4)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    gap: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  statusInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: "400",
    color: "#939393",
  },
  TimingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    marginVertical: 10,
    marginLeft: 60,
  },
  confirmBtn: {
    backgroundColor: "#111111",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
  },

  confirmBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },

  confirmedTimeBox: {
    marginVertical: 10,
    minHeight: 30,
    flexDirection: "row",
    gap: 10,
  },

  confirmedTimeLabel: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#939393",
  },

  confirmedTimeValue: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  bookButton: {
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
    marginBottom: "110%",
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
});
