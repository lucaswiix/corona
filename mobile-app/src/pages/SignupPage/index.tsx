import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { main, ThemeColor } from '../../util/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// import { Container } from './styles';

export interface IClientForm {
  fullName: string;
  phone: string;
  email: string;
}

export default function SignupPage({ navigation }) {
  const [clientForm, setClientForm] = useState<IClientForm>({
    fullName: '',
    phone: '',
    email: '',
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFD400',
        flex: 1,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 24,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          Juntos somos mais fortes! 👊
        </Text>
      </View>

      {/* <ScrollView> */}
      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingHorizontal: 20 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        >
          <View style={main.formGroup}>
            {/* <Text>Nome completo *</Text> */}
            <TextInput
              placeholder="Nome completo *"
              onChangeText={handleChange('fullName')}
              style={{
                ...main.input,
                backgroundColor: '#fff',
                borderRadius: 0,
              }}
            />
          </View>

          <View style={main.formGroup}>
            {/* <Text>E-mail *</Text> */}
            <TextInput
              placeholder="E-mail *"
              onChangeText={handleChange('email')}
              style={{
                ...main.input,
                backgroundColor: '#fff',
                borderRadius: 0,
              }}
              keyboardType="email-address"
            />
          </View>

          <View style={main.formGroup}>
            <TextInput
              placeholder="Celular *"
              style={{
                ...main.input,
                backgroundColor: '#fff',
                borderRadius: 0,
              }}
              onChangeText={handleChange('phone')}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={main.button}>
            <Text style={main.buttonText}>LETS GO!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('auth')}>
          <Text style={{ textAlign: 'center' }}>Já estou cadastrado!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );

  function handleChange(fieldName: string) {
    return (value: string) =>
      setClientForm({
        ...clientForm,
        [fieldName]: value,
      });
  }
}
