import { FemaleSymbolIcon, MaleSymbolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  PanResponder,
  RefreshControl,
  BackHandler,
  FlatList,
  StatusBar,
} from "react-native";
import { ListModal } from "@/components/utils/listModal";
import { PetCategoryBS } from "@/components/utils/petCategoryBS";
import { CatBreedBS } from "@/components/utils/catBreedBS";
import { DogBreedBS } from "@/components/utils/dogBreedBS";
import { ParrotBreedBS } from "@/components/utils/parrotBreedBS";
import { PetImages } from "@/components/utils/petImagesBS";
import { PetDescription } from "@/components/utils/petDescriptionBS";
import { PetInfoBS } from "@/components/utils/petInfoBS";
import { PetSubmitted } from "@/components/utils/petSubmitted";
import { Easing } from "react-native-reanimated";
import { db } from "../../config/firebaseConfig";
import { doc, setDoc, where, query, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs } from "firebase/firestore";
import { useAppContext } from "@/hooks/AppContext";
import { registerForPushNotificationsAsync } from "../../components/utils/notifications";
import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-modules-core";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";

const width = 336;
const BANNER_HEIGHT = 140;
const AUTO_SCROLL_INTERVAL = 3000;
type Pet = {
  id: string;
  name: string;
  category: string;
  gender: string;
  breed: string;
  image: string;
  latitude: number;
  longitude: number;
};

