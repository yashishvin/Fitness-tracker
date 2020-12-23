import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements';
import { ScrollView , SafeAreaView} from 'react-native';

class TodayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:[],
            goalDailyActivity:0,
            sum:0
        }

    }
  
    
    

    componentDidMount() {
      console.log("this is the mout and it has been called");
      this._navListener = this.props.navigation.addListener('focus', () => {
        this.GetInfo();
    })


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
            var ar=[];
            var st=[];
            ar=data.activities;
            var date=new Date();
            var re=date.getHours()-6;
            date.setHours(re);
            console.log("the date in the component method is"+date);
             var jdate=JSON.stringify(date);
            console.log("the date after stringyfying in json format is in the component is"+jdate);
            jdate=jdate.slice(1,11);
            console.log("The jdate after slicing is"+jdate);
           for(var j in ar)
            {
              
              var apidate=ar[j].date;
              
              apidate=apidate.slice(0,10);
              console.log("the apidate after slicing is"+apidate);
            if(jdate===apidate)
            {      console.log("the name of the exercise being updated"+ar[j].name);
                      st[j]=ar[j];


            }
              
            
                      

            }
          
           this.setState({activity:st});
           
        });
     
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'GET',
            headers: {
                 'x-access-token': this.props.token 
            }
          })
            .then(res => res.json())
            .then(data => {
                 console.log("the desired value of the goal activity is"+data.goalDailyActivity);
              
               this.setState({goalDailyActivity:data.goalDailyActivity})
               
            });


 }
   display()
    {

       var a=[];
       a=this.state.activity;
       var goal=this.state.goalDailyActivity;
       var s=0;
       var dis=[];
       var k=0;
       console.log("the length of the array is"+a.length);
       if(a.length!=0){
       for( k in a)
       { console.log("this loop has been executed");
          dis[k]=this.exercisedisplay(a[k].name,a[k].duration,a[k].calories);
              s=s+a[k].duration;  

       }}

  if(k!=0)
  { console.log("this method handling non 0 array length case has been executed ");
  console.log("the value of the variable k is"+k);
    dis[k+1]=this.dispcount(goal,s);
  }
 else{
      console.log("this method handlin0 array length has been handled");
  dis[0]=this.dispcount(goal,s);
 }

return dis;
 



    }


   dispcount(goalDailyActivity,done)
    {

        console.log("this is the display for goals");
      let a=goalDailyActivity;
       let s=done;






 return(
<View>

 <Text>Your Goalactivity:{a}</Text>
 <Text>What you have doen so far:{s}</Text>
 
</View>
 );



    }
 exercisedisplay(na,dur,cal)
{
  console.log("this is the display for exercise details");
 let name=na;
 let duration=dur;
 let calories=cal;


 return(

<View>
  
<Card>
 <Card.Title>{name}</Card.Title>
  
  <Text>
The Name of the exercise is:{name}
  </Text>
<Text>
  The Duration of the exercise is:{duration}
</Text>

<Text>
  The Number of Calories burned are:{calories}
</Text>

</Card>

  </View>





 );



}




   
   
   /* getactivity()
    {
        
        
        var activ=[];
        var dis=[];
        var ret=[];
        var sum=0;
        activ=this.state.activity;
       var date=new Date();
       console.log("the day with time today is after the"+date);
     //  var n = date.toLocaleDateString();
     var jdate=JSON.stringify(date)
       console.log("the todays date is in json"+jdate);
     //var jdate=JSON.stringify(date);
       //console.log("the value of today in json is"+jdate);
      jdate=jdate.slice(1,11);
     console.log("the value of todays date after slicing is"+jdate);
       for(var i in activ)
       {




         let adate=activ[i].date;
         console.log("the date of today in api"+adate);
         adate=adate.slice(0,10)
         console.log("the value of the date after parrsing"+adate);
        
         //console.log("the value of api date is"+m);
         if(adate===jdate)
         {console.log("this has been executed it");
         console.log("the features are as follows"+activ[i].name+","+activ[i].duration+","+activ[i].calories);
           dis[i]=this.display(activ[i].name,activ[i].duration,activ[i].calories,adate)
           sum=sum+activ[i].duration;


         }
       }
            dis[i+1]=this.dispsum(this.state.goalDailyActivity,sum)
      return dis;



    }
    getgoals()
    {


    }*/

    render() {
        return <>
        <ScrollView>  {this.display()}</ScrollView> 
        
        </>
    }
}

const styles = StyleSheet.create({
    
});

export default TodayView;