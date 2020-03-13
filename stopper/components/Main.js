import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PanResponder, Animated, Vibration } from 'react-native';
import { Font, Location, Permissions } from 'expo';
import ProgressCircle from 'react-native-progress-circle';
import MyButton from "./MyButton"

var CIRCLE_SIZE = 30;

export default class Main extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      data: " ",
      number: 0,
      fontloaded: false,
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      percent: 5,
      angle: 0,
      time: 0,
      prev: 0,
      min: 0
    };
    this._panResponder = {};
    this._previousLeft = 0;
    this._previousTop = 0;
    this._circleStyles = {};
    this.circle = null;
  }




  componentWillMount = async () => {
    //PAN RESPONDER
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: '#c30c56',
      }
    };

    //FONT
    await Font.loadAsync({
      'myfont': require('./CaviarDreams.ttf'),
    });
    this.setState({ fontloaded: true });
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  test() {
    var _time = (this.state.min * 60) + this.state.time;
    this.props.navigation.navigate("s2", {time: _time});
  }


  render() {
    return (
      this.state.fontloaded
        ?
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#212121', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {
            this.state.time < 10
              ?
              <Text style={{ fontSize: 30, color: '#BDBDBD', fontFamily: 'myfont' }}>Set {this.state.min}:0{this.state.time}</Text>
              :
              <Text style={{ fontSize: 30, color: '#BDBDBD', fontFamily: 'myfont' }}>Set {this.state.min}:{this.state.time}</Text>
          }

          <ProgressCircle
            percent={(this.state.angle * 100) / 60}
            radius={100}
            borderWidth={8}
            color="#c30c56"
            shadowColor="#BDBDBD"
            bgColor="#212121"
          >

            <View style={styles.circle}
              ref={(circle) => {
                this.circle = circle;
              }}
              {...this._panResponder.panHandlers}
            />
            <Text style={{ fontSize: 30, color: '#BDBDBD', fontFamily: 'myfont' }}>{this.state.angle + ' s'}</Text>
          </ProgressCircle>

          <MyButton tekst="START" funkcja={() => this.test()} styleProp={styles.text} />

        </View>
        :
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center' }}>
          <ProgressCircle
            percent={70}
            radius={100}
            borderWidth={8}
            color="#FF4081"
            shadowColor="#BDBDBD"
            bgColor="#212121"
          >
            <Text style={{ fontSize: 18, color: '#BDBDBD' }}>{'70%'}</Text>
          </ProgressCircle>
        </View>
    );
  }


  _highlight = () => {
    this._circleStyles.style.backgroundColor = '#c30c56';
    this._updateNativeStyles();
  }

  _unHighlight = () => {
    this._circleStyles.style.backgroundColor = '#BDBDBD';
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder() {
    return true;
  }

  _handleMoveShouldSetPanResponder() {
    return true;
  }

  _handlePanResponderGrant = (e, gestureState) => {
    this._highlight();
  }

  _handlePanResponderMove = (e, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this.setState({
      x: parseInt(this._previousLeft + gestureState.dx),
      y: parseInt((this._previousTop + gestureState.dy)),
    });

    if (this.state.y < 155 && this.state.y >= 0) {
      //OD O DO 30
      if ((this._previousLeft + gestureState.dx) > 152 / 2) {
        let helper = parseInt((((this._previousTop + gestureState.dy) * 30) / 152));
        if (helper < 0) { helper *= (-1); }
        //ZWIĘKSZANIE MINUT
        if (this.state.prev > 50) {
          this.setState({ angle: helper, time: helper, min: this.state.min + 1, prev: helper });
        }
        else {
          this.setState({ angle: helper, time: helper, prev: helper });
        }
      }
      //OD 30 DO 60
      else {
        let helper = parseInt(60 - (((this._previousTop + gestureState.dy) * 30) / 152));
        if (helper < 0) { helper *= (-1); }
        if (helper > 60) { helper = 60; }
        this.setState({ angle: helper, time: helper, prev: helper });
      }

    }

    this._updateNativeStyles();
  }
  _handlePanResponderEnd = (e, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    zIndex: 100,
    top: 0
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
  text: {
    fontSize: 30, color: '#BDBDBD', fontFamily: 'myfont'
  }
});

