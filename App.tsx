import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { MainApp } from './src/MainApp';

enableScreens();

export default function App() {
  return <MainApp />;
}
