import React from 'react';
import { AppRegistry, Text, TextInput, View, Button, CameraRoll, StyleSheet, Image, ImageBackground } from 'react-native';

import { StackNavigator } from 'react-navigation'; // React-Native Navigator
import { ImagePicker } from 'expo'; //for CameraRoll


//Initial Screen
  class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {text: ''};
    }

  render() {
    return (

      <ImageBackground source={require('./images/coolPaper.jpg')} style={ styles.backgroundImage }>
      <View >


      <Text style={ styles.introText }>Welcome to Relief Search.</Text>
      <Text style ={ styles.subHeading }>Please enter a name and phone number. </Text>

      <Text style={{padding: 5, color: '#ffffff'}}> Name of Missing Person</Text>
        <TextInput
          style={{height: 30, backgroundColor: "#ffffff"}}
          placeholder="Full Name"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 5, color: '#ffffff'}}>Phone Number</Text>
        <TextInput
          style={{height: 30, backgroundColor: "#ffffff"}}
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
      </ImageBackground>

    );
  }
}

//Picture Uploading Screen
class PictureUpload extends React.Component {

  state = {
      image: null,
    };

    render() {
        let { image } = this.state;

        return (
          <ImageBackground source={require('./images/coolPaper.jpg')} style={ styles.backgroundImage }>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontFamily:'Helvetica', fontSize:30, textAlign:'center', color: '#ffffff'}}>Please upload a clear photo of the missing person.</Text>
            <Button
            //choose from camera roll via __pickImage
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
          </ImageBackground>
        );
      }

      //function for pulling up and choosing image from Camera Roll
      _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result); //print image object to verify

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }

  //API CAll STUFF
  var photo = {
    uri: result.uri,
    type: 'image/jpeg',
    name: 'photoTest',
  };

  var toSend = new FormData();
  toSend.append( 'name', 'file' );
  toSend.append( 'photo', photo);

  var request = {
  method: 'POST',
  headers: {},
  body: toSend
};

  console.log(toSend); //just printing to verify

fetch('http://35.185.245.7:80/api/Upload', request );

};
}

class ConfirmationPage extends React.Component {

  render() {
    return(
      <View style={{ flex: 1}}>
      <ImageBackground source={require('./images/coolPaper.jpg')} style={ styles.backgroundImage }>
      <Text style={ styles.titleText }>Thank you for your submission. You will hear from us in the near future via text message when we confirm a match.</Text>
      </ImageBackground>
      </View>
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

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: '#ffffff'
  },
  subHeading: {
    color: '#ffffff',
    fontSize: 20,
  },
  introText: {
    marginTop: 100,
    fontFamily: 'Helvetica',
    color: '#ffffff',
    fontSize: 60,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
