import DB from "../config/db";
import { Project } from "../models/projects";
import { runProjectDelete, runProjectInsertSingle, runProjectTitleUpdate } from "../utils/repo/projectRepoHelpers";

class ProjectRepository {
    db = DB.getInstance().getConnection();

    getProjects(userId: number) {
        const stmt = this.db.prepare(`
        SELECT
            p.id,
            p.title,
            COALESCE(tl.taskListCount, 0) AS taskListCount,
            COALESCE(n.noteCount, 0) AS noteCount
        FROM projects p
        WHERE p.user_id = ?
        LEFT JOIN (
            SELECT project_id, COUNT(*) AS taskListCount
            FROM task_lists
            GROUP BY project_id
        ) tl ON tl.project_id = p.id
        LEFT JOIN (
            SELECT project_id, COUNT(*) AS noteCount
            FROM notes
            GROUP BY project_id
        ) n ON n.project_id = p.id
        ORDER BY p.created_at
    `);
        const rows = stmt.all(userId) as Project[];
        return rows;
    }

    addProject(userId:number, title: string) { return runProjectInsertSingle(this.db, userId, title)}
    deleteProject(id: number) { return runProjectDelete(this.db, id) }
    updateProjectTitle(id: number, title: string) {return runProjectTitleUpdate(this.db, title, id);}
}

export default ProjectRepository;