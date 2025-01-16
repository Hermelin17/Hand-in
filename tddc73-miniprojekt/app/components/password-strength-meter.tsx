import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard } from 'react-native';

// props för att skicka in anpassade inställningar och callback-funktion
interface PasswordStrengthMeterProps {
  width?: number; 
  showPassword?: boolean;
  onPasswordSubmit: (password: string, strength: number) => void; // callback-funktion som skickar lösenord och styrka tillbaka till index.tsx
}

// main-componenten för PSM
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  width = 300, 
  showPassword = false, 
  onPasswordSubmit, // funktion som hanteras av index.tsx
}) => {
  const [password, setPassword] = useState<string>(''); // state för att hålla lösenordet & styrkan
  const [strength, setStrength] = useState<number>(0); 

  const evaluateStrength = (pwd: string): number => {
    let score = 0;
    if (pwd.length === 0) score = 0; // om lösenordet är tomt
    if (pwd.length >= 0) score += 1; 
    if (pwd.length >= 10) score += 1; 
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1; 
    if (/[0-9]/.test(pwd)) score += 1; 
    if (/[^A-Za-z0-9]/.test(pwd) && pwd.length >= 4) score += 1; 
    return score;
  };

  // hanterar ändringar i lösenordet live
  const handlePasswordChange = (text: string) => {
    setPassword(text); // uppdaterar lösenordet
    const strengthScore = evaluateStrength(text); 
    setStrength(strengthScore); // uppdaterar styrkan i state
  };

  // hanterar vad som händer när lösenordet skickas
  const handlePasswordSubmit = () => {
    onPasswordSubmit(password, strength); // skickar lösenordet och styrkan tillbaka till index.tsx
    Keyboard.dismiss(); 
  };

  const getColor = (): string => {
    if (strength === 1) return 'red'; 
    if (strength === 2) return 'red'; 
    if (strength === 3) return 'orange'; 
    if (strength === 4) return 'yellow';
    if (strength >= 5) return 'green'; 
    return 'gray'; // om strength = 0 dvs fältet är tomt
  };

  // text under rutan
  const getMesseage = (): string => {
    if (strength === 1) return 'Your password is very weak'; 
    if (strength === 2) return 'Your password is very weak'; 
    if (strength === 3) return 'Your password is kinda weak'; 
    if (strength === 4) return 'Your password is mediocre';
    if (strength >= 5) return 'Your password is very strong';
    return ''; // om inget är skrivet än
  };

  // komponenten som skickas
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.passwordTitle}>Enter password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword} // döljer lösenordet om showPassword = false
        placeholder="Enter password"
        value={password} // anslut lösenordets state till textfältet
        onChangeText={handlePasswordChange} // uppdatera lösenord vid varje tangenttryckning
        onSubmitEditing={handlePasswordSubmit} // retur
      />
      <View style={[styles.strengthBar, { backgroundColor: getColor() }]} />
      <Text style={styles.text}>{getMesseage()}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginBottom: 220,
    zIndex: 0,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, 
  },
  strengthBar: {
    height: 10, 
    width: '100%', 
    borderRadius: 5, 
    marginVertical: 5,
  },
  text: {
    marginTop: 5, 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  passwordTitle: {
    fontSize: 18,
    paddingBottom: 10
  }
});

export default PasswordStrengthMeter;
