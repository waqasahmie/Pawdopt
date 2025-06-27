import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/AppContext";
import responsive from "@/constants/Responsive";

type PetCategoryProps = {
  onCloseAndOpenModal?: () => void;
  onSelectCategory?: (category: string) => void;
  direction?: "vertical" | "horizontal"; 
};

const screenHeight = Dimensions.get("window").height;
const categories = [
  {
    id: "1",
    name: "A Cat",
    emoji: require("../../assets/images/cat.png"),
    radiobutton: require("../../assets/images/RadioButton_checked.png"),
  },
  {
    id: "2",
    name: "A Dog",
    emoji: require("../../assets/images/dog.png"),
    radiobutton: require("../../assets/images/RadioButton_unchecked.png"),
  },
  {
    id: "3",
    name: "A Parrot",
    emoji: require("../../assets/images/parrot.png"),
    radiobutton: require("../../assets/images/RadioButton_unchecked.png"),
  },
];

export const PetCategoryBS = ({ onCloseAndOpenModal, onSelectCategory, direction = "vertical"}: PetCategoryProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  function getCategoryIdFromName(name: string | null): string | null {
    if (!name) return null;
    const found = categories.find((c) =>
      c.name.toLowerCase().endsWith(name.toLowerCase())
    );
    return found ? found.id : null;
  }
  const { resetPetListingData ,updatePetListingData ,petListingData} = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return getCategoryIdFromName(petListingData.category ?? null);
  });
  const [fadeAnim] = useState(new Animated.Value(1));
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]); 

  
  const handleContinue = () => {
    if (selectedCategory) {
      let petType = "";
  
      // Match ID to actual pet type name
      switch (selectedCategory) {
        case "1":
          petType = "Cat";
          break;
        case "2":
          petType = "Dog";
          break;
        case "3":
          petType = "Parrot";
          break;
        default:
          petType = "";
      }
  
      updatePetListingData("category", petType); 
      onSelectCategory && onSelectCategory(petType); 
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onCloseAndOpenModal && onCloseAndOpenModal();
    if (selectedCategory) {
      onSelectCategory && onSelectCategory(selectedCategory);
    }
  };

  return (
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
      <Text style={styles.title}>Choose a category</Text>
      <Text style={styles.subTitle}>
        Select a category that fits your needs below.
      </Text>

      {categories.map((item, index) => (
        <Pressable
          key={index}
          style={styles.categoryOption}
          onPress={() => setSelectedCategory(item.id)}
        >
          <Image source={item.emoji} style={styles.emoji} />
          <Text style={styles.categoryText}>{item.name}</Text>
          <Image
            source={
              selectedCategory === item.id
                ? require("../../assets/images/RadioButton_checked.png")
                : require("../../assets/images/RadioButton_unchecked.png")
            }
            style={styles.radioButton}
          />
        </Pressable>
      ))}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.ContinueButton,
            {
              backgroundColor: selectedCategory ? "#2BBFFF" : "#ccc", 
            },
          ]}
          onPress={() => {
            handleContinue();
          }}
          disabled={!selectedCategory} // Disable button if no category is selected
        >
          <Text style={styles.ContinueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
    paddingBottom: 30,
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
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    width: "90%",
    borderColor: "#F6F6F6",
    borderWidth: 4,
    marginBottom: 20,
  },
  emoji: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  categoryText: {
    flex: 1,
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#939393",
  },
  radioButton: {
    width: 16,
    height: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%", // Ensures proper spacing
    marginTop: 40,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.05, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 1, // For Android shadow
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
