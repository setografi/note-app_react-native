// NoteItem.tsx
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "@/assets/styles/styles";

type NoteProps = {
  note: {
    id: number | string;
    title: string;
    createdAt: string;
    archived: boolean;
    bookmarked: boolean;
  };
  onSelect: (note: NoteProps["note"]) => void; // Fungsi untuk memilih catatan
};

export default function NoteItem({ note, onSelect }: NoteProps) {
  return (
    <TouchableOpacity onPress={() => onSelect(note)}>
      <ThemedView style={styles.noteItem}>
        <ThemedText style={styles.titleText}>{note.title}</ThemedText>
        <ThemedText>{`Created At: ${new Date(
          note.createdAt
        ).toLocaleDateString()}`}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
