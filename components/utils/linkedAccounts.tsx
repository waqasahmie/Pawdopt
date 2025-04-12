import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Image,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import Toast from '../../components/utils/toast';
  
  const initialAccounts = [
    {
      name: "Google",
      icon: require("../../assets/images/GoogleBS.png"),
      connected: true,
      size: { width: 38, height: 38 },
    },
    {
      name: "Apple",
      icon: require("../../assets/images/Apple.png"),
      connected: true,
      size: { width: 37, height: 44 },
    },
    {
      name: "Facebook",
      icon: require("../../assets/images/Facebook.png"),
      connected: false,
      size: { width: 34, height: 35 },
    },
    {
      name: "Twitter",
      icon: require("../../assets/images/Twitter.png"),
      connected: false,
      size: { width: 32, height: 34 },
    },
  ];
  
  export const LinkedAccount = () => {
    const [accountStatus, setAccountStatus] = useState(initialAccounts);
    const toastRef = useRef<any>({});

    // const handleToggle = (index: number) => {
    //   setAccountStatus((prevAccounts) =>
    //     prevAccounts.map((account, i) =>
    //       i === index ? { ...account, connected: !account.connected } : account
    //     )
    //   );
    // };
  
    const handleToggle = (index: number) => {
      setAccountStatus((prevAccounts) =>
        prevAccounts.map((account, i) => {
          if (i === index) {
            if (account.connected) {
              toastRef.current.show({
                type: "success",
                title: "Your " + account.name + " Account",
                description: "is disconnected Successfully",
              });
            }
            return { ...account, connected: !account.connected };
          }
          return account;
        })
      );
    };
  
    return (
      <Animated.View style={styles.container}> 
        <View style={styles.indicator} />
        <Text style={styles.title}>Linked Accounts</Text>
        {accountStatus.map((account, index) => (
          <View key={index} style={styles.accountRow}>
            <View style={styles.iconContainer}>
              <Image source={account.icon} style={account.size} />
            </View>
            <Text style={styles.accountName}>{account.name}</Text>
            <TouchableOpacity onPress={() => handleToggle(index)}>
              <Text style={account.connected ? styles.disconnectText : styles.connectText}>
                {account.connected ? "Disconnect" : "Connect"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <Toast ref={toastRef} />
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
      paddingBottom: 80,
      gap: 20,
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 26,
      fontWeight: "600",
    },
    accountRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderWidth: 1,
      borderColor: "#F0F0F0",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 7,
      width: "90%",
    },
    iconContainer: {
      width: 45,
      height: 45,
      marginRight: 14,
      alignItems:"center",
      justifyContent: "center",
    },
    accountName: {
      flex: 1,
      fontSize: 18,
      fontWeight: "500",
    },
    disconnectText: {
      color: "#FF0900",
      fontSize: 14,
      right: 5,
    },
    connectText: {
      color: "#2BBFFF",
      fontSize: 14,
      right: 5,
    },
  });
  