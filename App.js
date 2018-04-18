import React from 'react';
import { StyleSheet, Animated, Text, ScrollView, StatusBar, View } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

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
        const { scrollY } = this.state;
        const headerTop = scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 100]
        });
        const headerStyle = { transform: [{ translateY: headerTop }] };

        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Animated.View style={[styles.header, headerStyle]}>
                    <Text style={styles.textHeader}>
                        My header
                    </Text>
                </Animated.View>
                <Animated.ScrollView style={styles.scrollView}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                >
                    {this.renderRow(20)}
                </Animated.ScrollView>
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
