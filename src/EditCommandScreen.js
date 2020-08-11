import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import IconButton from './IconButton';
import { SettingsContext } from './SettingsProvider';


const Input = (props) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        {...props}
        ref={props.inputRef}
        style={{ ...styles.input, ...props.style }}
      />
    </View>
  );
}


const EditCommandScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');

  const commandInput = useRef();
  const { newCommand, editCommand, deleteCommand } = useContext(SettingsContext);


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
      headerTitle: (route.params?.command ? 'Edit Command' : 'New Command')
    });
  }, [navigation, route]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row' }}>
            {route.params?.command ?
              <IconButton
                icon='trash-2'
                style={{ width: 40 }}
                onPress={() => {
                  Alert.alert(
                    'Delete Command',
                    'Are you sure you want to delete this command?',
                    [
                      { text: 'CANCEL', style: 'cancel' },
                      {
                        text: 'DELETE',
                        style: 'destructive',
                        onPress: () => deletionHandler()
                      }
                    ],
                    { cancelable: true }
                  );
                }}
              />
              :
              <></>
            }
            <IconButton
              icon='save'
              onPress={() => saveHandler()}
            />
          </View>
        );
      }
    });
  }, [navigation, route, name, command]);


  useEffect(() => {
    if (route.params?.command) {
      setName(route.params.command.name);
      setCommand(route.params.command.command);
    }
  }, [route]);


  const saveHandler = () => {
    if (name === '') {
      Alert.alert(
        'Empty Field',
        'Name cannot be empty.',
        [ { text: 'CLOSE'} ],
        { cancelable: true }
      );
      return;
    }

    if (route.params?.command) { editCommand({ ...route.params.command, name, command }) }
    else { newCommand({ name, command }) }
    navigation.goBack();
  }

  const deletionHandler = () => {
    deleteCommand(route.params.command.key);
    navigation.goBack();
  }


  return (
    <KeyboardAvoidingView>
      <Input
        title='Name'
        placeholder='Hello World!'
        value={name}
        onChangeText={value => setName(value)}
        autoFocus={true}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => { commandInput.current.focus() }}
      />
      <Input
        title='Command'
        placeholder='notify-send -a Earth "Hello World!"'
        style={styles.monospace}
        value={command}
        onChangeText={value => setCommand(value)}
        onSubmitEditing={() => { saveHandler() }}
        inputRef={commandInput}
      />
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
  },
  monospace: {
    fontFamily: 'monospace',
    fontSize: 17,
    letterSpacing: -1
  }
});


export default EditCommandScreen;
