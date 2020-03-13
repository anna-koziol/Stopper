import {createStackNavigator} from "react-navigation";
import Main from "./components/Main"
import Stopper from "./components/Stopper"

const App = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: Stopper },
});

export default App;

