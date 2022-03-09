import serviceFuc from "./service.js";

export default class userService{
    addUser = serviceFuc("insertUser", "fail insertUser.");
    getUsers = serviceFuc("selectUsers", "not found userList");
    getUserComments = serviceFuc("selectUserComments", "not found commentList");
}