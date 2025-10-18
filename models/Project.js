export class Project {
  constructor(id, title, description, requiredSkills, difficulty, deadline, communityId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.requiredSkills = requiredSkills;
    this.difficulty = difficulty;
    this.deadline = new Date(deadline);
    this.communityId = communityId;
    this.participants = [];
    this.status = 'active';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.reward = null;
    this.tags = [];
  }

  addParticipant(userId) {
    if (!this.participants.includes(userId)) {
      this.participants.push(userId);
      this.updatedAt = new Date();
    }
  }

  removeParticipant(userId) {
    this.participants = this.participants.filter(participant => participant !== userId);
    this.updatedAt = new Date();
  }

  complete() {
    this.status = 'completed';
    this.updatedAt = new Date();
  }

  isOverdue() {
    return new Date() > this.deadline && this.status === 'active';
  }

  getDaysRemaining() {
    const now = new Date();
    const diffTime = this.deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}