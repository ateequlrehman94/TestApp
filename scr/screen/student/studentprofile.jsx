import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
function StudentProfile({ route, navigation }) {
  const { stu } = route.params;
  const { id } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          style={styles.studentimage}
          source={{ uri: stu.StudentImageUrl }}
        ></Image>
        <Text>Name: {stu.studentName}</Text>
        <Text>RollNO: {id}</Text>
      </View>
      <View>
        <Text>Personal Information</Text>
        <Text>Name: {stu.studentName}</Text>
        <Text>Father: {stu.fatherName}</Text>
        <Text>Name: {stu.Address}</Text>
      </View>
    </View>
  );
}
export { StudentProfile };

const styles = StyleSheet.create({
  studenttabs: { Color: "##4a4b4c", alignItems: "center" },

  studentimage: {
    allignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 10,
  },
  studenttext: {
    allignSelf: "center",
  },
});
