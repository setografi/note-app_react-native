import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import NoteItem from "@/components/NoteItem";
import { styles } from "@/assets/styles/styles";

type Note = {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
  updatedAt?: string;
  bookmarked: boolean;
};

interface NoteListProps {
  filteredNotes: Note[];
  handleSelectNote: (note: Note) => void;
  setModalVisible: (visible: boolean) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  filteredNotes,
  handleSelectNote,
  setModalVisible,
}) => {
  return (
    <View style={styles.noteListsection}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome6 name="add" size={15} color="#202020" />
        <Text style={styles.addButtonText}>New Note</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <NoteItem note={item} onSelect={handleSelectNote} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Tidak ada catatan</Text>}
      />
    </View>
  );
};

export default NoteList;
