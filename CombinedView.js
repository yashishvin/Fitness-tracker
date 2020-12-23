import TodayView from './TodayView'
import ExercisesView from './ExercisesView'
import ProfileView from './ProfileView'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class CombinedView extends React.Component
{ constructor(props){
  super(props)
  this.state = {
    token:"",
    username:""
  }

}
  
   render()
   {
    const TabNavigation = createBottomTabNavigator();
     return(
      <TabNavigation.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <TabNavigation.Screen
        name="Exercises View"
         options={{
          tabBarLabel: 'Exercises View',
          tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          },
          tabBarIcon:({tintColor})=>(  
            <Icon name="running" color={tintColor} size={25}/>  
        )  
          
        }}
      >
         {props=><ExercisesView {...props} token={this.props.accessToken} username={this.props.username}/>}

      </TabNavigation.Screen>
      <TabNavigation.Screen
        name="ProfileView"
        options={{
          tabBarLabel: 'ProfileView',
        
          tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          },
           tabBarIcon:({tintColor})=>(  
            <Icon name="male" color={tintColor} size={25}/>  
        )  
          
        }}
      >
       
       {props => <ProfileView {...props} token={this.props.accessToken} username={this.props.username} revokeAccessToken={this.props.revokeAccessToken}/>}

      </TabNavigation.Screen>


      <TabNavigation.Screen
        name="TodaysView"
        options={{
          tabBarLabel: 'TodaysView',
        
          tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          },
          tabBarIcon:({tintColor})=>(  
            <Icon name="calendar" color={tintColor} size={25}/>  
        )  
          
        }}
      >
       
       {props => <TodayView {...props} token={this.props.accessToken} username={this.props.username} />}

      </TabNavigation.Screen>

      








    </TabNavigation.Navigator>
       
        
      
      
      
      
      );




   }
   







}
export default CombinedView;