import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
  },

  //Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#1B1B1C",
  },

  //Search Section
  backgroundImage: {
    height: 145,
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    overflow: "hidden",
  },
  searchSection: {
    overflow: "hidden",
    padding: 30,
  },
  searchInput: {
    height: 45,
    backgroundColor: "#FFFFFF",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 12,
  },

  //Date Section
  currentDateText: {
    fontSize: 15,
    fontWeight: "medium",
    marginTop: 16,
    paddingBottom: 10,
    color: "#393940",
  },
  dateFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  dayText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  dateItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#B3B3B3",
  },
  selectedDateItem: {
    backgroundColor: "#70EC46",
  },
  smallDateText: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  selectedText: {
    color: "#393940",
  },

  //Add Button
  addButton: {
    height: 45,
    backgroundColor: "#70EC46",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  addButtonText: {
    color: "#393940",
    fontSize: 15,
  },

  //Note List Section
  noteListsection: {
    flex: 1,
    marginTop: 22,
    marginBottom: 50,
  },
  // flexNote: {
  //   display: "flex",
  //   flexDirection: "row",
  // },
  noteItem: {
    borderColor: "#D8D8D8",
    borderWidth: 1,
    padding: 10,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    // elevation: 1,
  },
  titleNote: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212124",
  },
  dateText: {
    fontSize: 10,
    color: "#B3B3B3",
  },
  bodyText: {
    fontSize: 14,
  },
  button: {
    marginVertical: 10,
  },

  //Add Note Section
  addContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "none",
  },
  addInput: {
    fontSize: 15,
    color: "#000",
    padding: 10,
  },
  flexAdd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // charLimitText: {
  //   marginTop: 5,
  //   color: "gray",
  // },
  // titleContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 8,
  //   marginBottom: 16,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 16,
  // },
  // todoBg: {
  //   height: 250,
  //   width: "100%",
  // },

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
});
