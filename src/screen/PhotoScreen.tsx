import { FC } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type PhotoScreenProps = {
  route: RouteProp<RootStackParamList, 'Photo'>;
  navigation: StackNavigationProp<RootStackParamList, 'Photo'>;
};

export const PhotoScreen: FC<PhotoScreenProps> = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  navigation,
}) => {
  const { item } = route.params;

  return (
    <View style={[styles.container]}>
      <Image
        source={{ uri: item.urls.full }}
        style={[styles.image]}
        resizeMode='contain'
      />
    </View>
  );
};

const imageWidth = Dimensions.get('window').width;
// eslint-disable-next-line no-magic-numbers
const imageHeight = Dimensions.get('window').height - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    marginBottom: 10,
    borderRadius: 10,
  },
});
