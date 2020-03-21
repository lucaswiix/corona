import { StyleSheet } from "react-native";

export const ThemeColor = {
  primary: "#388e3c",
  secondary: "#8bc34a",
  third: "#f2f9f1",
  latest: "#ddeedf"
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: ThemeColor.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: 16
  },
  smallText: {
    fontWeight: "400",
    fontSize: 12,
    marginVertical: 5,
    textAlign: "center"
  }
});
