import React from 'react';
import styles from '../IssueCard.module.css';
import ReactTooltip from 'react-tooltip';

const IssueCard = ({ issues, loading, ...props }) => {
    if (loading) {
        return <h2>Loading...</h2> //test
    } else {
        return issues.map(el => {
            return  <div className={`col-sm-3 float-left px-4 mb-5`}>
                        <div className={`${styles.issueCard} card`}>
                            <div className="card-header p-0">
                                <div className={styles.titleContainer}>
                                    <i  className="fas fa-circle float-right pt-2"
                                        style={{
                                            fontSize: '.75rem',
                                            color:  el.open
                                                    ? 'rgb(40,167,69)' //Green if open/true
                                                    : 'rgb(220,53,69)' //Red if closed/false
                                        }}/>
                                    <h1 className={styles.title}>
                                        {el.issue_title}
                                    </h1>
                                    <div className="float-right">
                                        <i className="far fa-edit mr-2 text-primary"
                                            data-tip="Edit" 
                                            data-for="edit"
                                            data-toggle={
                                                el.open
                                                ? "modal"
                                                : null
                                            }
                                            data-target="#AddOrEdit" 
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            id={el._id}
                                            onClick={
                                                el.open
                                                ? props.handleEditClick
                                                : null}/>
                                        <ReactTooltip place="bottom" effect="solid" id="edit"/>
                                        <i className="far fa-trash-alt mr-2 text-danger" 
                                            data-tip="Delete" 
                                            data-for="delete"
                                            id={el._id}
                                            onClick={props.handleDelete}
                                            style={{
                                                cursor: 'pointer'
                                            }}/>
                                        <ReactTooltip place="bottom" effect="solid" id="delete"/>
                                        <i className="far fa-times-circle text-success" 
                                            onClick={props.handleClose} 
                                            data-tip="Close" 
                                            data-for="close"
                                            id={el._id}
                                            style={{
                                                cursor: 'pointer'
                                            }}/>
                                        <ReactTooltip place="bottom" effect="solid" id="close"/>
                                    </div>
                                    <span style={{
                                        color: "lightgray"
                                    }}>
                                        {
                                            el.created_on !== el.updated_on
                                            ? `Updated ${new Date(el.updated_on).toLocaleDateString()}`
                                            : `Created ${new Date(el.created_on).toLocaleDateString()}`
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="card-body w-100 h-100 p-0">
                                <div className={styles.textContainer}>
                                    {el.issue_text}
                                </div>
                                <div className={styles.status}>
                                    <b>Status:</b> {el.status_text}
                                </div>
                            </div>
                            <div className={`${styles.persons} py-2 card-footer bg-white`}>
                                <span id="created_by">
                                    Created by {el.created_by}
                                </span>
                                <br/>
                                <span>
                                    Assigned to {el.assigned_to}
                                </span>
                            </div>
                        </div>
                    </div>
            
        })
    }
}

export default IssueCard;