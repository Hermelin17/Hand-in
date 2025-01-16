import { View, Button, Image, TextInput, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: "column", 
    alignItems: "center",
    marginTop: -220,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
    width: 100,
  },
  allButtonContainer: {
    marginTop: -70,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginHorizontal: 50, // Increase this value to add more space
  },  
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
  buttonStyle: {
    margin: 15,
    marginHorizontal: 60, // Add margin here for horizontal spacing between buttons
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },  
  imageStyle: {
    width: 120,
    height: 120,
    alignItems: 'center',
    marginBottom: 70,
    marginTop: -70,
  },
});

export default function Index() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{  flex: 1, justifyContent: "center", alignItems: "center",}}>
   
    {/*Top border*/}
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "#009973",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Example 1 - React Native</Text>
    </View>

    {/* Main content */}
     {/* Button inside a bordered box */}
    <View style={styles.container}>
    <Image
        style={styles.imageStyle}
        source={require('../Image.png')}
      />
      <View style={styles.allButtonContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            
            <Button color="black"  title="Button"/>
          </View>
          <View style={styles.buttonStyle}>
            <Button color="black"  title="Button"/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button color="black"  title="Button"/>
          </View>
          <View style={styles.buttonStyle}>
            <Button color="black"  title="Button"/>
          </View>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput 
          style={styles.input}
          keyboardType="email-address"
          onFocus={() => console.log("TextInput focused")} 
        />
      </View>
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
