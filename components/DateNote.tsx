import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "@/assets/styles/styles";

type DateNoteProps = {
  noteDate?: string;
  onDateSelect: (date: Date | null) => void;
};

// Fungsi untuk mendapatkan nama hari dan tanggal hari ini
const getCurrentDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;
  return today.toLocaleDateString(undefined, options);
};

const DateNote: React.FC<DateNoteProps> = ({ noteDate, onDateSelect }) => {
  const currentDate = getCurrentDate();

  // Get current date and surrounding dates
  const today = new Date(noteDate || new Date());
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 1 + i);
    return date;
  });

  // Format date to "D MMM" (e.g., "2 Oct")
  const formatDate = (date: Date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
  };

  // Get day letter (e.g., "S" for Sunday)
  const getDayLetter = (date: Date) => {
    return date.toLocaleString("default", { weekday: "short" })[0];
  };

  // Check if a date is the selected date
  const isSelected = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <View>
      <Text style={styles.currentDateText}>{currentDate}</Text>

      <View style={styles.dateFlex}>
        {/* Tombol untuk menampilkan semua catatan */}
        <TouchableOpacity
          style={[
            styles.dateItem,
            { backgroundColor: "#FFCF01", width: 80, borderRadius: 12 },
          ]}
          onPress={() => onDateSelect(null)}
        >
          <Text
            style={[
              styles.dayText,
              { color: "#202020", fontWeight: "semibold" },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {/* Container untuk tanggal-tanggal */}
        <View style={styles.datesContainer}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                isSelected(date) && styles.selectedDateItem,
              ]}
              onPress={() => onDateSelect(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected(date) && styles.selectedText,
                ]}
              >
                {getDayLetter(date)}
              </Text>
              <Text
                style={[
                  styles.smallDateText,
                  isSelected(date) && styles.selectedText,
                ]}
              >
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DateNote;
