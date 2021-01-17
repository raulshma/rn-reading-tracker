import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, Title } from 'react-native-paper';
import {
  Book,
  Context as DataContext,
  DataContextModel,
} from '../context/DataContext';

export default function BookDetails({ navigation, route }: any) {
  const { state } = useContext<DataContextModel>(DataContext);
  const [book, setBook] = useState<Book>();

  React.useEffect(() => {
    if (route.params) {
      setBook(state.books.find((e) => e._id === route.params.id));
    }
  }, [route]);
  if (!book) return <Text>Loading...</Text>;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Title>{book.title}</Title>
      <Caption style={styles.textAuthor}>By {book.author}</Caption>
      <Text style={styles.textDescription}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: 'rgb(255,255,253)' },
  contentContainer: { alignItems: 'center' },
  textDescription: {
    textAlign: 'justify',
    color: 'rgba(0,0,0,0.77)',
  },
  textAuthor: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
