import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

const ProjectsScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Оптимизация сборочной линии',
      description: 'Разработка алгоритма для оптимизации производственной линии',
      community: 'AI в машиностроении',
      requiredSkills: ['Python', 'Machine Learning', 'Анализ данных'],
      difficulty: 'advanced',
      deadline: '2024-12-20',
      participants: 5,
      reward: '50000 ₽'
    },
    {
      id: '2',
      title: 'Система контроля качества сварки',
      description: 'Создание системы компьютерного зрения для контроля качества сварных швов',
      community: 'Роботизированная сварка',
      requiredSkills: ['Computer Vision', 'Python', 'OpenCV'],
      difficulty: 'intermediate',
      deadline: '2024-12-15',
      participants: 3,
      reward: '30000 ₽'
    },
    {
      id: '3',
      title: 'Цифровой двойник производственного цеха',
      description: 'Разработка виртуальной модели производственного процесса',
      community: 'Цифровые двойники',
      requiredSkills: ['3D моделирование', 'Unity', 'C#'],
      difficulty: 'advanced',
      deadline: '2024-12-25',
      participants: 8,
      reward: '75000 ₽'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.requiredSkills.some(skill => 
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).filter(project => 
    filter === 'all' || project.difficulty === filter
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return difficulty;
    }
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{getDifficultyText(item.difficulty)}</Text>
        </View>
      </View>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <Text style={styles.projectCommunity}>Сообщество: {item.community}</Text>
      
      <View style={styles.skillsContainer}>
        {item.requiredSkills.map((skill, index) => (
          <Text key={index} style={styles.skillTag}>#{skill}</Text>
        ))}
      </View>
      
      <View style={styles.projectFooter}>
        <View style={styles.footerInfo}>
          <Text style={styles.deadline}>До {item.deadline}</Text>
          <Text style={styles.participants}>{item.participants} участников</Text>
        </View>
        <Text style={styles.reward}>{item.reward}</Text>
      </View>
      
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Присоединиться к проекту</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск проектов по названию, навыкам..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Сложность:</Text>
        <View style={styles.filterButtons}>
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterButton,
                filter === level && styles.filterButtonActive
              ]}
              onPress={() => setFilter(level)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === level && styles.filterButtonTextActive
              ]}>
                {level === 'all' ? 'Все' : getDifficultyText(level)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredProjects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Проекты не найдены</Text>
        }
      />
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
  filterContainer: {
    marginBottom: 16
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151'
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d1d5db'
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb'
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151'
  },
  filterButtonTextActive: {
    color: 'white'
  },
  projectItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    color: '#1f2937'
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  projectDescription: {
    color: '#666',
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20
  },
  projectCommunity: {
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 14
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  skillTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
    color: '#374151'
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  deadline: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12
  },
  participants: {
    color: '#6b7280',
    fontSize: 12
  },
  reward: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981'
  },
  joinButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16
  }
});

export default ProjectsScreen;