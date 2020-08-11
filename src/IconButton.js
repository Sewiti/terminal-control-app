import React from "react";
import { StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Feather';


const IconButton = (props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackgroundBorderless(24)}
      {...props}
      style={{ ...styles.container, ...props.style }}
    >
      <Icon
        name={props.icon}
        size={24}
        color={props.color || 'black'}
      />
    </TouchableNativeFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default IconButton;
