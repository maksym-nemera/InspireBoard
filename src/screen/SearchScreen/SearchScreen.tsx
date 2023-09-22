/* eslint-disable no-magic-numbers */
import { FC, memo, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export const SearchScreen: FC = memo(() => {
  const [searchText, setSearchText] = useState('');
  const [showCancel, setShowCancel] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const inputWidth = useRef(new Animated.Value(100)).current;

  const animateInputWidth = useMemo(() => {
    return (toValue: number) => {
      Animated.timing(inputWidth, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  }, [inputWidth]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    animateInputWidth(80);

    setShowCancel(!!text);
  };

  const handleCancelPress = () => {
    setSearchText('');

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setShowCancel(false);
  };

  const handleCancelPressWithoutFeedback = () => {
    setSearchText('');

    animateInputWidth(80);

    setShowCancel(true);
  };

  const handleInputFocus = () => {
    animateInputWidth(100);
  };

  const handleInputBlur = () => {
    animateInputWidth(100);
  };

  const handleDonePress = () => {
    setSearchText('');

    if (inputRef.current) {
      inputRef.current.blur();
    }

    animateInputWidth(100);

    setShowCancel(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainerWithCancel}>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              width: inputWidth.interpolate({
                inputRange: [80, 100],
                outputRange: ['80%', '100%'],
              }),
            },
          ]}
        >
          <MaterialIcons
            name='search'
            size={35}
            color='black'
            style={styles.iconSearch}
          />

          <TextInput
            ref={inputRef}
            placeholder='Search photos, collections, users'
            value={searchText}
            onChangeText={handleSearchChange}
            style={styles.input}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            textAlignVertical='center'
            returnKeyType='search'
            onSubmitEditing={handleDonePress}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleCancelPressWithoutFeedback}>
              <Entypo
                name='circle-with-cross'
                size={22}
                color='black'
                style={styles.iconCross}
              />
            </TouchableOpacity>
          )}
        </Animated.View>

        {showCancel && (
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={handleCancelPress}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
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
  },
  inputContainerWithCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSearch: {
    marginHorizontal: 5,
    position: 'absolute',
  },
  iconCross: {
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 45,
    height: 40,
  },
  cancelButtonContainer: {
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
