import DB from "../config/db";
import { Project } from "../models/projects";
import { runProjectDelete, runProjectInsertSingle, runProjectTitleUpdate } from "../utils/repo/projectRepoHelpers";

class ProjectRepository {
    db = DB.getInstance().getConnection();

    getProjects() {
        const stmt = this.db.prepare(`SELECT * FROM projects ORDER BY created_at`);
        const rows = stmt.all() as Project[];
        return rows;
    }

    addProject(title: string) { return runProjectInsertSingle(this.db, "New Project")}
    deleteProject(id: number) { return runProjectDelete(this.db, id) }
    updateProjectTitle(id: number, title: string) {return runProjectTitleUpdate(this.db, title, id);}
}

export default ProjectRepository;