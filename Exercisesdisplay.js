import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class Exercisesdisplay extends React.Component
{ constructor(props) {
    super(props);
    this.state = {
        
    }

}
check()
{


    console.log("this is exercises display and it has been shas been called");
}

 render()
 { this.check();
 return(

    <View>
        {this.check()}
       
        <Text>
            {this.props.name}
        </Text>
        
        </View>
);


}








}
export default Exercisesdisplay;