import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const DigitInputRow = ({ value = '', onChange, borderColor = '#000' }) => {
  const TOTAL_DIGITS = 8;
  const [digits, setDigits] = useState(Array(TOTAL_DIGITS).fill('\u00A0')); 
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value !== '') {
      const clean = value.toString()
        .replace(/\./g, '') 
        .replace(/[^0-9\u00A0]/g, ''); 
      const arr = clean.split('').slice(0, TOTAL_DIGITS); 
      const filled = arr.concat(Array(TOTAL_DIGITS - arr.length).fill('\u00A0')); 
      setDigits(filled);
    } else {
      setDigits(Array(TOTAL_DIGITS).fill('\u00A0')); 
    }
  }, [value]);

  const handleChange = (text, index) => {
    if (!/^[\d\u00A0]?$/.test(text)) return; 

    const newDigits = [...digits];

    if (text !== '') {
      newDigits[index] = text;
    } else {
      newDigits[index] = '\u00A0';
    }

    setDigits(newDigits); 
    onChange(newDigits); 

    if (text && index < TOTAL_DIGITS + 1) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.wrapper}>
      {digits.map((digit, index) => {
        const showDot = index === TOTAL_DIGITS - 6;
        const showComma = index === TOTAL_DIGITS - 3;

        return (
          <React.Fragment key={index}>
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.input, { borderColor }]}
              value={digit === '\u00A0' ? '' : digit}
              maxLength={1}
              onChangeText={(text) => handleChange(text, index)} 
              keyboardType="number-pad"
              returnKeyType="next"
            />
            {showDot && <Text style={styles.comma}>.</Text>}
            {showComma && <Text style={styles.comma}>,</Text>}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 32,
    height: 48,
    borderWidth: 1,
    marginHorizontal: 2,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 6,
    fontFamily: 'Merriweather-SemiBold',
  },
  comma: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 4,
    fontFamily: 'Merriweather-SemiBold',
  },
});

export default DigitInputRow;
