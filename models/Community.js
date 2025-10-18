export class Community {
  constructor(id, name, description, logo, directions, members = [], projects = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.directions = directions;
    this.members = members;
    this.projects = projects;
    this.createdAt = new Date();
    this.isPublic = true;
    this.moderators = [];
  }

  addMember(userId) {
    if (!this.members.includes(userId)) {
      this.members.push(userId);
    }
  }

  removeMember(userId) {
    this.members = this.members.filter(member => member !== userId);
  }

  addProject(project) {
    this.projects.push(project);
  }

  getStats() {
    return {
      totalMembers: this.members.length,
      totalProjects: this.projects.length,
      activeProjects: this.projects.filter(p => p.status === 'active').length
    };
  }
}