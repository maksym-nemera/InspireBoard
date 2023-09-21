import { FC } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserInfo } from '../../components/UserInfo';
import { Ionicons } from '@expo/vector-icons';
import { getInvertedColor } from '../../utils/utils';
import { FullPicture } from '../../components/FullPicture';
import { PhotoItem } from '../../components/PhotoItem';
import { Photo } from '../../types/Photo';
import { useAppSelector } from '../../app/hooks';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = ({ route, navigation }) => {
  const { photo } = route.params;
  const { photos } = useAppSelector((state) => state.photos);

  const handlePhotoPress = (photo: Photo) => {
    navigation.push('Photo', { photo });
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='ios-chevron-back-sharp'
            size={26}
            color={getInvertedColor(photo.color)}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <FullPicture photo={photo} />

            <UserInfo navigation={navigation} photo={photo} />
          </>
        )}
        data={photos}
        numColumns={2}
        keyExtractor={(photo) => photo.id}
        renderItem={({ item }) => (
          <PhotoItem
            photo={item}
            onPress={() => handlePhotoPress(item)}
            isTall={item.width > item.height}
          />
        )}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: 55,
    left: 10,
    zIndex: 1,
  },
});
