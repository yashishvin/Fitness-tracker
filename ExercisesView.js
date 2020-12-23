import React,{ Component } from 'react';
import { ScrollView , SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Image, View, Text, Modal, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, ListItem, Button} from 'react-native-elements';
import { TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:[],
           
            name_of_exercise:"name of exercise ",
            duration:"duartion",
            calories:"calories",
            date:"2020-11-16"
        }

    }
    
    
      
    GetInfo()
    { console.log("this is the get info method and it has been called")
      fetch('https://mysqlcs639.cs.wisc.edu/activities', {
        method: 'GET',
        headers: {
             'x-access-token': this.props.token 
        }
      })
        .then(res => res.json())
        .then(data => {
             this.setState({activity:data.activities});
           
        });
     
       

 }







    componentDidMount()
     {
        
        this._navListener = this.props.navigation.addListener('focus', () => {
            this.GetInfo();
        })
    



    }
     displayexercise()
     {
        var ex=[];
        ex=this.state.activity;
        console.log("the length of the exercises array is"+ex.length);
        var dis=[];
        var m=0;
        for(m in ex)
        {   console.log("the exrcises name sare"+ex[m].name);
             var di=this.display(ex[m].date,ex[m].calories,ex[m].duration,ex[m].name)
              dis.push(m,di); 
   
                     


        }



       return dis;


     }
     updateinfo()
     {
        fetch('https://mysqlcs639.cs.wisc.edu/activities/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': this.props.token
            },
            body: JSON.stringify({
              name: this.state.name_of_exercise,
              duration: this.state.duration,
              calories: this.state.calories,
             
             
            })
          })
            .then(res => res.json())
            .then(res => {
              alert("Your exercise has been added!");
            })
            .catch(err => {
              alert("Something went wrong! Verify you have filled out the fields correctly.");
            });











     }

  display(da,cal,dur,nam)
  { 
     let duration=dur;
      let calories=cal;
      let  date=da;
      let name=nam;
     
        
      return (
            <View>
                    
                  <Card>
                  <Card.Title><Text>The name of the exercise is</Text>{name}</Card.Title>
                           <Text>The Date of the exercise is:{date}</Text> 
                           <Text>The Number ofcalories for the exercise is:{calories}</Text> 
                           <Text>The Duration for the exercise is:{duration}</Text> 
               
                           



                  </Card>

                



                </View>





      );

          





  }




    render() {
        return (
       
        <ScrollView>
                     {this. displayexercise()}
                      <Text>{"\n"}</Text>
                      <Text>{"\n"}</Text>
             <Text style={styles.text}>You can add your exercises below</Text>
            <Text >The name of the exercise</Text>
             <TextInput
     
            placeholder={this.state. name_of_exercise.toString()}
              onChangeText={ (val)=>this.setState({firstName:val})}
                           />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text >The duration of the exercise</Text>
      <TextInput
     
      placeholder={this.state. duration.toString()}
      onChangeText={ (val)=>this.setState({lastName:val})}
      />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text> The number of Calories in the exercise</Text>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text >calories</Text>
      <TextInput
     
      placeholder={this.state.calories.toString()}
      onChangeText={ (val)=>this.setState({calories:val})}
      />
     
    
     
    
            <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                 <Text>Are you done then add your exercises</Text>
        <DatePicker
             style={{width: 200}}
           date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-11-01"
        maxDate="2021-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
         <Button
        title="Add exercise"
        onPress={() => this.updateinfo()}
      />
      <Text>{"\n"}</Text>
     
    
      
      </ScrollView> 
    
          
        
        );
    }
}

const styles = StyleSheet.create({
    
});

export default ExercisesView;