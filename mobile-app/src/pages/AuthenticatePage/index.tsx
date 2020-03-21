import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Keyboard,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../../../assets/logo.jpeg';
import TokenModal from '../../components/TokenModal';
import { styles } from './styles';
import { ThemeColor } from '../../util/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthenticatePage({ navigation }) {
  const [phone, setPhone] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(phone);
    await Keyboard.dismiss();
    setTimeout(() => {
      setIsVisibleModal(true);
    }, 2000);
  };

  const handleClose = () => {
    setIsVisibleModal(false);
    setIsLoading(false);
  };

  const handleCodeSubmit = (code) => {
    console.log('code', code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            maxLength={12}
            style={styles.input}
            placeholder="Celular"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!phone || phone.length < 9 || isLoading}
            style={
              !phone || phone.length < 9
                ? {
                    ...styles.button,
                    backgroundColor: ThemeColor.secondary,
                  }
                : styles.button
            }
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View>
            <Text style={styles.smallText}>Esqueceu a senha?</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.smallText}>Novo aqui? Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TokenModal
        isVisible={isVisibleModal}
        handleSubmit={(e) => handleCodeSubmit(e)}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
}
