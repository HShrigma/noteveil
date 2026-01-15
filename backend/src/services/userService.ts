// import UserRepository from "../repository/userRepository";
import { runService } from "../utils/service";
import {User} from "../models/users";
export class UserService {
    dummyUser:User = {
        id:0,email:'',userName:'',password:''
    }
    // repo = new UserRepository();

    getUser(id:number) {
        // return runService(() => this.repo.getUser(id), 'Error fetching users:');
    }

    deleteUser(id: number) {
        // const res = runService(() => this.repo.deleteUser(id),'Error deleting user:');
        // return res ? { deleted: res.changes > 0, id: id } : null;
    }

    addUser(email:string, userName:string, password: string) {
        // const res = runService(() => this.repo.addUser(title), 'Error adding user:');
        // return res ? {id: res.lastInsertRowid as number} : null;
    }

    updateUser(id: number, key: string, value: string) {
            if(!(key in this.dummyUser)) {
                console.error(`[ERROR] UserService.updateUser: Invalid Key: ${key}!`);
                return null;
            }
        // const res = runService(() => this.repo.updateUser(id, title),
            // 'Error updating user:');
        // return res ? { updated: res.changes > 0, id: id, title: title  } : null;
    }
}

export default new UserService();