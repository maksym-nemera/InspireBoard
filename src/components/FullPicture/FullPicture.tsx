import { FC, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatLikesCount, getInvertedColor } from '../../utils/utils';
import { format } from 'date-fns';
import { Photo } from '../../types/Photo';

interface FullPictureProps {
  photo: Photo;
}

export const FullPicture: FC<FullPictureProps> = ({ photo }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const aspectRatio = photo.width / photo.height;
  const formattedDate = format(new Date(photo.created_at), 'dd MMM yy');

  const handleTap = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setIsLikedPhoto(!isLikedPhoto);
    }

    setLastTap(now);
  };

  const handleDoubleTap = () => {
    setIsLikedPhoto(!isLikedPhoto);
  };

  const handleLoadStart = () => {
    setIsLoadingImage(true);
  };

  const handleLoadEnd = () => {
    setIsLoadingImage(false);
  };

  return (
    <View style={styles.fullPicture}>
      <TouchableOpacity onPress={handleTap} activeOpacity={2}>
        <Image
          source={{ uri: `${photo.urls.raw}&auto=format` }}
          style={[
            styles.fullPicturePhoto,
            {
              aspectRatio,
              backgroundColor: photo.color,
            },
          ]}
          alt={photo.alt_description}
          resizeMode='contain'
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
        />

        {isLoadingImage && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size='large'
              color={getInvertedColor(photo.color)}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.fullPictureAction}>
        <View style={styles.fullPictureActionContainer}>
          <TouchableOpacity
            onPress={handleDoubleTap}
            style={styles.fullPictureActionLike}
          >
            <FontAwesome
              name={isLikedPhoto ? 'heart' : 'heart-o'}
              size={30}
              color={isLikedPhoto ? 'red' : 'black'}
            />
          </TouchableOpacity>

          <Text style={styles.fullPictureActionCount}>
            {formatLikesCount(photo.likes)}
          </Text>
        </View>

        <Text style={styles.fullPictureActionCount}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPicture: {
    marginBottom: 5,
  },
  fullPicturePhoto: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 5,
  },
  fullPictureAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  fullPictureActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullPictureActionLike: {
    width: 45,
  },
  fullPictureActionCount: {
    fontSize: 15,
  },
});
