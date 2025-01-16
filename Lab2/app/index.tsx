import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectList from 'react-native-dropdown-picker';

export default function App() {
  const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberText, setCardNumberText] = useState('');
  const [cardType, setCardType] = useState<keyof typeof cardLogo>('visa'); // Default card type
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusStyle, setFocusStyle] = useState({});
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const cardLogo = {
    visa: require('/Users/teohedelin/Skola/TDDC73/Lab2/assets/logo/Visa.png'),
    amex: require('/Users/teohedelin/Skola/TDDC73/Lab2/assets/logo/amex.png'),
    mastercard: require('/Users/teohedelin/Skola/TDDC73/Lab2/assets/logo/Mastercard.png'),
    discover: require('/Users/teohedelin/Skola/TDDC73/Lab2/assets/logo/discover.png'),
    troy: require('/Users/teohedelin/Skola/TDDC73/Lab2/assets/logo/troy.png'),
  };

  // Function to determine card type based on the card number
  const determineCardType = (number:string) => {
    if (/^4/.test(number)) return 'visa';
    if (/^(34|37)/.test(number)) return 'amex';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^6011/.test(number)) return 'discover';
    if (/^9792/.test(number)) return 'troy';
    return 'visa'; // Default
  };

  // Format card number for display
  const formatCardNumber = (number:string) => {
    number = number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (cardType === 'amex') {
      number = number.replace(/\s?/g, '').replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
    }
    return number;
  };
  const formatCardNumberText = (number:string) =>{
    number = number.replace(/\s?/g, '').replace(/(.{4})/g, '$1 ').trim();
    if (cardType === 'amex') {
      number = number.replace(/\s?/g, '').replace(/(.{4})(.{6})(.{5})/, '$1 $2 $3').trim();
    }
    return number;
  };

  // Handle card number change
  const handleCardNumberChange = (text: string) => {
    let numericText = text.replace(/[^0-9]/g, '');
    const paddedNumericText = numericText.padEnd(16, '#');
    const formattedText = formatCardNumberText(paddedNumericText);
    if (formattedText.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatCardNumber(numericText));
      setCardNumberText(formattedText);
    }
};

