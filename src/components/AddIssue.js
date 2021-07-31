import HomeStyles from '../Home.module.css'

const AddIssue = (props) => {
    return (
        <div className="w-100">
            <form onSubmit={props.handleSubmit} id="form">
                {
                    props.newSubmit //From adding issue on homepage
                    ? <i className="fas fa-times float-right text-white" style={{cursor: 'pointer'}}onClick={props.handleCloseForm}/>
                    : null
                }
                {
                    props.editForm
                    ? <h1 className="mb-3 text-center">Edit issue</h1>
                    : <h1 className={`mb-3 text-center ${props.newSubmit ? 'text-white' : 'text-dark'} ${HomeStyles.newIssue}`}>New issue</h1>
                }
                {
                    props.newSubmit //From adding issue on homepage
                    ?   <div className="form-group mb-2">
                            <label htmlFor="Project name">Project name:</label>
                            <input onChange={props.handleChange} name="project" type="text" className="form-control" required/>
                        </div>
                        : null
                }
                <div className="form-group mb-2">
                    <label htmlFor="Issue title">Issue title:</label>
                    <input 
                        onChange={props.handleChange} 
                        name="issue_title" 
                        type="text" 
                        className="form-control" 
                        defaultValue={props.editForm ? props.title : null}
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="Description">Description:</label>
                    <textarea
                        onChange={props.handleChange} 
                        name="issue_text" 
                        type="text" 
                        className="form-control" 
                        defaultValue={props.editForm ? props.description : null}
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="Status">Status:</label>
                    <input 
                        onChange={props.handleChange} 
                        name="status_text" 
                        type="text" 
                        className="form-control"
                        defaultValue={props.editForm ? props.status : null}
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="Created by">Created by:</label>
                    <input 
                        onChange={props.handleChange} 
                        name="created_by" 
                        type="text"
                        className="form-control" 
                        defaultValue={props.editForm ? props.created_by : null}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="Assigned to">Assigned to:</label>
                    <input 
                        onChange={props.handleChange} 
                        name="assigned_to" 
                        type="text" 
                        className="form-control"
                        defaultValue={props.editForm ? props.assigned_to : null}
                    />
                </div>
                <div className={HomeStyles.confirmMessage}>
                    {
                        props.message && props.message.includes('Project name already exists.')
                        ? props.message
                        : props.message && props.message.includes("at least 3 characters")
                        ? <span className="text-danger">{props.message}</span>
                        : null
                    }
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-dark">
                        {
                            props.message && props.message.includes('Project name already exists.')
                            ? 'Confirm'
                            : 'Submit'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddIssue;