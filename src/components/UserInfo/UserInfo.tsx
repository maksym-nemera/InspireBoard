import { FC, memo } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Photo, User } from '../../types/Photo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { LocationIcon } from '../LocationIcon';
import { IconRowInfoUser } from '../IconRowInfoUser/IconRowInfoUser';
import { PhotoDescription } from '../PhotoDescription';

interface UserInfoProps {
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
  photo: Photo;
}

export const UserInfo: FC<UserInfoProps> = memo(({ navigation, photo }) => {
  const handleUserImagePress = (user: User) => {
    navigation.navigate('Profile', { user });
  };

  return (
    <View style={styles.userInfo}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity
          onPress={() => handleUserImagePress(photo.user)}
          style={styles.userInfoContainerImage}
        >
          <Image
            source={{ uri: photo.user.profile_image.large }}
            style={styles.userInfoImage}
          />
        </TouchableOpacity>

        <View style={styles.userInfoContainerIcons}>
          <Text style={styles.userInfoUsername}>{photo.user.username}</Text>

          <IconRowInfoUser photo={photo} />
        </View>
      </View>

      <LocationIcon userLocation={photo.user.location} />

      {photo.description && (
        <PhotoDescription description={photo.description} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  userInfo: {
    marginHorizontal: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoContainerImage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  userInfoImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  userInfoContainerIcons: {
    marginLeft: 10,
    flex: 1,
  },
  userInfoUsername: {
    fontSize: 20,
  },
});
