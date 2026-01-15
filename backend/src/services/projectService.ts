import ProjectRepository from "../repository/projectRepository";
import { runService } from "../utils/service";

export class ProjectService {
    repo = new ProjectRepository();

    getProjectsForUser(userId: number) {
        return runService(() => this.repo.getProjects(userId),'Error fetching projects:');
    }

    deleteProject(id: number) {
        const res = runService(() => this.repo.deleteProject(id),'Error deleting project:');
        return res ? { deleted: res.changes > 0, id: id } : null;
    }

    addProject(userId:number, title:string) {
        const res = runService(() => this.repo.addProject(userId, title), 'Error adding project:');
        return res ? {id: res.lastInsertRowid as number} : null;
    }

    updateProjectTitle(id: number, title: string) {
        const res = runService(() => this.repo.updateProjectTitle(id, title),
            'Error updating project title:');
        return res ? { updated: res.changes > 0, id: id, title: title  } : null;
    }

}

export default new ProjectService();