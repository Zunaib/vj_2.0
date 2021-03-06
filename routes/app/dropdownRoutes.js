module.exports = app => {
    const dropdownControllers = require("../../controllers/app/dropdownControllers");

    app.route("/api/createDropdown").post(dropdownControllers.createDropdown);
    app.route("/api/addValueToDropdown").post(dropdownControllers.addValueToDropdown);
    app.route("/api/fetchDropdownValues").post(dropdownControllers.fetchDropdownValues);
    app.route("/api/fetchAllDropdowns").get(dropdownControllers.fetchAllDropdowns);

};
