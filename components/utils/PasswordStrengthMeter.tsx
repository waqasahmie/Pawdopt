import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PasswordStrengthMeter({ password }: { password: string }) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const getStrength = () => {
    if (!password) return ""; // Handle empty password input
    const passed = Object.values(checks).filter(Boolean).length;
    if (passed <= 2) return "Weak";
    if (passed <= 4) return "Medium";
    return "Strong";
  };

  const strength = getStrength();
  const strengthColor = {
    Weak: "red",
    Medium: "orange",
    Strong: "green",
  };

  const getBarStyle = (strengthLevel: string, index: number) => {
    if (strengthLevel === "Weak") {
      if (index === 0) return strengthColor["Weak"];
      return "#DCDCDC";
    }
    if (strengthLevel === "Medium") {
      if (index < 2) return strengthColor["Medium"];
      return "#DCDCDC";
    }
    if (strengthLevel === "Strong") {
      return strengthColor["Strong"];
    }
  };

  return (
    <View style={styles.section}>
      <Text style={{ fontWeight: "bold" }}>Password Requirements</Text>

      <View style={styles.row}>
        <Text style={checks.length ? styles.pass : styles.fail}>
          • At least 8 characters
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={checks.upper ? styles.pass : styles.fail}>
          • At least one uppercase letter
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={checks.lower ? styles.pass : styles.fail}>
          • At least one lowercase letter
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={checks.number ? styles.pass : styles.fail}>
          • At least one number
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={checks.special ? styles.pass : styles.fail}>
          • At least one special character
        </Text>
      </View>

      {password && (
        <>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Strength:{" "}
            <Text
              style={{
                color: strengthColor[strength as keyof typeof strengthColor],
              }}
            >
              {strength}
            </Text>
          </Text>
          <View style={styles.barContainer}>
            {["Weak", "Medium", "Strong"].map((level, index) => (
              <View
                key={level}
                style={[
                  styles.bar,
                  {
                    backgroundColor: getBarStyle(strength, index),
                  },
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  pass: {
    color: "green",
    fontSize: 14,
  },
  fail: {
    color: "gray",
    fontSize: 14,
  },
  barContainer: {
    height: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  bar: {
    height: 8,
    width: "30%",
    borderRadius: 4,
    marginRight: 5, // Space between bars
  },
});