const handleCardCvv = (text: string) => {
  const numericText = text.replace(/[^0-9]/g, '');
  if (numericText.replace(/\s/g, '').length <= 4) {
    setCardCvv(numericText);
  }
};

  const [openMonth, setOpenMonth] = useState(false);
  const [months, setMonths] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      label: (i + 1).toString().padStart(2, '0'),
      value: (i + 1).toString().padStart(2, '0'),
    }))
  );

  const [openYear, setOpenYear] = useState(false);
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      label: (currentYear + i).toString(),
      value: (currentYear + i).toString(),
    }))
  );

  
  const cardRefs = useRef<{ [key: string]: View | null }>({});

  const handleCardCvvFocus = () => {
    setIsCardFlipped(true);
    Animated.spring(flipAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCardCvvBlur = () => {
    setIsCardFlipped(false);
    Animated.spring(flipAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  // Update card type when card number changes
  useEffect(() => {
    const sanitizedNumber = cardNumber.replace(/\s/g, '');
    setCardType(determineCardType(sanitizedNumber));
  }, [cardNumber]);

  // The rest of the styles and functionality remain the same
  const styles = StyleSheet.create({
    contentContainer: {
      backgroundColor: '#ccd5ff' , 
      height: '100%', 
      display: 'flex',
      justifyContent: 'center', 
    },
    wrapper: { 
      flex: 1, 
      backgroundColor: '#f9ea38', 
      height: '10%' ,
      borderRadius: 10,
      width: '80%',
    },
    cardForm: {
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff',
      borderRadius: 10,
      margin: 10,
      paddingBottom: 10,
      position: 'relative',
  },
    card: {
      width: '90%',
      borderRadius: 10,
      overflow: 'hidden',
      aspectRatio: 1.586,
      position: 'relative',
      marginTop: -100,
      backfaceVisibility: 'hidden', // Hide the back face of the card
    },
    cardBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 0,
      zIndex: 0,
    },
    cardLogo: {
      width: 60,
      height: 40,
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 10, // Ensure the logo is on top
      opacity: 1,
    },
    logoCvv: {
      right: 20,
      bottom: 20,
      opacity: 0.7,
      top: undefined,
    },
    cardNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 40,
    },
    blackStrip: {
      backgroundColor: '#000',
      height: 50,
      width: '100%',
      position: 'absolute',
      top: 20,
      zIndex: 5,
    },
    cvv: {
      backgroundColor: '#fff', 
      color: '#000',
      borderRadius: 10,
      width: '90%',
      margin: 'auto',
      marginTop: 110,
      height: 35,
      lineHeight: 35,
      textAlign: 'right',
      paddingRight: 10,
    },
    cvvText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      position: 'absolute',
      top: 85,
      right: 20,
      zIndex: 10,
    },
    cardDetailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 20 },
    cardNameContainer: { alignItems: 'flex-start' },
    cardExpiryContainer: { alignItems: 'flex-end' },
    label: { fontSize: 12, color: '#ddd' },
    value: { fontSize: 16, color: '#fff' },
    form: { width: '100%', paddingHorizontal: 10 },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    dropdownContainer: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc',
    },
    dropdown: { 
      flex: 1, 
      height: 40, 
      borderColor: '#ccc', 
      backgroundColor: '#fff', 
      borderWidth: 1,
    },
    cardBack: {
      position: 'absolute',
      top: 0,
      backfaceVisibility: 'hidden', // Hide the back face of the card
    },
    separator: { marginHorizontal: 5, fontSize: 18, fontWeight: 'bold' },
    submitButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5 },
    submitText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    cardCreator: { position: 'absolute', top: 0, left: 0 },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer} nestedScrollEnabled={true}>
         <View style={styles.cardForm}>
          {/* <View style={styles.wrapper}></View> */}
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              {/* Card Background */}
              <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/13.jpeg' }}
                style={styles.cardBackground}
              />
              {/* Card Logo */}
              <Image source = {cardLogo[cardType]} 
                style={styles.cardLogo}
                resizeMode='contain' 
                />
              {/* Card Number */}
              <Text style={styles.cardNumber}>
                {cardNumberText || '#### #### #### ####'}
              </Text>
              {/* Card Details */}
              <View style={styles.cardDetailsRow}>
                <View style={styles.cardNameContainer}>
                  <Text style={styles.label}>Card Holder</Text>
                  <Text style={styles.value}>{cardName || 'FULL NAME'}</Text>
                </View>
                <View style={styles.cardExpiryContainer}>
                  <Text style={styles.label}>Expires</Text>
                  <Text style={styles.value}>
                    {cardMonth || 'MM'}/{cardYear || 'YY'}
                  </Text>
                </View>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
            {/* Card CVV */}
            <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/14.jpeg' }}
                style={styles.cardBackground}
              />
              <View style={styles.blackStrip}></View>
               {/* Card Logo */}
               <Image source = {cardLogo[cardType]} 
                style={[styles.cardLogo, styles.logoCvv]}
                resizeMode='contain' 
                />
             <Text style={styles.cvvText}>CVV</Text>
            <Text style={[styles.cardNumber, styles.cvv]}>
              {cardCvv || '***'}
            </Text>
          </Animated.View>
            {/* Input Form */}
            <Text style={styles.separator}></Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Card Holder"
                value={cardName}
                onChangeText={setCardName}
              />
              <View style={[styles.dropdownContainer, {zIndex: 1}]}>
                <DropDownPicker
                  open={openMonth}
                  value={cardMonth}
                  items={months}
                  setOpen={setOpenMonth}
                  setValue={setCardMonth}
                  placeholder="MM"
                  containerStyle={styles.dropdown}
                  listMode='SCROLLVIEW'
                />
                <Text style={styles.separator}>/</Text>
                <DropDownPicker
                  open={openYear}
                  value={cardYear}
                  items={years}
                  setOpen={setOpenYear}
                  setValue={setCardYear}
                  placeholder="YY"
                  containerStyle={styles.dropdown}
                  listMode='SCROLLVIEW'
                  />
              </View>
              <Text style={styles.separator}></Text>
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cardCvv}
                onChangeText={handleCardCvv}
                onFocus={handleCardCvvFocus}
                onBlur={handleCardCvvBlur}
                maxLength={4}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
