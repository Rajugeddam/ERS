
const AssignReview = require('../model/assignReview');
const User = require('../model/users');

// code for show the review page
module.exports.home = async function(req, res) {
  try {
    const users = await User.find({});
    return res.render('review', {
      title: 'ESR | Employee Page',
      users
    });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// code for create the review page
module.exports.createReview = async function(req, res) {
  try {
    const reviewerId = req.body.reviewer;
    const recipientId = req.body.recipient;

    const existingReview = await AssignReview.findOne({
      fromUser: reviewerId,
      toUser: recipientId
    });

    if (existingReview) {
      return res.redirect('back');
    }

    const newReview = await AssignReview.create({
      fromUser: reviewerId,
      toUser: recipientId
    });

    const reviewer = await User.findById(reviewerId);
    reviewer.assignReview.push(newReview);
    await reviewer.save();
    req.flash('success', 'Task Assigned Successfully')
    return res.redirect('back');
  } catch (error) {
    console.log('Error:', error);
    req.flash('error', 'Error In Assigning The Task')
    return;
  }
};
