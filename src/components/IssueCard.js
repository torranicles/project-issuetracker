import React from 'react';
import styles from '../IssueCard.module.css';
import ReactTooltip from 'react-tooltip';

const IssueCard = ({ issues, loading, ...props }) => {
    return issues.map(el => {
        return  <div className={`col-sm-3 float-left ${styles.cardBox}`} key={el._id}>
                    <i className={styles.triangle} style={
                        el.open 
                        ? {borderColor: 'transparent #28A745 transparent transparent'} 
                        : {borderColor: 'transparent #DC3545 transparent transparent'}}
                    />
                    <div className={`${styles.issueCard} card`} style={el.open ? {opacity: '1'} : {opacity: '.8'}}>
                        <div className="card-header p-0">
                            <div className={styles.titleContainer}>
                                <h1 className={styles.title}>
                                    {el.issue_title}
                                </h1>
                                <div className="float-right">
                                    <i className="far fa-edit mr-2 text-primary"
                                        style={!el.open ? {cursor:'default'} : {cursor:'pointer'}}
                                        data-tip="Edit" 
                                        data-for="edit"
                                        data-tip-disable={el.open ? false : true} 
                                        data-toggle={
                                            el.open
                                            ? "modal"
                                            : null
                                        }
                                        data-target="#AddOrEdit" 
                                        id={el._id}
                                        onClick={
                                            el.open
                                            ? props.handleEditClick
                                            : null}/>
                                    <ReactTooltip place="bottom" effect="solid" id="edit" disable={el.open ? false : true}/>
                                    <i className="far fa-trash-alt mr-2 text-danger" 
                                        style={!el.open ? {cursor:'default'} : {cursor:'pointer'}}
                                        data-tip="Delete"
                                        data-tip-disable={el.open ? false : true} 
                                        data-for="delete"
                                        id={el._id}
                                        onClick={props.handleDelete}/>
                                    <ReactTooltip place="bottom" effect="solid" id="delete" disable={el.open ? false : true}/>
                                    <i className="far fa-times-circle text-success" 
                                        style={!el.open ? {cursor:'default'} : {cursor:'pointer'}}
                                        onClick={props.handleClose} 
                                        data-tip-disable={el.open ? false : true} 
                                        data-tip="Close" 
                                        data-for="close"
                                        id={el._id}/>
                                    <ReactTooltip place="bottom" effect="solid" id="close" disable={el.open ? false : true}/>
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

export default IssueCard;