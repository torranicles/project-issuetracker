const Issue = require('./issue.model')

module.exports = function (app) {

    app.get('/search', (req, res) => {
        let project = req.query.project;
        project.toLowerCase().trim();
        Issue.find({
            project: project
        })
            .select('-__v -project')
            .exec((err, doc) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(doc)
                }
            })
    })

    app.route('/api/issues/:project')

        .get((req, res) => {
            let queries = req.query;
            let objKeys = Object.keys(queries);
            let project = req.params.project;

            Issue.find(
                objKeys.length > 0 
                ? {
                    project: project, 
                    ...queries
                }
                : {
                    project: project
                }
                )
                .select('-__v -project')
                .exec((err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    res.json(data)
                }
            )
        })
        
        .post((req, res) => {
            let {issue_title, issue_text, created_by, assigned_to, status_text} = req.body;
            console.log(req.body)
            const newIssue = new Issue({
                issue_title: issue_title,
                issue_text: issue_text,
                created_on: new Date().toUTCString(),
                updated_on: new Date().toUTCString(),
                created_by: created_by,
                assigned_to: assigned_to,
                status_text: status_text,
                project: req.params.project
            });
            if (!newIssue.issue_title || !newIssue.issue_text || !newIssue.created_by) {
                res.json({
                    error: 'required field(s) missing'
                })
            } //Can be handled by browser

            newIssue.save((err, data) => {
                if (err) {-
                    console.log(err)
                }
                res.json(data)
            })
        })
        
        .put(function (req, res){
            let updates = {};
            for (const [key, value] of Object.entries(req.body)) {
                if (value != '') {
                    updates[key] = value
                }
            };
            if (!req.body._id) {
                return res.json({ error: 'missing _id' });
            } //Transfer to user auth
            if (Object.keys(updates).length < 2) {
                return res.json({ error: 'no update field(s) sent', '_id': req.body._id });
            };
            updates['updated_on'] = new Date().toUTCString();
            Issue.findByIdAndUpdate(req.body._id, updates, { new: true }, (error, data) => {
                if (data) {
                    return res.json({ result: 'successfully updated', '_id': updates._id });
                } else {
                    return res.json({ error: 'could not update', '_id': updates._id });
                }
            });
        })
        
        .delete(function (req, res){
            if (!req.body._id) {
                return res.json({ error: 'missing _id'})
            } //Transfer to user auth
            Issue.findByIdAndDelete(req.body._id, (err, data) => {
                if (data) {
                    return res.json({ result: 'successfully deleted', '_id': req.body._id})
                } else {
                    return res.json({error: 'could not delete', '_id': req.body._id})
                }
            })
        });
};
