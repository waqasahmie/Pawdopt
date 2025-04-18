import React, { useRef, useState } from "react";
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

interface VetTimingProps {
  startHour: number;
  endHour: number;
}

export default function VetProfileScreen() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const generateDateData = (): {
    day: string;
    date: string;
    status: string;
  }[] => {
    const data = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const day = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g. Wed
      const dateNumber = date.getDate().toString(); // e.g. 16

      // Random status for demo (you'll use real from backend)
      const status = Math.random() > 0.6 ? "booked" : "available";

      data.push({
        day,
        date: dateNumber,
        status,
      });
    }

    return data;
  };

  const [dateData, setDateData] = useState(generateDateData());

  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTime, setselectedTime] = useState<Date | null>(null);
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        <Image
          source={require("../../assets/images/vet1.jpg")} // Replace with your hosted image
          style={styles.topImage}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { zIndex: 10 }]}
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
              <Text style={styles.doctorName}>Dr. Asad</Text>
              <Text style={styles.clinicName}>
                Model Town Pet Clinic Pet Clinic
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconBtn}>
                <HugeiconsIcon icon={Video02Icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <HugeiconsIcon icon={Call02Icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <HugeiconsIcon icon={BubbleChatIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <HugeiconsIcon icon={Clock01Icon} />
              <View style={styles.flexColumn}>
                <Text style={styles.statValue}>8 Years</Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <HugeiconsIcon icon={UserMultipleIcon} />
              <View style={styles.flexColumn}>
                <Text style={styles.statValue}>3.5k+</Text>
                <Text style={styles.statLabel}>Patients</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <HugeiconsIcon icon={StarIcon} />
              <View style={styles.flexColumn}>
                <Text style={styles.statValue}>2.8k+</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
            </View>
          </View>
          <View style={styles.overlayInnerContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionTitle}>Choose Date</Text>
              <View style={styles.dateRow}>
                {dateData.map((item, index) => {
                  const isSelected = selectedDateIndex === index;
                  const isBooked = item.status === "booked";

                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => {
                        if (!isBooked) {
                          setSelectedDateIndex(index);
                        }
                      }}
                    >
                      <View style={styles.dateBox}>
                        <View
                          style={[
                            styles.circle,
                            isBooked && {
                              borderColor: "#ccc",
                              backgroundColor: "#f0f0f0",
                            },
                            isSelected &&
                              !isBooked && {
                                backgroundColor: "#2bbfff",
                                borderColor: "#2bbfff",
                              },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dateNumber,
                              isBooked && { color: "#999" },
                              isSelected &&
                                !isBooked && {
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
                              backgroundColor: isBooked ? "#FF3333" : "#00CC66",
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
                      dates={dates}
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
              >
                <Text style={styles.bookBtnText}>Book Appointment</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
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
    height: "80%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
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
    top: 50,
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
    top: 300,
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
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
  clinicName: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 5,
  },
  iconBtn: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 30,
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
    fontSize: 14,
    color: "#2bbfff",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "400",
  },
  overlayInnerContainer: {
    paddingTop: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    height: "70%",
  },
  sectionTitle: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "400",
  },
  dateDay: {
    fontSize: 12,
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
    gap: 20,
    width: "75%",
    borderRadius: 15,
    marginVertical: 20,
  },
  statusInnerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 12,
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
    fontSize: 14,
  },

  confirmedTimeBox: {
    marginVertical: 10,
    minHeight: 30,
    flexDirection: "row",
    gap: 10,
  },

  confirmedTimeLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#939393",
  },

  confirmedTimeValue: {
    fontSize: 16,
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
    fontSize: 16,
  },
});
