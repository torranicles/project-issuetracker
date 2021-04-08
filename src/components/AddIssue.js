const AddIssue = (props) => {
    return (
        <div className="w-100">
            <form>
                <h1>New issue</h1>
                <br/>
                <div className="form-group">
                    <label for="Project name">Project name:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="Issue title">Issue title:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="Description">Description:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="Created by">Created by:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="Status">Status:</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-outline-light"/>
                </div>
            </form>
        </div>
    )
}

export default AddIssue;