const Users = require("../../models/users");

exports.createNotification = (
  userId,
  text,
  notificationType,
  contentId,
  contentType
) => {
  Users.findByIdAndUpdate(
    userId,
    {
      "notifications.isRead": false,
      $push: {
        "notifications.notification": {
          text: text,
          date: Date.now(),
          notficationType: notificationType,
          contentId: contentId,
          contentType: contentType
        }
      }
    },
    { new: true }
  )
    .then(user => console.log("notification added"))
    .catch(err => console.log(err));
};

exports.fetchNotifications = (req, res) => {
  Users.findByIdAndUpdate(
    req.user.id,
    {
      "notifications.isRead": true
    },
    { new: true }
  )
    .select("notifications")
    .then(user =>
      res.status(200).json({
        success: true,
        notifications: user.notifications,
        message: "Notifications Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
