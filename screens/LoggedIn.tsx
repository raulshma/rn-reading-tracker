import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Caption,
  Paragraph,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import featherClient from '../services/client';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const STATUSBAR_HEIGHT = Number(StatusBar.currentHeight);

export default function LoggedIn({ jwt }: any) {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    featherClient
      ?.service('books')
      .find({
        query: {
          $limit: 10,
        },
      })
      .then((e: any) => {
        setData(e);
      });
  }, []);
  if (!data) return <Text>Loading...</Text>;
  return (
    <View style={{ top: STATUSBAR_HEIGHT }}>
      <FlatList
        style={{
          height: height - STATUSBAR_HEIGHT,
        }}
        data={data.data}
        pagingEnabled
        horizontal
        keyExtractor={(item) => item._id}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <>
              <View
                removeClippedSubviews={false}
                style={{
                  position: 'absolute',
                  width,
                  height,
                  overflow: 'hidden',
                  zIndex: 0,
                }}
              >
                <Image
                  source={{ uri: item.coverUrl }}
                  style={{
                    width,
                    height,
                    position: 'absolute',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View
                style={{
                  width,
                  height: height - STATUSBAR_HEIGHT,
                  zIndex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <View
                  style={{
                    width: width - 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    elevation: 3,
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 28,
                      fontWeight: '800',
                    }}
                  >
                    {item.title}
                  </Text>
                  <Caption
                    style={{
                      color: 'white',
                    }}
                  >
                    by {item.author}
                  </Caption>
                  <Paragraph
                    style={{
                      color: 'white',
                    }}
                  >
                    {item.description}
                  </Paragraph>
                </View>
              </View>
            </>
          );
        }}
      />
      <Button
        onPress={() => {
          featherClient.logout();
          jwt('');
        }}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
