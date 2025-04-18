import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CoverFlowCarousel } from "@/components/utils/petCarousel";
import { Call02Icon, Comment01Icon, Share08Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

const Images = [
  require("../../assets/images/pet1.jpg"),
  require("../../assets/images/pet2.jpg"),
  require("../../assets/images/pet3.jpg"),
  require("../../assets/images/pet4.jpg"),
  require("../../assets/images/pet5.jpg"),
];

export default function PetDetail() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

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

  const infoData = [
    { title: "Gender", value: "Male" },
    { title: "Age", value: "1.5 years" },
    { title: "Breed", value: "Persian" },
    { title: "Eye Color", value: "Grey" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.circle, { zIndex: 10 }]}
          >
            <MaterialIcons
              style={{ right: 1 }}
              name="arrow-back-ios-new"
              size={16}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.navText}>Pet Details</Text>

          <TouchableWithoutFeedback onPress={animateHeart}>
            <View style={styles.circle}>
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={20}
                  style={{ top: 1 }}
                  color={liked ? "red" : "black"}
                />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.coverflow}>
        <CoverFlowCarousel images={Images} />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.innerInfoSection}>
            <Text style={styles.title}>Smokey </Text>
            <HugeiconsIcon icon={Share08Icon} size={20} color="black" />
          </View>
          <Text style={styles.subTitle}>
            74/6 Wellington St, East Mellbourne
          </Text>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.infoBoxWrapper}
            >
              {infoData.map((item, index) => (
                <View key={index} style={styles.infoBox}>
                  <Text style={styles.infoTitle}>{item.title}</Text>
                  <Text style={styles.infoSubtitle}>{item.value}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.ownerBox}>
            <View>
          <Image
            source={require("../../assets/images/user1.png")}
            style={styles.ownerImage}
          />
        </View>
              <View style={styles.ownerTextWrapper}>
                <Text style={styles.ownerName}>Waqas Ahmed</Text>
                <Text style={styles.ownerRole}>Pet Owner</Text>
              </View>
              <View style={styles.contactIcons}>
                <TouchableOpacity style={styles.contactIconButton}>
                <HugeiconsIcon icon={Call02Icon} size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactIconButton}>
                <HugeiconsIcon icon={Comment01Icon} size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutDescription}>
              Persian cats, known for their luxurious long fur, round faces, and gentle personalities, are one of the most beloved and recognizable breeds in the world. Originating from Persia (modern-day Iran), these cats have been admired for centuries and continue to captivate cat enthusiasts with their distinctive appearance and sweet demeanor.                                          
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footerBox}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>Rs 5000</Text>
          </View>
          <TouchableOpacity style={styles.adoptButton}>
            <Text style={styles.adoptText}>Adopt Me</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 50,
    marginBottom: 20,
  },
  coverflow: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "155%",
    // paddingBottom: 20,
    //marginTop: 10,
    // backgroundColor:"pink"
  },

  imageContainer: {
    width: 304,
    height: 300,
    marginBottom: 20,
  },
  infoSection: {
    alignItems: "flex-start",
    width: "95%",
    marginBottom: 20,
    //backgroundColor:"pink"
  },
  innerInfoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 16,
    color: "#939393",
    fontWeight: "400",
  },
  infoBoxWrapper: {
    width: "100%",
    marginBottom: 20,
    //backgroundColor:"pink"
  },
  infoBox: {
    // flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: 90,
    marginRight: 12,
  },
  infoTitle: {
    color: "gray",
    fontSize: 12,
    fontWeight: "400",
  },
  infoSubtitle: {
    fontWeight: "500",
    fontSize: 14,
    marginTop: 4,
  },
  ownerBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical:8,
    marginBottom: 10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ownerTextWrapper: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
  },
  ownerName: {
    fontWeight: "600",
    fontSize: 16,
  },
  ownerRole: {
    color: "gray",
    fontSize: 14,
  },
  contactIcons: {
    flexDirection: "row",
    gap: 10,
  },
  contactIconButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 20,
  },
  aboutSection: {
    marginTop: 5,
    marginBottom: 10,
    width:"95%",
    alignSelf:"center",
  },
  aboutTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  aboutDescription: {
    color: "gray",
    marginTop: 4,
    fontSize: 13,
    marginBottom: 60,
    lineHeight: 20,
  },
  footerBox: {
    width:"100%",
    position: "absolute",
    bottom: 23,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10, 
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  priceLabel: {
    color: "gray",
    fontSize: 12,
    fontWeight: "300",
    paddingLeft:25,
  },
  priceValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 25,
  },
  adoptButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
  adoptText: {
    fontSize: 16,
    fontWeight: "600",
  },
});