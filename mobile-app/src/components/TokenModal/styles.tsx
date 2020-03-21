import { StyleSheet } from 'react-native';
import { ThemeColor } from '../../util/styles';

export const styles = StyleSheet.create({
  inputCode: {
    fontSize: 24,
    height: 45,
    textAlign: 'center',
    marginVertical: 10,
    width: '100%',
    borderColor: ThemeColor.third,
    letterSpacing: 5,
    borderWidth: 1,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  button: {
    height: 42,
    backgroundColor: ThemeColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  titleModal: {
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 16,
  },
});