export default function PetAdoptionScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndex = useRef(0);
  const [activeDot, setActiveDot] = useState(0);
  const [petCategoryBSOpen, setPetCategoryBSOpen] = useState(false);
  const [petImagesBSOpen, setPetImagesBSOpen] = useState(false);
  const [petDescriptionBSOpen, setPetDescriptionBSOpen] = useState(false);
  const [petInfoBSOpen, setPetInfoBSOpen] = useState(false);
  const [petSubmittedOpen, setPetSubmittedOpen] = useState(false);
  const [petSelectedCategory, setPetSelectedCategory] = useState("");
  const [dogBreedOpen, setDogBreedOpen] = useState(false);
  const [catBreedOpen, setCatBreedOpen] = useState(false);
  const [parrotBreedOpen, setParrotBreedOpen] = useState(false);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { userData, fetchUserData, resetPetListingData, setIsEdit, isEdit } =
    useAppContext();
  const { user } = useUser();
  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);
  const toastRef = useRef<any>({});

  useEffect(() => {
    if (user?.id) {
      const updateLoggedInStatus = async () => {
        await updateDoc(doc(db, "users", user.id), {
          loggedIn: true,
        });
      };
      updateLoggedInStatus();
    }
  }, [user?.id]);
  
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
          toastRef.current.show({
            type: "error",
            title: "Oops!",
            description: "Couldn't check completed appointments.",
          });
        }
      };

      checkCompletedAppointments();
    }, [user?.id, router])
  );

  useEffect(() => {
    if (user) {
      const setup = async () => {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          await setDoc(
            doc(db, "users", user.id),
            { expoPushToken: token },
            { merge: true }
          );
        }

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            console.log("Foreground notification:", notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("User tapped notification:", response);
          });
      };

      setup();

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    }
  }, [user]);
  if (!userData || userData.role === null) {
    fetchUserData();
  }

  const [role, setRole] = useState<string>("");
  const normalizeCategory = (type: string) => {
    if (type === "Cat") return "Cats";
    if (type === "Dog") return "Dogs";
    if (type === "Parrot") return "Parrots";
    return type;
  };
  const fetchPets = async () => {
    try {
      const snapshot = await getDocs(collection(db, "petlistings"));
      const pets = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          category: normalizeCategory(data.category),
          gender: data.gender,
          breed: Array.isArray(data.breed) ? data.breed[0] : data.breed,
          size: { width: 16, height: 16 },
          image: data.image?.[0],
          latitude: data.latitude,
          longitude: data.longitude,
        };
      });
      setAllPets(pets);
    } catch (error) {
      toastRef.current.show({
        type: "error",
        title: "Something Went Wrong",
        description: "We couldn't load the pets. Try again shortly.",
      });
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS !== "android") return;

      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPets();
    setRefreshing(false);
  };
  useEffect(() => {
    if (userData) {
      setRole(userData.role ?? "");
    }
  }, [userData]);

  const swipeTextOpacity = useRef(new Animated.Value(0)).current;
  const swipeTextTranslateX = useRef(new Animated.Value(20)).current;

  const fetchBanners = async () => {
    const bannerNames = ["bannerOne.png", "bannerTwo.png", "bannerThree.png"];

    const urls = bannerNames.map((name) => {
      return `https://xzrkiwwkrdhsurcqjwrt.supabase.co/storage/v1/object/public/user-documents/banners/${name}`;
    });

    setBannerImages(urls);
    setCurrentImage(urls[0]);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        // Slide from right to center with fade in
        Animated.parallel([
          Animated.timing(swipeTextOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(swipeTextTranslateX, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        // Hold in center
        Animated.delay(1000),

        // Slide slightly left
        Animated.timing(swipeTextTranslateX, {
          toValue: -10,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        // Fade out and slide smoothly back to right
        Animated.parallel([
          Animated.timing(swipeTextOpacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(swipeTextTranslateX, {
            toValue: 30,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.delay(500),
      ]).start(() => loopAnimation());
    };

    loopAnimation();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy);
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          resetPetListingData();
          setIsEdit("false");
          setPetCategoryBSOpen(true);
        }
      },
    })
  ).current;

  const dotAnimations = useRef([
    new Animated.Value(6),
    new Animated.Value(6),
    new Animated.Value(6),
  ]).current;

  useEffect(() => {
    if (bannerImages.length > 0) {
      dotAnimations[0].setValue(18);
    }
  }, [bannerImages]);
  useEffect(() => {
    resetPetListingData();
  }, []);
  useEffect(() => {
    if (bannerImages.length === 0) return;

    dotAnimations[0].setValue(18);

    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        currentIndex.current = (currentIndex.current + 1) % bannerImages.length;
        const newIndex = currentIndex.current;
        setCurrentImage(bannerImages[newIndex]);
        setActiveDot(newIndex);

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
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [bannerImages]);

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
            stiffness: 150,
            damping: 20,
            useNativeDriver: false,
          }),
          Animated.spring(pillWidth, {
            toValue: width,
            stiffness: 150,
            damping: 20,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  }, [selectedCategory]);

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

  const renderPetItem = ({ item }: { item: any }) => {
    const pet = item;

    const petLat = Number(pet.latitude);
    const petLon = Number(pet.longitude);
    const userLat = Number(userData?.latitude);
    const userLon = Number(userData?.longitude);

    const distance =
      userLat && userLon && petLat && petLon
        ? getDistanceFromLatLonInKm(userLat, userLon, petLat, petLon)
        : null;

    return (
      <TouchableOpacity
        key={pet.id}
        style={styles.petCard}
        onPress={() => router.push(`/petDetail?petId=${pet.id}`)}
      >
        <Image source={{ uri: pet.image }} style={styles.petImage} />
        <View style={styles.petInfo}>
          <Text style={styles.breedText}>{pet.breed}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.nameText}>{pet.name}</Text>
            <View style={styles.gender}>
              {pet.gender === "Female" ? (
                <HugeiconsIcon
                  icon={FemaleSymbolIcon}
                  size={16}
                  color="#2BBFFF"
                  strokeWidth={2.5}
                />
              ) : pet.gender === "Male" ? (
                <HugeiconsIcon
                  icon={MaleSymbolIcon}
                  size={16}
                  color="#2BBFFF"
                  strokeWidth={2.5}
                />
              ) : null}
            </View>
          </View>
          <Text style={styles.distanceText}>
            {distance != null
              ? `${distance.toFixed(1)} km away`
              : "Distance unavailable"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.innerContainer}>
        <View style={styles.wrapper}>
          {currentImage ? (
            <Animated.Image
              source={{ uri: currentImage }}
              style={[styles.bannerImage, { opacity: fadeAnim }]}
            />
          ) : (
            <View style={styles.fallbackContainer}>
              <Text>No image available</Text>
            </View>
          )}

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

        {(role === "Organization" || role === "Owner") && (
          <>
            <View style={styles.listContainer} {...panResponder.panHandlers}>
              <Animated.Text
                style={[
                  styles.swipeText,
                  {
                    opacity: swipeTextOpacity,
                    transform: [
                      { rotate: "90deg" },
                      { translateX: swipeTextTranslateX },
                    ],
                  },
                ]}
              >
                Swipe Left!
              </Animated.Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  resetPetListingData();
                  setIsEdit("false");
                  setPetCategoryBSOpen(true);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>List Your Pet</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text style={styles.title}>Pet Categories</Text>
        <View style={styles.categories}>
          {/* Animated background pill */}
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

        <FlatList
          data={filteredPets.filter((pet) => {
            const petLat = Number(pet.latitude);
            const petLon = Number(pet.longitude);
            const userLat = Number(userData?.latitude);
            const userLon = Number(userData?.longitude);

            if (!userLat || !userLon || !petLat || !petLon) return false;

            const distance = getDistanceFromLatLonInKm(
              userLat,
              userLon,
              petLat,
              petLon
            );
            return distance <= 30;
          })}
          keyExtractor={(item) => item.id}
          renderItem={renderPetItem}
          ListFooterComponent={
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2bbfff"
              colors={["#2bbfff"]}
              progressBackgroundColor="#f2fbff"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
        />

        <ListModal
          isOpen={petCategoryBSOpen}
          closeModal={() => setPetCategoryBSOpen(false)}
        >
          <PetCategoryBS
            onSelectCategory={(category) => {
              setPetCategoryBSOpen(false);
              if (category === "2") {
                setDogBreedOpen(true);
              } else if (category === "1") {
                setCatBreedOpen(true);
              } else if (category === "3") {
                setParrotBreedOpen(true);
                setPetSelectedCategory("parrot");
              }
            }}
            onCloseAndOpenModal={() => {
              setPetCategoryBSOpen(false);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={catBreedOpen}
          closeModal={() => setCatBreedOpen(false)}
        >
          <CatBreedBS
            onCloseAndOpenModal={() => {
              setCatBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={dogBreedOpen}
          closeModal={() => setDogBreedOpen(false)}
        >
          <DogBreedBS
            onCloseAndOpenModal={() => {
              setDogBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={parrotBreedOpen}
          closeModal={() => setParrotBreedOpen(false)}
        >
          <ParrotBreedBS
            onCloseAndOpenModal={() => {
              setParrotBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>

        <ListModal
          isOpen={petImagesBSOpen}
          closeModal={() => setPetImagesBSOpen(false)}
        >
          <PetImages
            onCloseAndOpenModal={() => {
              setPetImagesBSOpen(false);
              setPetDescriptionBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={petDescriptionBSOpen}
          closeModal={() => setPetDescriptionBSOpen(false)}
        >
          <PetDescription
            onCloseAndOpenModal={() => {
              setPetDescriptionBSOpen(false);
              setPetInfoBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={petInfoBSOpen}
          closeModal={() => setPetInfoBSOpen(false)}
        >
          <PetInfoBS
            onCloseAndOpenModal={() => {
              setPetInfoBSOpen(false);
              setPetSubmittedOpen(true);
            }}
            direction="horizontal"
            category={petSelectedCategory}
          />
        </ListModal>
        <ListModal
          isOpen={petSubmittedOpen}
          closeModal={() => setPetSubmittedOpen(false)}
        >
          <PetSubmitted
            closeModal={() => setPetSubmittedOpen(false)}
            direction="horizontal"
          />
        </ListModal>
      </View>
      <Toast ref={toastRef} />
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
    paddingHorizontal: 20,
    gap: 20,
  },
  wrapper: {
    width: width,
    height: BANNER_HEIGHT,
    borderRadius: 26,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#eee",
    marginTop: 20,
  },
  bannerImage: {
    width: width,
    height: BANNER_HEIGHT,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(12),
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(12),
    fontWeight: "500",
  },
  petCard: {
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
  breedText: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(28) : responsive.fontSize(18),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#ACACAC",
    marginTop: 5,
  },
  gender: {
    marginTop: 7,
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
    marginBottom: 10,
  },
  listContainer: {
    position: "absolute",
    right: -22,
    top: 165,
    transform: [{ rotate: "-90deg" }],
    zIndex: 10,
    alignItems: "center",
  },
  swipeText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#555",
    marginBottom: 4,
    bottom: 30,
    transform: [{ rotate: "90deg" }],
  },
  button: {
    backgroundColor: "#C9EFFF",
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: "500",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(9) : responsive.fontSize(8),
  },
});
