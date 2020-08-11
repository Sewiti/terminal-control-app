import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


const LoadingScreen = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size='large' color='black' />
    </View>
  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around'
  }
});

export default LoadingScreen;
