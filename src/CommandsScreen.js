import React, { useReducer, useEffect, useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableNativeFeedback, TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { SettingsContext } from './SettingsProvider';
import { Execute } from './ApiService';
import IconButton from './IconButton';
import Icon from 'react-native-vector-icons/Feather';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';


const CommandsScreen = ({ navigation }) => {
  const { commands, setCommands, baseUrl } = useContext(SettingsContext);
  const [editmode, setEditmode] = useState(false);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          // <IconButton
          //   icon='plus'
          //   onPress={() => navigation.navigate('EditCommand')}
          // />
          <Menu>
            <MenuTrigger
              // style={styles.menu.trigger}
              customStyles={triggerStyles}
            />
            <MenuOptions>
              <MenuOption style={styles.menu.item} onSelect={() => navigation.navigate('EditCommand')}>
                <Text style={styles.menu.itemText}>New Command</Text>
              </MenuOption>
              <MenuOption style={styles.menu.item} onSelect={() => setEditmode((value) => !value)}>
                <View
                  style={styles.menu.editmodeContainer}
                >
                  <Text style={{ ...styles.menu.itemText, marginTop: 2 }}>Edit mode</Text>
                  <Icon
                    name={editmode ? 'check-square' : 'square'}
                    size={24}
                    color='black'
                    style={styles.menu.editmodeIcon}
                  />
                </View>
              </MenuOption>
              <MenuOption style={styles.menu.item} onSelect={() => navigation.navigate('Settings')}>
                <Text style={styles.menu.itemText}>Settings</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        );
      }
    });
  }, [navigation, editmode]);


  // Single Command Renderer
  const CommandRenderer = ({ item, drag }) => {
    return (
      <View
        style={styles.item.container}
      >
        <View
          style={styles.item.infoContainer}
        >
          <TouchableNativeFeedback
            style={styles.item.info}
            onPress={() => {
              Execute(baseUrl, item.command).catch((reason) => {
                Alert.alert('Unable to send Command!', reason.message, [{ text: 'CLOSE', style: 'destructive' }], { cancelable: true });
              });
            }}
          >
            <ScrollView horizontal={true}>
              <Text style={styles.item.title}>{item.name}</Text>
            </ScrollView>
            <ScrollView horizontal={true}>
              <Text style={styles.item.command}>{item.command}</Text>
            </ScrollView>
          </TouchableNativeFeedback>
        </View>
        {editmode ?
          <View
            style={styles.item.buttons}
          >
            <TouchableWithoutFeedback
              onPressIn={drag}
              style={styles.item.dragHandle}
            >
              <Icon
                name='chevron-up'
                size={24}
                color='black'
                style={{ marginBottom: -4 }}
              />
              <Icon
                name='chevron-down'
                size={24}
                color='black'
                style={{ marginTop: -4 }}
              />
            </TouchableWithoutFeedback>
            <IconButton
              icon='edit'
              onPress={() => navigation.navigate('EditCommand', { command: item })}
            />
          </View>
          : <></>
        }
      </View>
    );
  };


  return (
    <View style={styles.root.container}>
      <DraggableFlatList
        data={commands}
        renderItem={CommandRenderer}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setCommands(data)}
      />
    </View>
  );
}


const styles = {
  root: StyleSheet.create({
    container: {
      flex: 1
    }
  }),
  item: StyleSheet.create({
    container: {
      height: 56,
      flexDirection: 'row',
      backgroundColor: 'white',
      elevation: 2
    },
    infoContainer: {
      flex: 1
    },
    info: {
      paddingHorizontal: 12,
      paddingVertical: 6
    },
    buttons: {
      flexDirection: 'row-reverse',
    },
    title: {
      fontSize: 20,
    },
    command: {
      fontSize: 12,
      color: 'lightgray'
    },
    dragHandle: {
      flex: 1,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -8
    }
  }),
  menu: StyleSheet.create({
    trigger: {
      height: 56,
      width: 56,
      alignItems: 'center',
      justifyContent: 'center'
    },
    item: {
      height: 48,
      justifyContent: 'center',
      paddingHorizontal: 8
    },
    itemText: {
      fontSize: 16
    },
    editmodeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    editmodeIcon: {
      marginRight: 4
    }
  })
}


const triggerStyles = {
  TriggerTouchableComponent: IconButton,
  triggerTouchable: { icon: 'more-vertical' }
}


export default CommandsScreen;
