const Dropdowns = require("../../models/dropdowns");

exports.createDropdown = (req, res) => {
  let { key } = req.body;
  Dropdowns.create({ dropdownName: key })
    .then(dropdown =>
      res.status(200).json({
        success: true,
        dropdown: dropdown,
        message: "Dropdown Created Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.addValueToDropdown = async (req, res) => {
  let { key, value } = req.body;
  if (!value) {
    res.status(400).json({ success: false, message: "Something went wrong" });
  } else {
    await Dropdowns.findOneAndUpdate(
      { dropdownName: key },
      { $push: { values: value } },
      { new: true }
    )
      .then(async dropdown => {
        await res.status(200).json({
          success: true,
          dropdown: dropdown,
          message: "Dropdown Fetched Successfully"
        });
      })
      .catch(err =>
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" })
      );
  }
};

exports.fetchDropdownValues = (req, res) => {
  let { key } = req.body;
  Dropdowns.find({ dropdownName: key })
    .lean()
    .then(dropdown =>
      res.status(200).json({
        success: true,
        dropdown: dropdown,
        message: "Dropdown Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchAllDropdowns = (req, res) => {
  Dropdowns.find()
    .lean()
    .then(dropdowns =>
      res.status(200).json({
        success: true,
        dropdown: dropdowns,
        message: "Dropdown Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
