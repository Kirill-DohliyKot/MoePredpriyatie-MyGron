import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image
} from 'react-native';

const ProfileScreen = () => {
  const user = {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    avatar: 'https://via.placeholder.com/100x100?text=IP',
    skills: ['React Native', 'Python', 'Machine Learning', 'AI', 'Анализ данных'],
    completedProjects: 8,
    rating: 420,
    level: 5,
    badges: [
      { id: '1', name: 'Проектный герой', icon: '🏆' },
      { id: '2', name: 'Активный участник', icon: '⚡' },
      { id: '3', name: 'Эксперт AI', icon: '🤖' },
      { id: '4', name: 'Лидер сообщества', icon: '👑' }
    ],
    currentProjects: [
      { id: '1', name: 'Оптимизация сборочной линии', progress: 65 },
      { id: '2', name: 'Система контроля качества', progress: 30 }
    ]
  };

  const nextLevelPoints = 500;
  const progress = (user.rating / nextLevelPoints) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Заголовок профиля */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Уровень {user.level}</Text>
          </View>
        </View>
      </View>

      {/* Прогресс бар */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Прогресс до уровня {user.level + 1}</Text>
          <Text style={styles.progressText}>{user.rating}/{nextLevelPoints} очков</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Статистика */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.completedProjects}</Text>
          <Text style={styles.statLabel}>Проектов</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.rating}</Text>
          <Text style={styles.statLabel}>Очков рейтинга</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.skills.length}</Text>
          <Text style={styles.statLabel}>Навыков</Text>
        </View>
      </View>

      {/* Бейджи */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Мои бейджи</Text>
        <FlatList
          horizontal
          data={user.badges}
          renderItem={({ item }) => (
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>{item.icon}</Text>
              <Text style={styles.badgeName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Навыки */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Мои навыки</Text>
        <View style={styles.skillsContainer}>
          {user.skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Текущие проекты */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Текущие проекты</Text>
        {user.currentProjects.map(project => (
          <View key={project.id} style={styles.projectItem}>
            <Text style={styles.projectName}>{project.name}</Text>
            <View style={styles.projectProgress}>
              <View style={[styles.projectProgressFill, { width: `${project.progress}%` }]} />
            </View>
            <Text style={styles.projectProgressText}>{project.progress}%</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16
  },
  profileInfo: {
    flex: 1
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8
  },
  levelContainer: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start'
  },
  levelText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 14
  },
  progressSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 1
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151'
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280'
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 1
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280'
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  badge: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    minWidth: 80
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center'
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skillTag: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  skillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  projectItem: {
    marginBottom: 16
  },
  projectName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  projectProgress: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden'
  },
  projectProgressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3
  },
  projectProgressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right'
  }
});

export default ProfileScreen;