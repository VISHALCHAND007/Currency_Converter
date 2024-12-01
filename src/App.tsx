//imports
import {currencyByRupee} from './constants';
//components
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';

import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {transformer} from '../metro.config';

function App(): JSX.Element {
  //defining states
  const [inputValue, setInputValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [resultValue, setResultValue] = useState('');

  //defining the behaviour of item pressed

  const onItemPressed = (targetCurrency: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert.',
        backgroundColor: '#FFF8E7',
        textColor: '#000000',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetCurrency.value;
      const result = `${targetCurrency.symbol} ${convertedValue.toFixed(3)}`;
      //setting value
      setResultValue(result);
      setTargetCurrency(targetCurrency.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert.',
        backgroundColor: '#FFF8E7',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always" // only works on IOs
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter a value in rupee to convert"
            />
          </View>
          {
            resultValue && (
              <Text style={styles.resultTxt}>{resultValue}</Text>
            )
          }
        </View>
        <View style={styles.bottomContainer}>
          //main part
          <FlatList 
            data={currencyByRupee}
            numColumns={3}
            keyExtractor={item=> item.name}
            renderItem={({item})=> (
              <Pressable
              style={[styles.button, 
                targetCurrency === item.name && styles.selected 
              ]}
              onPress={() => {onItemPressed(item)}}>
                  <CurrencyButton {...item}/>
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6082B6',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 2,
  },
  button: {
    flex: 1,
    margin: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#E6E6FA',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
