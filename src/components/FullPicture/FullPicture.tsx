import { FC, memo, useMemo, useState } from 'react';
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

export const FullPicture: FC<FullPictureProps> = memo(({ photo }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const aspectRatio = useMemo(() => {
    return photo.width / photo.height;
  }, [photo.width, photo.height]);

  const imageSource = useMemo(
    () => ({ uri: photo.urls.regular }),
    [photo.urls.regular],
  );

  const formattedDate = format(new Date(photo.created_at), 'dd MMM yy');

  const handleDoubleTap = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setIsLikedPhoto(!isLikedPhoto);
    }

    setLastTap(now);
  };

  const handleTap = () => {
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
      <TouchableOpacity onPress={handleDoubleTap} activeOpacity={2}>
        <Image
          source={imageSource}
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
            onPress={handleTap}
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
});

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
