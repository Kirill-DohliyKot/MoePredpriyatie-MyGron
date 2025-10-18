export const GamificationService = {
  calculateLevel(points) {
    return Math.floor(points / 100) + 1;
  },

  getLevelProgress(points) {
    const currentLevel = this.calculateLevel(points);
    const pointsForCurrentLevel = (currentLevel - 1) * 100;
    const pointsForNextLevel = currentLevel * 100;
    const progress = ((points - pointsForCurrentLevel) / 100) * 100;
    
    return {
      currentLevel,
      pointsForCurrentLevel,
      pointsForNextLevel,
      progress: Math.min(progress, 100)
    };
  },

  getBadges(user) {
    const badges = [];
    
    if (user.completedProjects.length >= 5) {
      badges.push({ id: 'project_hero', name: 'Проектный герой', icon: '🏆' });
    }
    if (user.completedProjects.length >= 10) {
      badges.push({ id: 'case_master', name: 'Мастер кейсов', icon: '💼' });
    }
    if (user.rating >= 500) {
      badges.push({ id: 'top_performer', name: 'Топ исполнитель', icon: '⭐' });
    }
    if (user.joinedCommunities.length >= 3) {
      badges.push({ id: 'community_lover', name: 'Любитель сообществ', icon: '👥' });
    }
    if (user.skills.length >= 8) {
      badges.push({ id: 'skill_master', name: 'Мастер навыков', icon: '🔧' });
    }

    return badges;
  },

  addPoints(user, activity) {
    const pointsMap = {
      'project_completed': 50,
      'event_attended': 20,
      'content_published': 10,
      'community_joined': 15,
      'project_joined': 10,
      'skill_added': 5
    };
    
    return pointsMap[activity] || 0;
  },

  getRankingTitle(level) {
    const titles = {
      1: 'Новичок',
      2: 'Ученик',
      3: 'Специалист',
      4: 'Эксперт',
      5: 'Мастер',
      6: 'Гуру',
      7: 'Легенда'
    };
    
    return titles[level] || titles[7];
  }
};