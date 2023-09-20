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
    <View style={{ marginBottom: 5 }}>
      <TouchableOpacity onPress={handleTap} activeOpacity={2}>
        <Image
          source={{ uri: photo.urls.full }}
          style={[
            { alignSelf: 'center', width: '100%', marginBottom: 5 },
            {
              aspectRatio,
              backgroundColor: photo.color,
            },
          ]}
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

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={handleDoubleTap} style={{ width: 45 }}>
            <FontAwesome
              name={isLikedPhoto ? 'heart' : 'heart-o'}
              size={30}
              color={isLikedPhoto ? 'red' : 'black'}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 20 }}>{formatLikesCount(photo.likes)}</Text>
        </View>

        <Text>{formattedDate}</Text>
      </View>
    </View>
  );
};
