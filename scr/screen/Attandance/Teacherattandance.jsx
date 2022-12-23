import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { Loading } from "../../components/loading";
import { firebase } from "../../services/firebaseConfig";
function TeacherAttandance({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [TeacherData, setTeacherData] = useState([]);
  useEffect(() => {
    fetchTeacherFromDB();
  }, []);

  const fetchTeacherFromDB = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("Teacher")
      .get()
      .then((response) => {
        setTeacherData(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
  };

  const __renderItem = ({ item }) => {
    const Teacher = item.data();
    const TeacherId = item.id;
    return (
      <ScrollView>
        <View style={styles.row}>
          <Image source={{ uri: Teacher.TeacherImageUrl }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{Teacher.TeacherName}</Text>
            </View>
            <View style={styles.end}>
              <Image
                style={[
                  styles.icon,
                  { marginLeft: 15, marginRight: 5, width: 14, height: 14 },
                ]}
                source={{
                  uri: "https://img.icons8.com/small/14/000000/double-tick.png",
                }}
              />
              <Text style={styles.time}>{Teacher.Subject}</Text>
            </View>
          </View>
          <Image
            style={[styles.icon, { marginRight: 50 }]}
            source={{ uri: Teacher.TeacherImageUrl }}
          />
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TeacherData}
        vertically={true}
        numColumns="1"
        renderItem={__renderItem}
        ListEmptyComponent={<Text>No Teacher found </Text>}
        refreshing={showLoading}
        onRefresh={() => fetchTeacherFromDB()}
      />

      <Toast />

      {showLoading && <Loading />}
    </View>
  );
}

export { TeacherAttandance };

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
