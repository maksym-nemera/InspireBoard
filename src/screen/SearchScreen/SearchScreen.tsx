import React, { FC, memo, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export const SearchScreen: FC = memo(() => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleCancelPress = () => {
    setSearchText('');

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name='search'
          size={30}
          color={'black'}
          style={styles.icon}
        />

        <TextInput
          ref={inputRef}
          placeholder='Search photos, collections, users'
          value={searchText}
          onChangeText={handleSearchChange}
          style={styles.input}
        />

        <Entypo name='circle-with-cross' size={30} color='black' />
      </View>

      {searchText.length > 0 && (
        <Button title='Cancel' onPress={handleCancelPress}></Button>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
});
