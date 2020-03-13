import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PanResponder, Animated, Vibration } from 'react-native';
import { Font, Location, Permissions } from 'expo';
import ProgressCircle from 'react-native-progress-circle';
import MyButton from "./MyButton"

export default class Stopper extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      percent: 100,
      fontloaded: false,
      time: 0,
      color: "#388E3C"
    };
  }

  componentWillMount = async () => {
    //FONT
    await Font.loadAsync({
      'myfont': require('./CaviarDreams.ttf'),
    });
    this.setState({ fontloaded: true });
  }

  componentDidMount() {
    this.setState({ time: this.props.navigation.state.params.time });

    //INTERVAL
    const timing = setInterval(x = () => {
      let t = this.state.time - 1;
      let p = ((t * 100) / this.props.navigation.state.params.time)
      this.setState({ time: t, percent: p });

      if (this.state.percent <= 20) {
        this.setState({ color: "#D32F2F" });
      }

      if (this.state.time <= 0) {
        console.log('Koniec');
        Vibration.vibrate(1000)
        clearInterval(timing);

        setTimeout(y = () => {
          this.props.navigation.navigate("s1")
        }, 2000)

      }
    }, 1000);

  }


  render() {
    return (
      this.state.fontloaded
        ?
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center' }}>
          <ProgressCircle
            percent={this.state.percent}
            radius={100}
            borderWidth={8}
            color={this.state.color}
            shadowColor="#BDBDBD"
            bgColor="#212121"
          >
            <Text style={{ fontSize: 18, color: '#BDBDBD', fontFamily: 'myfont' }}>{this.state.time}</Text>
          </ProgressCircle>
        </View>
        :
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center' }}>
          <ProgressCircle
            percent={90}
            radius={100}
            borderWidth={8}
            color="#388E3C"
            shadowColor="#BDBDBD"
            bgColor="#212121"
          >
            <Text style={{ fontSize: 18, color: '#BDBDBD' }}>{'90%'}</Text>
          </ProgressCircle>
        </View>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
  text: {
    fontSize: 30, color: '#BDBDBD', fontFamily: 'myfont'
  }
});

