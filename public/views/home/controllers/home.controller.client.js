/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($location,
                            congressService,
                            billsService,
                            postService) {
        var model = this;

        function init() {
            billsService.updated('house')
                .then(function (res) {
                    console.log(res.bills);
                    model.bills = res.bills;
                });
            /*
             postService.recentReq()
             .then(function (res) {
             model.posts = res;
             console.log('grabbing posts');
             console.log(model.posts);
             });
             */
            model.posts = [];
            for (var i = 0; i < 10; i++) {
                var temp = {
                    _id: i,
                    title: 'title' + i,
                    text: 'text' + i,
                    billId: 'billId' + i,
                    _author: {
                        _id: 'authorId' + i,
                        name: 'Barack Obama' + i,
                        imageUrl: 'authorImageUrl' + i
                    }
                };
                model.posts.push(temp);
            }
            console.log('set test posts');
            console.log(model.posts);
        }

        init();

        model.goToPostDetailsPage = function (postId) {
            $location.url('/post/details/' + postId);
        };

        model.followPost = function (postid) {
            //TODO FOLLOW
        };

        model.getBillById = function (billId) {
            billsService.details(billId);
        };
    }
})();