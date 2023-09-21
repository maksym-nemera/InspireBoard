import { FC, useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface ModalIsNotReadyProps {
  modalText: string;
}

export const ModalIsNotReady: FC<ModalIsNotReadyProps> = ({ modalText }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOnClose = () => {
    setIsVisible(false);
  };

  return (
    <Modal transparent={true} animationType='slide' visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalText}</Text>

          <TouchableOpacity onPress={handleOnClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
