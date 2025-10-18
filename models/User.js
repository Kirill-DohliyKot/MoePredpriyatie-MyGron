export class User {
  constructor(id, name, email, skills = [], completedProjects = [], badges = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.skills = skills;
    this.completedProjects = completedProjects;
    this.badges = badges;
    this.rating = 0;
    this.level = 1;
    this.joinedCommunities = [];
    this.currentProjects = [];
    this.avatar = null;
    this.bio = '';
    this.createdAt = new Date();
  }

  addSkill(skill) {
    if (!this.skills.includes(skill)) {
      this.skills.push(skill);
    }
  }

  removeSkill(skill) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  addBadge(badge) {
    if (!this.badges.includes(badge)) {
      this.badges.push(badge);
    }
  }

  addRating(points) {
    this.rating += points;
    this.level = Math.floor(this.rating / 100) + 1;
  }

  joinCommunity(communityId) {
    if (!this.joinedCommunities.includes(communityId)) {
      this.joinedCommunities.push(communityId);
    }
  }

  leaveCommunity(communityId) {
    this.joinedCommunities = this.joinedCommunities.filter(id => id !== communityId);
  }
}