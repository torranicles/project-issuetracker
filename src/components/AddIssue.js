const AddIssue = (props) => {
    return (
        <div className="w-100">
            <form onSubmit={props.handleSubmit}>
                <i className="fas fa-times float-right" onClick={props.handleCloseForm}></i>
                <h1>New issue</h1>
                <br/>
                <div className="form-group">
                    <label htmlFor="Project name">Project name:</label>
                    <input onChange={props.handleChange} name="project" type="text" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Issue title">Issue title:</label>
                    <input onChange={props.handleChange} name="issue_title" type="text" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Description">Description:</label>
                    <input onChange={props.handleChange} name="issue_text" type="text" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Created by">Created by:</label>
                    <input onChange={props.handleChange} name="created_by" type="text" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Assigned to">Assigned to:</label>
                    <input onChange={props.handleChange} name="assigned_to" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Status">Status:</label>
                    <input onChange={props.handleChange} name="status_text" type="text" className="form-control"/>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-outline-light"/>
                </div>
            </form>
        </div>
    )
}

export default AddIssue;