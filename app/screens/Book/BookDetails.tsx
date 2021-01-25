import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, Title, TextInput } from 'react-native-paper';
import {
  Book,
  Context as DataContext,
  DataContextModel,
} from '../../context/DataContext';

const height = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);

function BookDetails({ navigation, route }: any) {
  const { state, patchPages, patchLineHint } = useContext<DataContextModel>(
    DataContext
  );
  const [pagesRead, setPagesRead] = useState('');
  const [lineHint, setLineHint] = useState('');
  const [book, setBook] = useState<Book>();

  const updatePages = () => {
    patchPages({ id: book?._id, bookmark: pagesRead });
  };

  const updateLineHint = () => {
    patchLineHint({ id: book?._id, lineHint });
  };

  React.useEffect(() => {
    if (route.params) {
      const book = state.books.find((e) => e._id === route.params.id);
      setBook(book);
      setPagesRead(book?.bookmark ? book.bookmark.toString() : '');
      setLineHint(book?.lineHint ?? '');
    }
  }, [route]);
  if (!book) return <Text>Loading...</Text>;
  return (
    <ScrollView
      scrollEnabled
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: book.coverUrl }}
          style={{
            width: '100%',
            height: 80,
            resizeMode: 'cover',
          }}
        />
      </View>
      <Title>{book.title}</Title>
      <Caption style={styles.textAuthor}>By {book.author}</Caption>
      <View style={{ width: '100%', marginTop: 10 }}>
        <Text>Total Pages: {book.pages}</Text>
        <TextInput
          style={{ width: '100%', marginTop: 10 }}
          mode="flat"
          label="Pages read"
          value={book.bookmark ? book.bookmark.toString() : pagesRead}
          onChangeText={(read: string) => setPagesRead(read)}
          onEndEditing={updatePages}
        />
        <TextInput
          multiline
          numberOfLines={5}
          style={{ width: '100%', marginTop: 10 }}
          mode="flat"
          label="Line hint"
          value={book.lineHint ? book.lineHint.toString() : lineHint}
          onChangeText={(hint: string) => setLineHint(hint)}
          onEndEditing={updateLineHint}
        />
        <Text style={{ marginVertical: 10 }}>
          Price: {book.purchasedPrice ?? '--cannot find price--'}
        </Text>
      </View>
      <Text style={styles.textDescription}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'rgb(255,255,253)',
  },
  contentContainer: {
    alignItems: 'center',
    height: height - STATUSBAR_HEIGHT + 100,
  },
  textDescription: {
    textAlign: 'justify',
    color: 'rgba(0,0,0,0.77)',
  },
  textAuthor: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

export { BookDetails };
