import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ManageExpenses from "./Screens/ManageExpenses";
import AllExpenses from "./Screens/AllExpenses";
import RecentExpences from "./Screens/RecentExpences";
import { GlobalStyles } from "./Constants/GlobalStyles";
import Ionicon from "react-native-vector-icons/Ionicons";
import IconButton from "./Components/IconButton";
import ExpenseContextProvider from "./Contexts/ExpenseContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("Manage Expences", { id: null })}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Recent Expences"
        component={RecentExpences}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: GlobalStyles.colors.primary50 },
            }}
          >
            <Stack.Screen
              name="Tab Navigator"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Manage Expences" component={ManageExpenses} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
      <StatusBar style="light" />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
