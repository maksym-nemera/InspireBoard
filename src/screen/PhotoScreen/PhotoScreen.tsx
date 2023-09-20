import { FC } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserInfo } from '../../components/UserInfo';
import { Ionicons } from '@expo/vector-icons';
import { getInvertedColor } from '../../utils/utils';
import { FullPicture } from '../../components/FullPicture';

interface PhotoScreenProps {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
}

export const PhotoScreen: FC<PhotoScreenProps> = ({ route, navigation }) => {
  const { photo } = route.params;

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

      <ScrollView>
        <FullPicture photo={photo} />

        <UserInfo navigation={navigation} photo={photo} />
      </ScrollView>
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
