import React from 'react';
import { AppRegistry, Text, TextInput, View, Button, CameraRoll, StyleSheet, Image } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';


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
        accessibilityLabel="Enter data, move to next screen"
        />
      </View>
    );
  }
}


class PictureUpload extends React.Component {

  state = {
      image: null,
    };

    render() {
        let { image } = this.state;

        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              title="Upload an image from Camera Roll"
              onPress={this._pickImage}
            />
            {image &&
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

              <Button
                onPress= {() => this.props.navigation.navigate('ConfirmationPage') }
                title="Next"
                color="#79CDCD"
                accessibilityLabel="Enter data, move to next screen"
              />

          </View>
        );
      }
      _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
    this.setState({ image: result.uri });

  }
};

}

class ConfirmationPage extends React.Component {

  render() {
    return(
      <View><Text>Thank you for your submission. You will hear from us in the near future when we confirm a match.</Text></View>
    );
  }
}



export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  PictureUpload: {
    screen: PictureUpload,
  },
  ConfirmationPage: {
    screen: ConfirmationPage,
  }
});
