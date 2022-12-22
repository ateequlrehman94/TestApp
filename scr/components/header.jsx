import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Header({ title, onIconPress }) {
  return (
    <View style={styles.headerCon}>
      <TouchableOpacity onPress={onIconPress}>
        <Ionicons name={"chevron-back"} size={24} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export { Header };

const styles = StyleSheet.create({
  headerCon: {
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  backIcon: {
    marginLeft: -5,
  },
});
