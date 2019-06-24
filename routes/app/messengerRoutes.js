module.exports = app => {
    const messengerControllers = require("../../controllers/app/messengerControllers");
  
    app.route("/api/createConversation").get(messengerControllers.createConversation);
    app.route("/api/fetchAllConversations").get(messengerControllers.fetchAllConversations);
    app.route("/api/fetchConversation").get(messengerControllers.fetchSingleConversation);
    app.route("/api/deleteConversation").get(messengerControllers.deleteConversation);
    app.route("/api/sendMessage").post(messengerControllers.sendMessage);
    
  };
  