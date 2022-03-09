import serviceFuc from "./service.js";

export default class commentService{
    addComment = serviceFuc("insertComment", "fail insertComment");
    modifyComment = serviceFuc("updateComment", "not found commentList");
    deleteComment = serviceFuc("deleteComment", "not found commentList");
}