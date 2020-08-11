import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsContext } from "./SettingsProvider";
import IconButton from "./IconButton";
import { TextInput } from "react-native-gesture-handler";


const SettingsScreen = ({ navigation }) => {
  const [urlInput, setUrlInput] = useState('');
  const { baseUrl, setBaseUrl } = useContext(SettingsContext);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.goBack()}
          />
        );
      }
    })
  }, [navigation]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon='save'
            onPress={() => saveHandler()}
          />
        );
      }
    });
  }, [navigation, urlInput]);


  useEffect(() => {
    setUrlInput(baseUrl);
  }, [])


  const saveHandler = () => {
    setBaseUrl(urlInput);
  }


  return (
    <KeyboardAvoidingView>
      <View style={styles.inputGroup}>
        <Text style={styles.title}>URL</Text>
        <TextInput
          style={styles.input}
          value={urlInput}
          onChangeText={value => setUrlInput(value)}
          placeholder='http://192.168.10.101:8000'
          onSubmitEditing={() => setBaseUrl(urlInput)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 12,
    elevation: 3
  },
  title: {
    color: 'black'
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 2,
    fontSize: 18
  }
});


export default SettingsScreen;
