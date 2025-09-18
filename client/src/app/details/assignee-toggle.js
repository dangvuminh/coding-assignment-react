import { useEffect, useState } from "react";

const AssigneeToggle = ({ handleToggle, defaultAssigneeId }) => {
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
    return<div> 
        <input defaultChecked={defaultAssigneeId === null} type='radio' name="user" id={-1} onChange={async () => handleToggle({id: -1})} />
        <label for={-1}>Unassigned</label>
        {users.length > 0 && users?.map((user) => {
        return <div>
            <input defaultChecked={user.id === defaultAssigneeId} type='radio' name="user" id={user.id} onChange={async () => handleToggle(user)} />
            <label for={user.id}>{user.name}</label>
        </div>
    })}
    </div>
}

export default AssigneeToggle;