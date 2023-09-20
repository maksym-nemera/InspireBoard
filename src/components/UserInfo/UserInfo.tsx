import { FC } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Photo, User } from '../../types/Photo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

interface UserInfoProps {
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
  photo: Photo;
}

export const UserInfo: FC<UserInfoProps> = ({ navigation, photo }) => {
  const handleUserImagePress = (user: User) => {
    navigation.navigate('Profile', { user });
  };

  return (
    <TouchableOpacity
      onPress={() => handleUserImagePress(photo.user)}
      style={styles.userContainer}
    >
      <Image
        source={{ uri: photo.user.profile_image.medium }}
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{photo.user.username}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name='account-heart'
              size={24}
              color='black'
            />

            <Text>{photo.user.total_likes}</Text>
          </View>

          <View style={styles.infoItem}>
            <Entypo name='image' size={24} color='black' />

            <Text>{photo.user.total_photos}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialIcons name='collections' size={24} color='black' />

            <Text>{photo.user.total_collections}</Text>
          </View>

          {photo.user.location && (
            <View style={styles.infoItem}>
              <MaterialIcons name='location-on' size={24} color='black' />

              <Text>{photo.user.location}</Text>
            </View>
          )}

          {!photo.user.location && (
            <View style={styles.infoItem}>
              <MaterialIcons
                name='not-listed-location'
                size={24}
                color='black'
              />

              <Text>Not Found</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  userName: {
    fontSize: 20,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});
