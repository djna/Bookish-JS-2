
import User from '../models/user.js';
import executeSql from '../helpers/dbHelper.js';

export default class UserRepository {
    async getUser(username, password) {
        try {
            let queryResult = await executeSql(
                'SELECT * FROM users WHERE username = @username',
                { "username": username }
            );

            if ( ! queryResult.recordset){
                throw new Error('No results from user query');
            }

            let userSet = queryResult.recordset;
            if ( userSet.length == 0){
                throw new Error('No valid users');
            }
            let user = userSet[0];

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
}