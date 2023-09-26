/* eslint-disable no-magic-numbers */
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { searchPhotos } from '../../api/photos';
import { PhotoItem } from '../../components/PhotoItem';
import { Photo } from '../../types/Photo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as photosAction } from '../../features/photos/photosSlice';
import { Skeleton } from '../../components/Skeleton';
import { NotFound } from '../../components/NotFound';
import { SearchPhotos } from '../../types/SearchItems';

interface SearchScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export const SearchScreen: FC<SearchScreenProps> = memo(({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchedResult] = useState<SearchPhotos>({
    total: 0,
    total_pages: 0,
    results: [],
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCancel, setShowCancel] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const inputWidth = useRef(new Animated.Value(100)).current;

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.photos);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const animateInputWidth = useMemo(() => {
    return (toValue: number) => {
      Animated.timing(inputWidth, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  }, [inputWidth]);

  const handlePhotoPress = (photo: Photo) => {
    navigation.navigate('Photo', { photo });
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    animateInputWidth(80);

    setShowCancel(true);
  };

  const handleCancelPress = () => {
    setSearchText('');

    if (inputRef.current) {
      inputRef.current.blur();
    }

    animateInputWidth(100);
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

  // eslint-disable-next-line consistent-return
  const handleDonePress = async () => {
    try {
      dispatch(photosAction.setLoading(true));

      setCurrentPage(currentPage + 1);

      const result = await searchPhotos(searchText, currentPage);
      setSearchedResult({
        total: 0,
        total_pages: 0,
        results: [],
      });
      setSearchedResult(result);

      if (inputRef.current) {
        inputRef.current.blur();
      }

      animateInputWidth(100);

      setShowCancel(false);

      setIsSubmit(true);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(photosAction.setError('Error with download photos'));
      }

      dispatch(photosAction.setLoading(false));
    } finally {
      dispatch(photosAction.setLoading(false));
    }
  };

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);

    const result = await searchPhotos(searchText, currentPage);

    setSearchedResult((prevState) => {
      const uniquePhotos = result.results.filter(
        (newPhoto) =>
          !prevState.results.some((prevPhoto) => prevPhoto.id === newPhoto.id),
      );

      return {
        ...prevState,
        results: [...prevState.results, ...uniquePhotos],
      };
    });
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
            placeholder='Search photos...'
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

      {loading ? (
        <FlatList
          // eslint-disable-next-line no-magic-numbers
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          numColumns={2}
          renderItem={() => (
            <View
              style={{
                marginVertical: 5,
              }}
            >
              <Skeleton height={250} />
            </View>
          )}
          keyExtractor={(_, index) => String(index)}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={searchResult.results}
          numColumns={2}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <PhotoItem
              photo={item}
              onPress={() => handlePhotoPress(item)}
              isTall={item.width > item.height}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
        />
      )}

      {searchResult.total === 0 && isSubmit && <NotFound />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
    marginBottom: 50,
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
    paddingBottom: 5,
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
