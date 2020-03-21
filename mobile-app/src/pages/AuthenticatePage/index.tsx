import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { styles, ThemeColor } from "./styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function AuthenticatePage() {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    console.log(phone);
  };

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Digite seu celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu celular"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!phone || phone.length < 9}
          style={
            !phone || phone.length < 9
              ? {
                  ...styles.button,
                  backgroundColor: ThemeColor.latest
                }
              : styles.button
          }
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.smallText}>Não ta conseguindo?</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
