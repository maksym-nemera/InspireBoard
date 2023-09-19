import { FC, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { Loader } from '../../components/Loader';
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../../types/Photo';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = ({ route, navigation }) => {
  const { photo } = route.params;

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const handleLoadStart = () => {
    setIsLoadingImage(true);
  };

  const handleLoadEnd = () => {
    setIsLoadingImage(false);
  };

  const handleUserImagePress = (user: User) => {
    navigation.navigate('Profile', { user });
  };

  const scrollViewRef = useRef(null);

  return (
    <View style={[styles.container]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        <View style={styles.photoCard}>
          <Image
            source={{ uri: photo.urls.full }}
            style={[styles.photoImage]}
            resizeMode='contain'
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => handleUserImagePress(photo.user)}>
            <Image
              source={{ uri: photo.user.profile_image.medium }}
              style={[styles.userImage]}
            />
          </TouchableOpacity>

          <Text>{`Likes: ${photo.likes}`}</Text>
          <Text>{`Total photos: ${photo.user.total_photos}`}</Text>
          <Text>{`Total collections: ${photo.user.total_collections}`}</Text>
          <Text>{photo.user.username}</Text>
          <Text>{photo.user.bio}</Text>
        </View>
      </ScrollView>

      {isLoadingImage && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoCard: {
    marginBottom: 20,
    // backgroundColor: '#E6CCE6',
  },
  photoImage: {
    alignSelf: 'center',
    width: '100%',
    height: 500,
  },
  loaderContainer: {
    position: 'absolute',
    top: 100,
    left: 100,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
