

    app.get('posts/', function(req, res){
        Post.find({}).sort('-createdAt').exec(function(err, posts){
            if(err) return res.json({success: false, message: err});
            res.render("posts/index", {data: posts});
        });
    });

    app.get('/posts/new', function(req, res){
        res.render("posts/new");
    });

    app.post('/posts/', function(req, res){
        Post.create(req.body.post, function(err, post){
            if(err) return res.json({success: false, message: err});
            res.redirect("/posts");
        });
    });

    app.put('/posts/:id', function(req, res){
        req.body.post.updatedAt = Date.now();
        Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post){
            if(err) return res.json({success: false, message: err});
            res.redirect("/posts/" + req.params.id);
        });
    });

    app.get('/posts/:id/edit', function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err) return res.json({success: false, message: err});
            res.render("posts/edit", {data: post});
        });
    });

    app.get('/posts/:id', function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err) return res.json({success: false, message: err});
            res.render("posts/show", {data: post});
        });
    });

    app.delete('/posts/:id', function(req, res){
        Post.findByIdAndRemove(req.params.id, function(err, post){
            if(err) return res.json({success: false, message: err});
            res.redirect('/posts');
        });
    });
