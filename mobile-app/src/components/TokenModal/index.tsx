import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native-animatable';
import { Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

export default function TokenModal({ isVisible, handleSubmit, handleClose }) {
  const [code, setCode] = useState('');

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={handleClose}
      swipeDirection={'down'}
      style={styles.modalView}
    >
      <View style={{ backgroundColor: '#fff', padding: 20 }}>
        <Text style={styles.titleModal}>Insira o código</Text>
        <TextInput
          maxLength={4}
          style={styles.inputCode}
          placeholder="0000"
          placeholderTextColor="#999"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(code)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
