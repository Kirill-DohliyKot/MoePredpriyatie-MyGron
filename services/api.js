const API_BASE_URL = 'https://your-api-domain.com/api';

// Моковые данные для демонстрации
const mockCommunities = [
  {
    id: '1',
    name: 'AI в машиностроении',
    description: 'Исследуем применение искусственного интеллекта в промышленности',
    logo: 'https://via.placeholder.com/100x100?text=AI',
    directions: ['AI', 'Машиностроение', 'Промышленность'],
    members: 150,
    projects: 12
  }
];

export const apiService = {
  // Сообщества
  async getCommunities() {
    // В реальном приложении здесь будет fetch запрос
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCommunities), 500);
    });
  },

  async createCommunity(communityData) {
    const response = await fetch(`${API_BASE_URL}/communities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(communityData)
    });
    return await response.json();
  },

  // Проекты
  async getProjects(communityId = null) {
    const url = communityId 
      ? `${API_BASE_URL}/projects?communityId=${communityId}`
      : `${API_BASE_URL}/projects`;
    const response = await fetch(url);
    return await response.json();
  },

  async joinProject(projectId, userId) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  },

  // Пользователи
  async getUserProfile(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return await response.json();
  },

  async updateUserSkills(userId, skills) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills })
    });
    return await response.json();
  },

  // Аутентификация
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    return await response.json();
  }
};