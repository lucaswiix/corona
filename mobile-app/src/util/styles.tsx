import { StyleSheet } from 'react-native';

export const ThemeColor = {
  primary: '#fddb3a',
  secondary: '#ede59a',
  third: '#f2f9f1',
  latest: '#f6f4e6',
};

export const main = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColor.latest,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  formGroup: {
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: ThemeColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 16,
  },
  smallText: {
    fontWeight: '400',
    fontSize: 10,
    marginVertical: 5,
    textAlign: 'center',
  },
});
