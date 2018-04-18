import React from 'react';
import { Dimensions, StyleSheet, LayoutAnimation, Animated, Text, ScrollView, StatusBar, View, TouchableOpacity } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.scrollToTop = this.scrollToTop.bind(this);

        this.state = {
            scrollY: new Animated.Value(0),
            headerWidth: DEVICE_WIDTH
        };
    }

    componentDidMount() {
        this.state.scrollY.addListener(({ value }) => {
            if (value >= 100) {
                LayoutAnimation.easeInEaseOut();
                this.setState({
                    headerWidth: 100
                });
            } else {
                LayoutAnimation.easeInEaseOut();
                this.setState({
                    headerWidth: DEVICE_WIDTH
                });
            }
        });

    }

    scrollToTop() {
        this.scrollView && this.scrollView._component.scrollTo({ y: 0, animated: true });
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
        const { scrollY, headerWidth } = this.state;
        const headerTop = scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [0, DEVICE_HEIGHT - 120],
            extrapolate: 'clamp'
        });
        const headerStyle = { 
            transform: [{ translateY: headerTop }], 
            width: headerWidth, 
            borderRadius: headerWidth < DEVICE_WIDTH ? 100 : 0, 
            left: headerWidth < DEVICE_WIDTH ? 20 : 0 
        };

        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Animated.ScrollView 
                    ref={sv => this.scrollView = sv}
                    style={styles.scrollView}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                >
                    <View style={styles.headerPlaceholder} />
                    {this.renderRow(20)}
                </Animated.ScrollView>
                <Animated.View style={[styles.header, headerStyle]}>
                    {headerWidth < DEVICE_WIDTH ? (
                        <TouchableOpacity onPress={this.scrollToTop} style={styles.buttonTop}>
                            <Text style={styles.textHeader}>
                                To top
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.textHeader}>
                            My header
                        </Text>
                    )}
                </Animated.View>
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
  headerPlaceholder: {
    height: 100
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  },
  buttonTop: {
      height: 100,
      width: 100,
      borderRadius: 100,
      justifyContent: 'center'
  }
});
