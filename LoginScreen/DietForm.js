import React, { useState } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Text, Button, Chip, RadioButton, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const DietForm = () => {
  const [step, setStep] = useState(1);
  const [diet, setDiet] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [serving, setServing] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState('Sunday');

  const dietOptions = ['Clean', 'Low-carb', 'Keto', 'Pescatarian', 'Vegan', 'Vegetarian'];
  const allergyOptions = ['Gluten', 'Peanuts', 'Tree nuts', 'Lactose', 'Seafood', 'Mustard'];
  const dislikeOptions = ['Seafood', 'Spicy', 'Mushroom', 'Eggplant', 'Tofu', 'None'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleSelection = (item, array, setArray) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const toggleSwitch = () => setIsEnabled(previous => !previous);

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Set to false for 24-hour format
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text variant="titleMedium" style={{ marginBottom: 10, color: '#000' }}>
              Pick your diet
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dietOptions.map(option => (
                <Chip
                  key={option}
                  selected={diet === option}
                  onPress={() => setDiet(option)}
                  style={{
                    margin: 4,
                    backgroundColor: diet === option ? '#FFA500' : '#fff',
                  }}
                  textStyle={{ color: '#000' }}
                >
                  {option}
                </Chip>
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text variant="titleMedium" style={{ marginBottom: 10, color: '#000' }}>
              Any allergies?
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {allergyOptions.map(option => (
                <Chip
                  key={option}
                  selected={allergies.includes(option)}
                  onPress={() => toggleSelection(option, allergies, setAllergies)}
                  style={{
                    margin: 4,
                    backgroundColor: allergies.includes(option) ? '#FFA500' : '#fff',
                  }}
                  textStyle={{ color: '#000' }}
                >
                  {option}
                </Chip>
              ))}
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text variant="titleMedium" style={{ marginBottom: 10, color: '#000' }}>
              How about dislikes?
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dislikeOptions.map(option => (
                <Chip
                  key={option}
                  selected={dislikes.includes(option)}
                  onPress={() => toggleSelection(option, dislikes, setDislikes)}
                  style={{
                    margin: 4,
                    backgroundColor: dislikes.includes(option) ? '#FFA500' : '#fff',
                  }}
                  textStyle={{ color: '#000' }}
                >
                  {option}
                </Chip>
              ))}
            </View>
          </>
        );
      case 4:
        return (
          <>
            <Text variant="titleMedium" style={{ marginBottom: 10, color: '#000' }}>
              How many servings per meal?
            </Text>
            <RadioButton.Group
              onValueChange={value => setServing(value)}
              value={serving}
            >
              <RadioButton.Item label="2 servings" value="2" labelStyle={{ color: '#000' }} />
              <RadioButton.Item label="4 servings" value="4" labelStyle={{ color: '#000' }} />
              <RadioButton.Item label="6 servings" value="6" labelStyle={{ color: '#000' }} />
            </RadioButton.Group>
          </>
        );
      case 5:
        return (
          <>
            <Text variant="titleMedium" style={{ marginBottom: 10, color: '#000' }}>
              Set a weekly reminder
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#000' }}>Remind me to make a meal plan</Text>
              <Switch value={isEnabled} onValueChange={toggleSwitch} />
            </View>

            {isEnabled && (
              <>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#000', marginBottom: 5 }}>Pick Time:</Text>
                  <Button
                    mode="outlined"
                    onPress={() => setShowTimePicker(true)}
                    textColor="#000"
                    style={{ borderColor: '#FFA500' }}
                  >
                    {formattedTime}
                  </Button>

                  {showTimePicker && (
                    <DateTimePicker
                      value={time}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onChangeTime}
                    />
                  )}
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#000', marginBottom: 5 }}>Pick Day:</Text>
                  <Picker
                    selectedValue={day}
                    onValueChange={itemValue => setDay(itemValue)}
                    style={{ color: '#000' }}
                  >
                    {days.map(d => (
                      <Picker.Item key={d} label={d} value={d} />
                    ))}
                  </Picker>
                </View>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >
      {renderStep()}
      <Button
        mode="contained"
        onPress={() =>
          step < 5
            ? setStep(step + 1)
            : alert(`Reminder set for ${formattedTime} on ${day}`)
        }
        style={{ marginTop: 30, backgroundColor: '#FFA500' }}
        labelStyle={{ color: '#000' }}
      >
        {step < 5 ? 'Continue' : 'Finish'}
      </Button>
    </ScrollView>
  );
};

export default DietForm;
