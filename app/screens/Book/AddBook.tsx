import React, { useContext } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Vibration,
  Pressable,
} from 'react-native';
import { Button, Dialog, Portal, Searchbar } from 'react-native-paper';
import { SplashFlow } from '../../components/Splash';
import {
  DataContextModel,
  Context as DataContext,
  Book,
} from '../../context/DataContext';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { BookSearchItem } from '../../common';
import { BookDetails } from './BookDetails';

const height = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);

const MySearchBar = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const submit = () => props.search({ query: searchQuery });

  return (
    <Searchbar
      style={styles.search}
      onIconPress={submit}
      onSubmitEditing={submit}
      placeholder="Search"
      onChangeText={(text: string) => setSearchQuery(text)}
      value={searchQuery}
    />
  );
};

const AddBook = () => {
  const { state, searchQuery, addBook } = useContext<DataContextModel>(
    DataContext
  );
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookSearchItem>();

  const hideDialog = () => setVisible(false);
  const showDialog = (book: BookSearchItem) => {
    Vibration.vibrate(1);
    setSelectedBook(book);
    setVisible(true);
  };

  const addBookToLibrary = () => {
    if (selectedBook?.volumeInfo) {
      const { volumeInfo: b } = selectedBook;
      const { saleInfo } = selectedBook;
      addBook({
        book: {
          title: b.title,
          description: b.description,
          author: b.authors.join(', '),
          coverUrl: b.imageLinks.thumbnail,
          pages: b.pageCount ?? 0,
          purchasedPrice: saleInfo.retailPrice?.amount,
        },
        hideDialog,
      });
    }
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <MySearchBar search={searchQuery} />
        {state.loading && <SplashFlow />}
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={state?.searchData?.items}
          keyExtractor={(item: any) => item.id}
          renderItem={({
            item,
            index,
          }: {
            item: BookSearchItem;
            index: number;
          }) => {
            const rating = item?.volumeInfo?.averageRating;
            const ratingCount = item?.volumeInfo?.ratingsCount;
            let ratingText;
            if (rating && ratingCount) {
              ratingText = `${rating}/5 (${ratingCount})`;
            }
            const inputRange = [-1, 0, 120 * index, 120 * (index + 2)];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0.7],
            });
            return (
              <Animated.View
                style={{
                  ...styles.itemContainer,
                  transform: [{ scale }],
                }}
              >
                <Grid>
                  <Row>
                    <Col size={75}>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.volumeInfo.title} ({item.volumeInfo.language})
                      </Text>
                      {item?.volumeInfo?.description && (
                        <Text numberOfLines={3} style={styles.description}>
                          {item.volumeInfo.description}
                        </Text>
                      )}
                      {item.volumeInfo?.authors && (
                        <Text numberOfLines={1} style={styles.authors}>
                          - By {item.volumeInfo?.authors?.join(', ')}
                        </Text>
                      )}
                      <Row>
                        <Col>
                          <Text style={styles.bottomText}>
                            {item?.volumeInfo?.pageCount &&
                              `Pages ${item.volumeInfo.pageCount}`}
                          </Text>
                        </Col>
                        <Col style={styles.ratingCol}>
                          <Text style={styles.bottomText}>
                            {ratingText ?? null}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col size={25}>
                      <Pressable onLongPress={() => showDialog(item)}>
                        {item?.volumeInfo?.imageLinks?.thumbnail && (
                          <Image
                            source={{
                              uri: item.volumeInfo.imageLinks.thumbnail,
                            }}
                            style={styles.image}
                          />
                        )}
                      </Pressable>
                    </Col>
                  </Row>
                </Grid>
              </Animated.View>
            );
          }}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>Are you sure you want to add this book to your library?</Text>
            <Text>{state.error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.button} onPress={hideDialog}>
              Cancel
            </Button>
            <Button
              style={styles.button}
              mode={'contained'}
              onPress={() => {
                addBookToLibrary();
              }}
            >
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export { AddBook };

const styles = StyleSheet.create({
  search: { borderRadius: 10, margin: 6 },
  searchContainer: {
    top: STATUSBAR_HEIGHT,
    height: height - STATUSBAR_HEIGHT - 30,
  },
  itemContainer: {
    width: Dimensions.get('window').width - 20,
    height: 110,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    elevation: 3,
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  image: {
    width: '85%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    lineHeight: 11,
    marginBottom: 3,
    textAlign: 'justify',
    color: 'gray',
  },
  authors: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    color: '#59656f',
  },
  title: { fontSize: 13, marginBottom: 6 },
  ratingCol: {
    alignItems: 'flex-end',
  },
  bottomText: {
    color: 'gray',
    marginTop: 2,
    fontSize: 10,
  },
  button: {
    borderRadius: 3,
    marginLeft: 10,
  },
});
