import AssigneeToggle from "../components/assignee-toggle";

const PropertySidebar = ({ details, setDetails }) => {
    return <div className="assignee-toggle" style={{ width: "30%" }}>
        <h3>Status</h3>
        {(details.completed === true || details.completed === false) &&
            <div>
                <input type="checkbox" defaultChecked={details.completed} onChange={async (e) => {
                    const method = e.target.checked ? 'PUT' : 'DELETE'
                    await fetch(`/api/tickets/${details.id}/complete`, { method }).then(res => {
                        if (res.ok) {
                            console.log("Updated successfully");
                            setDetails((prev) => ({ ...prev, completed: e.target.checked }))
                        } else {
                            console.error("Updated failed");
                        }
                    })
                }} />
                {!details.completed ? 'Mark completed' : 'Mark incompleted'}
            </div>}
        <h3>Assignee</h3>
        {details?.id && <AssigneeToggle defaultAssigneeId={details.assigneeId} handleToggle={async (user) => {
             user.id != -1 ? await fetch(`/api/tickets/${details.id}/assign/${user.id}`, { method: 'PUT' }).then() 
             :  await fetch(`/api/tickets/${details.id}/unassign`, { method: 'PUT' }).then() ;
        }}/>}
    </div>
}

export default PropertySidebar;