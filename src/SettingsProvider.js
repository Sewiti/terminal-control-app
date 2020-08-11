import React, { useEffect, useState, useReducer } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import LoadingScreen from "./LoadingScreen";
import { ToastAndroid } from "react-native";

export const SettingsContext = React.createContext();


// UUID v4 generation
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const initialState = {
  isLoadingBaseUrl: true,
  isLoadingCommands: true,
  baseUrl: 'http://192.168.10.101:8000',
  commands: [{ key: 'hello-world', name: 'Hello World!', command: 'notify-send -a Earth "Hello World!"' }]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADED_BASEURL':
      return { ...state, isLoadingBaseUrl: false };

    case 'LOADED_COMMANDS':
      return { ...state, isLoadingCommands: false };

    case 'SET_BASEURL':
      return { ...state, baseUrl: action.baseUrl };

    case 'SAVE_SET_BASEURL':
      AsyncStorage.setItem('baseUrl', JSON.stringify(action.baseUrl)).then(() => {
        ToastAndroid.show('URL saved', ToastAndroid.SHORT);
      });
      return { ...state, baseUrl: action.baseUrl };

    case 'SET_COMMANDS':
      return { ...state, commands: action.commands };

    case 'SAVE_SET_COMMANDS':
      AsyncStorage.setItem('commands', JSON.stringify(action.commands));
      return { ...state, commands: action.commands };

    case 'NEW_COMMAND':
      const newCommands = [...state.commands, { key: uuidv4(), ...action.command }];
      AsyncStorage.setItem('commands', JSON.stringify(newCommands)).then(() => {
        ToastAndroid.show('Command created', ToastAndroid.SHORT);
      });
      return { ...state, commands: newCommands };

    case 'EDIT_COMMAND':
      var editedCommands = [...state.commands];
      for (var i in editedCommands) {
        if (editedCommands[i].key === action.command.key) {
          editedCommands[i] = action.command;
          break;
        }
      }   
      AsyncStorage.setItem('commands', JSON.stringify(editedCommands)).then(() => {
        ToastAndroid.show('Command saved', ToastAndroid.SHORT);
      });
      return { ...state, commands: editedCommands };

    case 'DELETE_COMMAND':
      const filteredCommands = state.commands.filter(item => item.key !== action.key);
      AsyncStorage.setItem('commands', JSON.stringify(filteredCommands)).then(() => {
        ToastAndroid.show('Command deleted', ToastAndroid.SHORT);
      });
      return { ...state, commands: filteredCommands };

    default:
      throw new Error('Unkown dispatch.');
  }
};



const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    AsyncStorage.getItem("baseUrl").then((value) => {
      if (value) {
        dispatch({ type: 'SET_BASEURL', baseUrl: JSON.parse(value) })
      }
      dispatch({ type: 'LOADED_BASEURL' });
    })

    AsyncStorage.getItem('commands').then((value) => {
      if (value) {
        dispatch({ type: 'SET_COMMANDS', commands: JSON.parse(value) })
      }
      dispatch({ type: 'LOADED_COMMANDS' });
    })
  }, []);


  return (
    <SettingsContext.Provider
      value={{
        baseUrl: state.baseUrl,
        commands: state.commands,
        isLoading: state.isLoadingBaseUrl || state.isLoadingCommands,
        setBaseUrl: (baseUrl) => { dispatch({ type: 'SAVE_SET_BASEURL', baseUrl }) },
        setCommands: (commands) => { dispatch({ type: 'SAVE_SET_COMMANDS', commands }) },
        newCommand: (command) => { dispatch({ type: 'NEW_COMMAND', command }) },
        editCommand: (command) => { dispatch({ type: 'EDIT_COMMAND', command }) },
        deleteCommand: (key)  => { dispatch({ type: 'DELETE_COMMAND', key }) }
      }}
    >
      {state.isLoadingBaseUrl || state.isLoadingCommands ? <LoadingScreen/> : children}
    </SettingsContext.Provider>
  );
};


export default SettingsProvider;
