import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", // Azul muy claro para el fondo
  },
  section: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0057b8", // Azul fuerte
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#e3f2fd", // Azul claro
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  listItem: {
    fontSize: 16,
    color: "#0057b8", // Azul fuerte
    fontWeight: "500",
    marginVertical: 5,
  },
});

export default styles;
