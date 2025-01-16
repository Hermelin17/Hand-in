import { Colors } from '@/app-example/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface CreateAccProps {
  width?: number; 
  onAccSubmit: (
    Name: string,
    UName: string,
    Email: string,
    Gender: string,
    DateYear: number,
    DateMonth: number,
    DateDay: number,
    additionalFields: { [key: string]: string }
  ) => void;
  additionalFields?: { label: string, key: string }[];
}

const CreateAccount: React.FC<CreateAccProps> = ({ onAccSubmit, additionalFields = [] }) => {
  const [name, setName] = useState('');
  const [uName, setUName] = useState('');
  const [email, setEmail] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [gender, setGender] = useState('');
  const [openYear, setOpenYear] = useState(false); 
  const [dateYear, setYear] = useState('');
  const [openMonth, setOpenMonth] = useState(false);
  const [dateMonth, setMonth] = useState('');
  const [openDay, setOpenDay] = useState(false);
  const [dateDay, setDay] = useState('');
  const [additionalValues, setAdditionalValues] = useState<{ [key: string]: string }>({});

  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year = (new Date().getFullYear() - i).toString();
    return { label: year, value: year };
  });

  const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString();
    return { label: day, value: day };
  });

  const handleCreateAccountSubmit = () => {
    if (!name || !uName || !email || !gender || !dateYear || !dateMonth || !dateDay) {
      Alert.alert('Please fill in all fields');
      return;
    }
    onAccSubmit(name, uName, email, gender, parseInt(dateYear), parseInt(dateMonth), parseInt(dateDay), additionalValues);
  };

  const getBorderColor = (value: string) => {
    return value ? 'green' : 'red';
  };

  const handleAdditionalChange = (key: string, value: string) => {
    setAdditionalValues(prevValues => ({ ...prevValues, [key]: value }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Full Name</Text>
        <TextInput
          style={[styles.input, { borderColor: getBorderColor(name) }]}
          value={name}
          onChangeText={setName}
        />

        <Text>Username</Text>
        <TextInput
          style={[styles.input, { borderColor: getBorderColor(uName) }]}
          value={uName}
          onChangeText={setUName}
        />

        <Text>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: getBorderColor(email) }]}
          value={email}
          onChangeText={setEmail}
        />

        <Text>Gender</Text>
        <View style={{zIndex: 4000}}>
        <DropDownPicker
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          open={openGender}
          value={gender}
          setOpen={setOpenGender}
          setValue={setGender}
          placeholder='--'
          containerStyle={[styles.genderInput]}
          textStyle={{color: getBorderColor(gender)}}
          listMode='SCROLLVIEW'
          zIndex={4000}
          zIndexInverse={1000}
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
        </View>
        <Text>Date of Birth</Text>
        <View style={styles.datePicker}>
          <DropDownPicker
            items={yearOptions}
            open={openYear}
            value={dateYear}
            setOpen={setOpenYear}
            setValue={setYear}
            containerStyle={[styles.dateInput]}
            textStyle={{color: getBorderColor(dateYear)}}
            listMode='SCROLLVIEW'
            zIndex={3000}
            zIndexInverse={2000}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            placeholder="Year"
          />
          <DropDownPicker
            items={[
              { label: 'January', value: '1' },
              { label: 'February', value: '2' },
              { label: 'March', value: '3' },
              { label: 'April', value: '4' },
              { label: 'May', value: '5' },
              { label: 'June', value: '6' },
              { label: 'July', value: '7' },
              { label: 'August', value: '8' },
              { label: 'September', value: '9' },
              { label: 'October', value: '10' },
              { label: 'November', value: '11' },
              { label: 'December', value: '12' },
            ]}
            open={openMonth}
            value={dateMonth}
            setOpen={setOpenMonth}
            setValue={setMonth}
            containerStyle={[styles.dateInput]}
            textStyle={{color: getBorderColor(dateMonth)}}
            listMode='SCROLLVIEW'
            zIndex={2000}
            zIndexInverse={3000}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            placeholder="Month"
          />
          <DropDownPicker
            items={dayOptions}
            open={openDay}
            value={dateDay}
            setOpen={setOpenDay}
            setValue={setDay}
            containerStyle={[styles.dateInput]}
            textStyle={{color: getBorderColor(dateDay)}}
            listMode='SCROLLVIEW'
            zIndex={1000}
            zIndexInverse={4000}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            placeholder="Day"
          />
        </View>
        
        
        {additionalFields.map(field => (
        <View>
        <Text>{field.label}</Text>
          <TextInput
            key={field.key}
            value={additionalValues[field.key] || ''}
            onChangeText={text => handleAdditionalChange(field.key, text)}
            style={[styles.input, { borderColor: getBorderColor(uName) }]}
          />
        </View>
        ))}
        <View style={styles.createButton}>
            <Button  title="Create Account" onPress={handleCreateAccountSubmit}/>
        </View>
      </View>
   </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
scrollView: {
    flex: 1,
    },
    container: {
    padding: 20,
    zIndex: 5000,
    },
    input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 2,
    paddingLeft: 8,
    },
    datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3000,
    },
    dateInput: {
    flex: 1,
    height: 40,
    marginBottom: 5,
    },
    genderInput: {
    height: 40,
    marginBottom: 10,
    zIndex: 1000,
    },
    createButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    width: 200,
    alignSelf: 'center',
    }
});

export default CreateAccount;