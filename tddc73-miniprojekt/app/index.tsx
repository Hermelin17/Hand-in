import React, { useState } from 'react'; 
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import PasswordStrengthMeter from './components/password-strength-meter'; 
import CreateAccount from './components/create_account'; 

const App: React.FC = () => {
  const [savedPassword, setSavedPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [uName, setUName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dateYear, setYear] = useState<number>(0);
  const [dateMonth, setMonth] = useState<number>(0);
  const [dateDay, setDay] = useState<number>(0);
  const [favoriteColor, setFavoriteColor] = useState<string>('');

  const handlePasswordSubmit = (password: string, strength: number) => {
    console.log('Password received:', password); 
    console.log('Strength received:', strength); 
    setSavedPassword(password);
    setPasswordStrength(strength);
  };

  const handleCreateAccount = (name: string, uName: string, email: string, gender: string, dateYear: number, dateMonth: number, dateDay: number, additionalFields: { [key: string]: string }) => {
    console.log('Account created with:', { name, uName, email, gender, dateYear, dateMonth, dateDay, ...additionalFields });
    setName(name);
    setUName(uName);
    setEmail(email);
    setGender(gender);
    setYear(dateYear);
    setMonth(dateMonth);
    setDay(dateDay);
    setFavoriteColor(additionalFields.favoriteColor || '');
  };

  return (
      <View style={styles.container}>
      <View style={styles.createAccountContainer}>
        <CreateAccount
          onAccSubmit={handleCreateAccount}
          additionalFields={[
            // { label: 'Favorite Color', key: 'favoriteColor' },
            // { label: 'Hobby', key: 'hobby' },
            // { label: 'Phone Number', key: 'phoneNumber' }
          ]}
        />
        </View>
        <View style={styles.passwordMeterContainer}>
        <PasswordStrengthMeter
          width={350} 
          showPassword={true}
          onPasswordSubmit={handlePasswordSubmit}
        />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#f5f5f5',
  },
createAccountContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  position: 'absolute',
  bottom: 420,
  top: 0,
  left: 0,
  right: 0,
},
passwordMeterContainer: {
  position: 'absolute',
  bottom: 52,
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 20,
  zIndex: 1,
},
});

export default App;