/* eslint-disable indent */
/* eslint-disable no-magic-numbers */
import { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PhotoDescriptionProps {
  description: string;
}

export const PhotoDescription: FC<PhotoDescriptionProps> = ({
  description,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  return (
    <View style={styles.userInfoDescription}>
      <Text numberOfLines={isDescriptionExpanded ? 0 : 3}>{description}</Text>

      {!isDescriptionExpanded &&
        // eslint-disable-next-line no-magic-numbers
        description.length > 100 && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoDescription: {
    marginBottom: 10,
  },
  seeAllButton: {
    color: 'blue',
    marginTop: 5,
  },
});
