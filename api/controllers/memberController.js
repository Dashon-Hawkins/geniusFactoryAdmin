module.exports = {
    "new": function(req, res){
        res.view();
    },

    "/": function(req, res){
        res.view();
    },

    create: function(req,res,next){
        member.create(req.params.all(), function memberCreated(err,member){
            if(err) return next(err) ;

            res.view(member);

        })
    }
};
