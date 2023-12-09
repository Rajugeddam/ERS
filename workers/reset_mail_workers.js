const queue = require('../config/kue');
const resetMailer = require('../mailers/reset_mailers');
// process the mail of the queue
queue.process('reset', function(job, done){

    resetMailer.newMail(job.data);

    done();
})
