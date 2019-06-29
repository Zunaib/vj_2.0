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
  Users.findById(req.user.id)
    .select("notifications")
    .then(user => {
      user.notifications.isRead = true;
      let notifications = user.notifications.sort((a, b) => {
        let keyA = new Date(a.date);
        let keyB = new Date(b.date);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      user.save();
      res.status(200).json({
        success: true,
        notifications: notifications,
        message: "Notifications Fetched Successfully"
      });
    })
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
