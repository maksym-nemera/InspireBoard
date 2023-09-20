import { FC, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Loader } from '../../components/Loader';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserInfo } from '../../components/UserInfo';
import { FontAwesome } from '@expo/vector-icons';
import { formatLikesCount } from '../../utils/utils';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = ({ route, navigation }) => {
  const { photo } = route.params;
  const aspectRatio = photo.width / photo.height;

  // console.log(photo.created_at);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const handleTap = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setIsLikedPhoto(!isLikedPhoto);
    }

    setLastTap(now);
  };

  const handleLoadStart = () => {
    setIsLoadingImage(true);
  };

  const handleLoadEnd = () => {
    setIsLoadingImage(false);
  };

  const handleDoubleTap = () => {
    setIsLikedPhoto(!isLikedPhoto);
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
          <TouchableOpacity onPress={handleTap} activeOpacity={2}>
            <Image
              source={{ uri: photo.urls.full }}
              style={[styles.photoImage, { aspectRatio }]}
              resizeMode='contain'
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
            />
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={handleDoubleTap} style={{ width: 45 }}>
              <FontAwesome
                name={isLikedPhoto ? 'heart' : 'heart-o'}
                size={30}
                color={isLikedPhoto ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>
              {formatLikesCount(photo.likes)}
            </Text>
          </View>
        </View>

        <UserInfo navigation={navigation} photo={photo} />
      </ScrollView>

      {/* {isLoadingImage && <Loader />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
    height: '100%',
  },
  photoCard: {
    marginBottom: 20,
  },
  photoImage: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 5,
  },
  loaderContainer: {},
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  scrollContent: {},
});
