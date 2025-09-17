import { useEffect, useState } from "react";

const AssigneeToggle = ({ details, setDetails }) => {
    const [users, setUsers] = useState({});
    useEffect(() => {
        const fetchDetails = async () => {
            await fetch('/api/users/').then((res) => {
                return res.json();
            }).then(async (data) => {
                setUsers(data);
            });
        }
        fetchDetails();
    }, [])
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
        {users.length > 0 && details?.id && users?.map((user) => {
            
            return <div>
                {<input defaultChecked={user.id === details.assigneeId} type='radio' name="user" id={user.id}/> }<label for={user.id}>{user.name}</label>
            </div>
        })}
    </div>
}

export default AssigneeToggle;