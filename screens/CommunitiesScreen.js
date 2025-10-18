import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

const CommunitiesScreen = ({ navigation }) => {
  const [communities, setCommunities] = useState([
    {
      id: '1',
      name: 'AI в машиностроении',
      description: 'Исследуем применение искусственного интеллекта в промышленности',
      logo: 'https://via.placeholder.com/100x100?text=AI',
      directions: ['AI', 'Машиностроение', 'Промышленность'],
      members: 150,
      projects: 12
    },
    {
      id: '2',
      name: 'Роботизированная сварка',
      description: 'Передовые технологии автоматизированной сварки',
      logo: 'https://via.placeholder.com/100x100?text=Роботы',
      directions: ['Робототехника', 'Сварка', 'Автоматизация'],
      members: 89,
      projects: 8
    },
    {
      id: '3',
      name: 'Цифровые двойники',
      description: 'Создание виртуальных копий реальных объектов',
      logo: 'https://via.placeholder.com/100x100?text=Цифра',
      directions: ['Цифровизация', 'Моделирование', 'IoT'],
      members: 203,
      projects: 15
    },
    {
      id: '4',
      name: 'Генная инженерия',
      description: 'Современные биотехнологии для промышленности',
      logo: 'https://via.placeholder.com/100x100?text=ДНК',
      directions: ['Биотех', 'Генетика', 'Фармацевтика'],
      members: 76,
      projects: 6
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.directions.some(dir => 
      dir.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderCommunityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.communityItem}
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}
    >
      <Image source={{ uri: item.logo }} style={styles.communityLogo} />
      <View style={styles.communityInfo}>
        <Text style={styles.communityName}>{item.name}</Text>
        <Text style={styles.communityDescription}>{item.description}</Text>
        <View style={styles.directionsContainer}>
          {item.directions.map((direction, index) => (
            <Text key={index} style={styles.directionTag}>#{direction}</Text>
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>{item.members} участников</Text>
          <Text style={styles.stat}>•</Text>
          <Text style={styles.stat}>{item.projects} проектов</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск сообществ по названию или тегам..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredCommunities}
        renderItem={renderCommunityItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Сообщества не найдены</Text>
        }
      />
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => alert('Функция создания сообщества в разработке')}
      >
        <Text style={styles.createButtonText}>+ Создать сообщество</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16
  },
  communityItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  communityLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12
  },
  communityInfo: {
    flex: 1
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1f2937'
  },
  communityDescription: {
    color: '#666',
    marginBottom: 8,
    fontSize: 14
  },
  directionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  directionTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
    color: '#0369a1'
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stat: {
    color: '#888',
    fontSize: 12,
    marginRight: 8
  },
  createButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16
  }
});

export default CommunitiesScreen;