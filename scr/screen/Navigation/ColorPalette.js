import React, { Component } from "react";
import { themeOptions, changeTheme } from "./themeActions";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
const colorOptions = Object.keys(themeOptions);
function ColorPalette() {
  state = {
    devModalVisible: false,
    confirmLogoutModal: false,
  };

  toggleDevModal = () => {
    const { navigation } = this.props;
    const { devModalVisible } = this.state;
    navigation.closeDrawer();
    this.setState({ devModalVisible: !devModalVisible });
  };

  toggleLogoutModal = () => {
    const { navigation } = this.props;
    const { confirmLogoutModal } = this.state;
    navigation.closeDrawer();
    this.setState({ confirmLogoutModal: !confirmLogoutModal });
  };

  renderDeveleperModal = () => {
    const { devModalVisible } = this.state;
    const { theme } = this.props;
  };
  renderPalette = (color) => (
    <TouchableOpacity key={color} onPress={() => this.props.changeTheme(color)}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: color,
          margin: 5,
        }}
      ></View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.themeTitle}>Choose your theme:</Text>
      <View style={styles.containPalettes}>
        {colorOptions.map(this.renderPalette)}
      </View>
    </View>
  );
}
// export { ColorPalette };
const styles = StyleSheet.create({
  themeTitle: {
    color: "#333",
    marginLeft: "6%",
    marginBottom: "3%",
    fontFamily: "sans-serif-condensed",
  },
  containPalettes: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export { ColorPalette };
