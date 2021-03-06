/**
 * Created by vcantu on 6/7/17.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function (app) {
    var connectionString = 'mongodb://localhost/ryzeup-dev'; // for local
    if(process.env.MONGODB_URI) { // check if running remotely
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);

    // declare models
    var userModel    = require('./models/user/user.model.server');
    var postModel    = require('./models/post/post.model.server');
    var commentModel = require('./models/comment/comment.model.server');

    require('./services/v1/congress.service.server.js')(app);
    require('./services/v1/civicinfo.service.server.js')(app);
    require('./services/v1/bills.service.server.js')(app);
    require('./services/v1/auth.service.server.js')(app, userModel);
    require('./services/v1/user.service.server')(app, userModel);
    require('./services/v1/admin.service.server')(app, userModel);

    require('./services/v1/post.service.server')(app, postModel);
    require('./services/v1/comment.service.server')(app, commentModel);


    require('./fixtures/fake.data.server')(app);

};