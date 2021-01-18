import React, { useContext } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Vibration,
} from 'react-native';
import {
  Button,
  Caption,
  Dialog,
  Portal,
  Subheading,
  Surface,
  TouchableRipple,
} from 'react-native-paper';
import {
  Context as DataContext,
  DataContextModel,
} from '../../context/DataContext';

const width = Dimensions.get('window').width;

const ITEM_HEIGHT = 150;
const ITEM_PADDING = 8;
const ITEM_WIDTH = (width / 100) * 25;
const ITEM2_WIDTH = (width / 100) * 75 - ITEM_PADDING * 2;
const IMAGE_HEIGHT = ITEM_HEIGHT - ITEM_PADDING * 2;
const LINE_HEIGHT = 14;
const DESC_HEIGHT = LINE_HEIGHT * 5;

const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);
function ListBook({ navigation }: any) {
  const { state, getBooks, deleteBook } = useContext<DataContextModel>(
    DataContext
  );
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState('');

  const hideDialog = () => setVisible(false);
  const showDialog = (id: string) => {
    Vibration.vibrate(1);
    setId(id);
    setVisible(true);
  };

  React.useEffect(() => {
    getBooks();
  }, []);

  if (!state.books) return <Text>Loading...</Text>;
  return (
    <View style={{ top: STATUSBAR_HEIGHT }}>
      <FlatList
        data={state.books}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <TouchableRipple
              borderless
              onLongPress={() => showDialog(item._id)}
              onPress={() =>
                navigation.navigate('BookDetails', { id: item._id })
              }
            >
              <Surface style={styles.surface}>
                <Image source={{ uri: item.coverUrl }} style={styles.image} />
                <View style={styles.info}>
                  <Subheading style={styles.title}>{item.title}</Subheading>
                  <Caption style={styles.author}>By {item.author}</Caption>
                  <Caption
                    numberOfLines={5}
                    style={{ lineHeight: LINE_HEIGHT }}
                  >
                    {item.description}
                  </Caption>
                </View>
              </Surface>
            </TouchableRipple>
          );
        }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>Are you sure you want to delete this book?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.button} onPress={hideDialog}>
              Cancel
            </Button>
            <Button
              style={styles.button}
              mode={'contained'}
              onPress={() => {
                deleteBook({ id }), hideDialog();
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: ITEM_PADDING,
    height: ITEM_HEIGHT,
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 4,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    marginBottom: 0,
  },
  author: { fontStyle: 'italic' },
  image: {
    height: IMAGE_HEIGHT,
    width: ITEM_WIDTH,
    resizeMode: 'center',
    borderRadius: 10,
  },
  info: { height: IMAGE_HEIGHT, width: ITEM2_WIDTH, overflow: 'hidden' },
  button: {
    borderRadius: 3,
    marginLeft: 10,
  },
});

export { ListBook };
