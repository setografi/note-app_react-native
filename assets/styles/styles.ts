import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
  },
  button: {
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  charLimitText: {
    marginTop: 5,
    color: "gray",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16, // Tambahkan margin untuk jarak
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },

  todoBg: {
    height: 250, // Sesuaikan tinggi dengan header
    width: "100%", // Gunakan lebar penuh
  },

  deleteButton: {
    backgroundColor: "red",
    color: "white",
  },
  archiveButton: {
    backgroundColor: "blue",
    color: "white",
  },
  unarchiveButton: {
    backgroundColor: "green",
    color: "white",
  },
  bookmarkButton: {
    backgroundColor: "orange",
    color: "white",
  },

  addButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#007BFF", // Warna tombol
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 20,
  },
});
