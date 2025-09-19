import useFetchApis from "client/src/hooks/useFetchApis";
import { useEffect, useState } from "react";


const AssigneeDropDown = ({ assigneeId }) => {
    const [users, setUsers] = useState({});
    const [show, setShow] = useState(false);
    const [fetchUsers] = useFetchApis('/api/users/');
    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetchUsers({});
            setUsers(data)
        }
        fetchDetails({});
    }, [])
    const selectedUser = users?.find?.((user) => user.id === assigneeId) || {};
    return <div>
        <button style={{ position: 'relative' }} onClick={() => setShow(!show)}>
            {selectedUser?.name || 'Unassigned'}
            {show && <ul style={{ position: 'absolute' }}>
                <li>Unassigned</li>
                {users.length > 0 && users?.map((user) => {
                    return <li>{user.name}</li>
                })
                }</ul>}
        </button>

    </div>
}

export default AssigneeDropDown;