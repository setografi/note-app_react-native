// NoteItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/assets/styles/styles";

type NoteProps = {
  note: {
    id: number | string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    bookmarked: boolean;
  };
  onSelect: (note: NoteProps["note"]) => void; // Fungsi untuk memilih catatan
};

export default function NoteItem({ note, onSelect }: NoteProps) {
  return (
    <TouchableOpacity onPress={() => onSelect(note)}>
      <View style={styles.noteItem}>
        <Text style={styles.titleText}>{note.title}</Text>
        <Text>{`Created At: ${new Date(
          note.createdAt
        ).toLocaleDateString()}`}</Text>
      </View>
    </TouchableOpacity>
  );
}
