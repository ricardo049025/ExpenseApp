import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyle } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const Bottomtabs = createBottomTabNavigator();

const ExpensesOverView = () =>{
  return(
    <Bottomtabs.Navigator 
    screenOptions={ ({navigation}) => ({
      headerStyle: {backgroundColor: GlobalStyle.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyle.colors.primary500},
      tabBarActiveTintColor: GlobalStyle.colors.accent500,
      headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={() => {
        navigation.navigate("ManageExpense");
      }}/>
      
    })}
    >
      <Bottomtabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color,size}) => <Ionicons name='hourglass' size={size} color={color}
        />
        
      }}/>
      <Bottomtabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color,size}) => <Ionicons name='calendar' size={size} color={color}
        />
        
      }}/>
    </Bottomtabs.Navigator>
  )
}

export default function App() {
  return (
      <>
        <StatusBar style="light"/>
          <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="ExpensesOverView" 
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyle.colors.primary500},
              headerTintColor: 'white'}}
            >
              <Stack.Screen name="ExpensesOverView" component={ExpensesOverView} options={{headerShown: false}}/>
              <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
                title: "Manage Expense",
                presentation: 'modal'
              }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </>
  );
}

const styles = StyleSheet.create({
 
});
