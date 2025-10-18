import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

const CommunityDetailScreen = ({ route, navigation }) => {
  const { community } = route.params;
  const [isMember, setIsMember] = useState(false);

  const projects = [
    {
      id: '1',
      title: 'Оптимизация производственной линии',
      description: 'Разработка алгоритмов для повышения эффективности',
      participants: 5,
      deadline: '2024-12-20'
    },
    {
      id: '2',
      title: 'Внедрение систем компьютерного зрения',
      description: 'Создание системы контроля качества продукции',
      participants: 3,
      deadline: '2024-12-15'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Вебинар: AI в промышленности',
      date: '2024-12-10',
      time: '19:00',
      speaker: 'Дмитрий Иванов'
    },
    {
      id: '2',
      title: 'Хакатон по машинному обучению',
      date: '2024-12-18',
      time: '10:00',
      speaker: 'TechCorp'
    }
  ];

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <View style={styles.projectFooter}>
        <Text style={styles.projectParticipants}>{item.participants} участников</Text>
        <Text style={styles.projectDeadline}>До {item.deadline}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <View style={styles.eventDate}>
        <Text style={styles.eventDay}>{new Date(item.date).getDate()}</Text>
        <Text style={styles.eventMonth}>
          {new Date(item.date).toLocaleString('ru', { month: 'short' })}
        </Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventTime}>{item.time} • {item.speaker}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Шапка сообщества */}
      <View style={styles.header}>
        <Image source={{ uri: community.logo }} style={styles.communityLogo} />
        <Text style={styles.communityName}>{community.name}</Text>
        <Text style={styles.communityDescription}>{community.description}</Text>
        
        <View style={styles.directionsContainer}>
          {community.directions.map((direction, index) => (
            <Text key={index} style={styles.directionTag}>#{direction}</Text>
          ))}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{community.members}</Text>
            <Text style={styles.statLabel}>Участников</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{community.projects}</Text>
            <Text style={styles.statLabel}>Проектов</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Мероприятий</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.joinButton, isMember && styles.leaveButton]}
          onPress={() => setIsMember(!isMember)}
        >
          <Text style={[styles.joinButtonText, isMember && styles.leaveButtonText]}>
            {isMember ? 'Вы участник' : 'Присоединиться'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Проекты сообщества */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Активные проекты</Text>
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Все проекты →</Text>
        </TouchableOpacity>
      </View>

      {/* Мероприятия */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ближайшие мероприятия</Text>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Все мероприятия →</Text>
        </TouchableOpacity>
      </View>

      {/* Материалы */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Образовательные материалы</Text>
        <TouchableOpacity style={styles.materialItem}>
          <Text style={styles.materialTitle}>Введение в промышленный AI</Text>
          <Text style={styles.materialType}>📚 Статья</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.materialItem}>
          <Text style={styles.materialTitle}>Машинное обучение на производстве</Text>
          <Text style={styles.materialType}>🎥 Видео</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  communityLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16
  },
  communityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1f2937'
  },
  communityDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
    lineHeight: 22
  },
  directionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20
  },
  directionTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    fontSize: 14,
    color: '#0369a1',
    fontWeight: '500'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20
  },
  stat: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  joinButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  leaveButton: {
    backgroundColor: '#f3f4f6'
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  leaveButtonText: {
    color: '#374151'
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937'
  },
  projectItem: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#374151'
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  projectParticipants: {
    fontSize: 12,
    color: '#6b7280'
  },
  projectDeadline: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '500'
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  eventDate: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    padding: 8,
    borderRadius: 6,
    minWidth: 50,
    marginRight: 12
  },
  eventDay: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  eventMonth: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  eventInfo: {
    flex: 1
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#374151'
  },
  eventTime: {
    fontSize: 14,
    color: '#666'
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  materialTitle: {
    fontSize: 16,
    color: '#374151',
    flex: 1
  },
  materialType: {
    fontSize: 14,
    color: '#666'
  },
  seeAllButton: {
    alignItems: 'center',
    padding: 8
  },
  seeAllText: {
    color: '#2563eb',
    fontWeight: '600'
  }
});

export default CommunityDetailScreen;