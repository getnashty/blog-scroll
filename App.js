import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar, View } from 'react-native';

export default class App extends React.Component {

    renderRow(num = 1) {
        return [...Array(num)].map((val, index) => {
            return (
                <View style={styles.row} key={index}>
                    <Text style={styles.text}>
                        My scrollable text
                    </Text>
                </View>
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.header}>
                    <Text style={styles.textHeader}>
                        My header
                    </Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {this.renderRow(20)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'red',
    justifyContent: 'center',
    height: 100
  },
  scrollView: {
    flex: 1
  },
  row: {
    paddingVertical: 30,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2
  },
  text: {
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    color: '#FFF'
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 16,
    color: '#000'
  }
});
