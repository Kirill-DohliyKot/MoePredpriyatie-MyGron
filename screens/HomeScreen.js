import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [feed, setFeed] = useState([]);
  const [featuredCommunities, setFeaturedCommunities] = useState([]);

  useEffect(() => {
    loadFeedData();
    loadFeaturedCommunities();
  }, []);

  const loadFeedData = () => {
    const mockFeed = [
      {
        id: '1',
        type: 'event',
        title: 'Хакатон по AI в машиностроении',
        community: 'Роботех',
        date: '2024-12-15',
        image: 'https://via.placeholder.com/300x150?text=Хакатон+AI'
      },
      {
        id: '2',
        type: 'project',
        title: 'Новый кейс: Оптимизация сборочной линии',
        community: 'Автопром',
        deadline: '2024-12-20',
        image: 'https://via.placeholder.com/300x150?text=Новый+Кейс'
      },
      {
        id: '3',
        type: 'article',
        title: 'Тенденции цифровых двойников в промышленности',
        community: 'Цифровые решения',
        image: 'https://via.placeholder.com/300x150?text=Статья'
      }
    ];
    setFeed(mockFeed);
  };

  const loadFeaturedCommunities = () => {
    const communities = [
      {
        id: '1',
        name: 'AI в машиностроении',
        members: 150,
        image: 'https://via.placeholder.com/100x100?text=AI'
      },
      {
        id: '2',
        name: 'Роботизированная сварка',
        members: 89,
        image: 'https://via.placeholder.com/100x100?text=Роботы'
      },
      {
        id: '3',
        name: 'Цифровые двойники',
        members: 203,
        image: 'https://via.placeholder.com/100x100?text=Цифровизация'
      }
    ];
    setFeaturedCommunities(communities);
  };

  const renderFeedItem = ({ item }) => (
    <TouchableOpacity style={styles.feedItem}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.feedImage} />
      )}
      <View style={styles.feedContent}>
        <View style={styles.feedHeader}>
          <Text style={styles.communityName}>{item.community}</Text>
          <Text style={styles.feedDate}>{item.date || item.deadline}</Text>
        </View>
        <Text style={styles.feedTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCommunityItem = ({ item }) => (
    <TouchableOpacity style={styles.communityCard}>
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      <Text style={styles.communityCardName}>{item.name}</Text>
      <Text style={styles.communityCardMembers}>{item.members} участников</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <Text style={styles.subtitle}>Лента активностей</Text>
      
      <FlatList
        data={feed}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Популярные сообщества</Text>
      <FlatList
        horizontal
        data={featuredCommunities}
        renderItem={renderCommunityItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#374151'
  },
  feedItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  feedImage: {
    width: '100%',
    height: 150
  },
  feedContent: {
    padding: 16
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  communityName: {
    fontWeight: '600',
    color: '#2563eb'
  },
  feedDate: {
    color: '#666',
    fontSize: 12
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937'
  },
  horizontalList: {
    marginBottom: 16
  },
  communityCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8
  },
  communityCardName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4
  },
  communityCardMembers: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
});

export default HomeScreen;