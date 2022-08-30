
import User from '../models/user.js';
import executeSql from '../helpers/dbHelper.js';

export default class UserRepository {
    async getAuthenticatedUser(username, password) {
        try {
            
            let user = await this.getUserByName(username);

            if (user.password === password) {
                return new User(user.username, user.displayname, user.password);
            } else {
                throw new Error('Invalid Password');
            }
        } catch (e) {
            console.log('User repository error', e);
            throw "Cannot authenticate, repository error";
        }
    }

    async getUserByName(username) {
        try {
            let queryResult = await executeSql(
                'SELECT * FROM users WHERE username = @username',
                { "username": username }
            );

            let userSet = queryResult.recordset;
            if ((!userSet) || userSet.length == 0) {
                throw new Error('No valid users');
            }
            let user = userSet[0];

            return user;
        } catch (e) {
            console.log('User repository error', e);
            throw "Cannot authenticate, repository error";
        }

    }
}