import React from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';



class HomeScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {text: ''};
}

  render() {
    return (
      <View style={{padding: 10}}>

      <Text style={{fontSize: 50}}>Welcome to Relief Search.</Text>

      <Text style={{padding: 5}}> Name of Missing Person.</Text>
        <TextInput
          style={{height: 30}}
          placeholder="Full Name"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 5}}>Best Phone Number.</Text>
        <TextInput
          style={{height: 30}}
          placeholder="Phone Number"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
        onPress={() => this.props.navigation.navigate('PictureUpload')}
        title="Next"
        color="#79CDCD"
        accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

class PictureUpload extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  PictureUpload: {
    screen: PictureUpload,
  }
});
