import useFetchApis from "client/src/hooks/useFetchApis";
import { useEffect, useState } from "react";

const AssigneeToggle = ({ handleToggle, defaultAssigneeId }) => {
    const [users, setUsers] = useState({});
    const [fetchUsers] = useFetchApis('/api/users/');
    useEffect(() => {
        const fetchDetails = async () => {
           const data = await fetchUsers({});
           setUsers(data)
        }
        fetchDetails({});
    }, [])
    
    return<div className="assignee-dropdown"> 
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