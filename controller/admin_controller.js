const User = require('../model/users');

// show the admin page
module.exports.adminPage = async function (req, res) {
    try {
        let employee = await User.find({});
        return res.render('Admin_page', {
            title: 'ESR | Admin Page',
            employee
        });

    } catch (error) {
        console.log("Error", error);
        return;
    }
};

// make the Employee an Admin
module.exports.makeAdmin = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { isAdmin: true } });
        if (user) {

            req.flash('success', 'Switched to Admin successfully');
            return res.redirect('back')
        }

    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'error in converting into Admin.');
        return;

    }
};

// remove the employee from the admin Role
module.exports.removeAdmin = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { isAdmin: false } });
        if (user) {

            req.flash('success', 'Switched to Employee successfully');
            return res.redirect('back')

        }
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'error in converting into Employee');
        return;
    }
};

// delete the Employee
module.exports.deleteEmployee = async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            if (req.xhr) {
                return res.status(200).json({
                    message: "Employee Deleted"
                })
            }
            req.flash('success', 'Employee Removed successfully')
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'Something wrong in removing the employee.')
        return;
    }
}

// update the details of the employee
module.exports.update = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (user.name == req.body.name && user.email == req.body.email && user.password == req.body.password) {
            return res.redirect('back');
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password

            await user.save();
            req.flash('success', 'Employee details updated successfully')
            return res.redirect('back');

        }
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'Error in updating the deatils')
        return;
    }
}

