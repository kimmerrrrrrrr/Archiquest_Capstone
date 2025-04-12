import FacultyLogin from './FacultyAuth/FacultyLogin';
import FacultyRegister from './FacultyAuth/FacultyRegister';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import Dashboard from './Dashboard/Dashboard';
import Progress from './StudentProgressMonitoring/Progress';
import InsightPanel from './StudentProgressMonitoring/InsightPanel';
import FacultyDashboard from './StudentProgressMonitoring/FacultyDashboard';
import StudentProgress from './StudentProgressMonitoring/StudentProgress';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
        <Stack.Screen name='FacultyLogin' component={FacultyLogin}/>
        <Stack.Screen name='FacultyRegister' component={FacultyRegister}/>
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Progress' component={Progress} />
        <Stack.Screen name='InsightPanel' component={InsightPanel} />
        <Stack.Screen name='FacultyDashboard' component={FacultyDashboard} />
        <Stack.Screen name='StudentProgress' component={StudentProgress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

