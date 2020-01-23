const Conversations = require("../../models/conversations");

/**
 * firstUser is the user who is logged in
 * secondUser is the user to which the logged in user is initiating a conversation
 */
exports.createConversation = (req, res) => {
  let firstUser = req.user.id;
  let secondUser = req.query.userId;
  Conversations.findOne({
    deletedAt: null,
    $or: [
      { $and: [{ firstUser: firstUser }, { secondUser: secondUser }] },
      { $and: [{ firstUser: secondUser }, { secondUser: firstUser }] }
    ]
  })
    .populate("firstUser", "firstName lastName")
    .populate("secondUser", "firstName lastName")
    // .select("firstUser secondUser createdAt")
    .lean()
    .then(conversation => {
      if (!conversation) {
        Conversations.create({
          firstUser: firstUser,
          secondUser: secondUser
        })
          .then(conversation =>
            res.status(200).json({
              success: true,
              conversation: conversation,
              message: "Conversation Started Successfully"
            })
          )
          .catch(err =>
            res
              .status(400)
              .json({ success: false, message: "Something went wrong" })
          );
      } else {
        res.status(200).json({
          success: true,
          conversation: conversation,
          message: "Conversation Already Exist"
        });
      }
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchAllConversations = (req, res) => {
  Conversations.find({
    deletedAt: null,
    $or: [{ firstUser: req.user.id }, { secondUser: req.user.id }]
  })
    .populate("firstUser", "firstName lastName")
    .populate("secondUser", "firstName lastName")
    .select("firstUser secondUser createdAt")
    .lean()
    .then(allConversations => {
      let conversations = [];
      allConversations.map(item => {
        let convo = {};
        if (item.firstUser._id == req.user.id) {
          convo._id = item._id;
          convo.user = item.secondUser;
          conversations.push(convo);
        } else {
          convo._id = item._id;
          convo.user = item.firstUser;
          conversations.push(convo);
        }
      });
      res.status(200).json({
        success: true,
        conversations: conversations,
        message: "All Conversations Fetched Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchSingleConversation = (req, res) => {
  Conversations.findOne({
    deletedAt: null,
    _id: req.query.conversationId
  })
    .populate("firstUser", "firstName lastName")
    .populate("secondUser", "firstName lastName")
    // .select("firstUser secondUser createdAt")
    .lean()
    .then(conversation => {
      let user = {};
      if (conversation.firstUser._id == req.user.id) {
        user = conversation.secondUser;
      } else {
        user = conversation.firstUser;
      }
      delete conversation.firstUser;
      delete conversation.secondUser;
      res.status(200).json({
        success: true,
        user: user,
        conversation: conversation,
        message: "Conversation Fetched Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.deleteConversation = (req, res) => {
  Conversations.deleteOne({ _id: req.query.conversationId })
    .then(deleted =>
      res.status(200).json({
        success: true,
        deleted: deleted,
        message: "Conversation Deleted Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.sendMessage = async (req, res) => {
  if (!req.body.message) {
    res
      .status(400)
      .json({ success: false, message: "Cannot send message with empty body" });
  } else {
    await Conversations.findByIdAndUpdate(
      req.body.conversationId,
      {
        $push: { messages: { message: req.body.message, user: req.user.id } }
      },
      { new: true }
    )
      .select("messages")
      .exec()
      .then(conversation =>
        res.status(200).json({
          success: true,
          conversation: conversation,
          message: "Message Sent Successfully"
        })
      )
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};
