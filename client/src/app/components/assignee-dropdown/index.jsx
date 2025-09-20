import useFetchApis from "client/src/hooks/useFetchApis";
import { useEffect, useRef, useState } from "react";
import UserBadge from "./user-badge";
import Avatar from "client/src/components/avatar";
import useClickOutside from "client/src/hooks/useClickOutSide";
import './index.scss'


const AssigneeDropDown = ({ assigneeId, onSelect }) => {
    const [users, setUsers] = useState({});
    const [fetchUsers] = useFetchApis('/api/users/');
    const [showMenu, setShowMenu] = useState(false);
    const { myRef } = useClickOutside(() => setShowMenu(false));

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetchUsers({});
            setUsers(data)
        }
        fetchDetails({});
    }, [])
    const selectedUser = users?.find?.((user) => user.id === assigneeId) || {};
    return <div style={{ position: 'relative' }}>
        <div className="assignee-dropdown">
            <UserBadge name={selectedUser?.name} onClick={() => setShowMenu(!showMenu)} />
            {<ul style={{ position: 'absolute', top: 20, display: showMenu ? 'block' : 'none' }} >
                <li ref={(el) => (myRef.current[users.length + 1] = el)}  onClick={() => {
                    console.log('AA');
                    
                        onSelect({id: -1});
                        setShowMenu(false);
                    }}><Avatar/> Unassigned</li>
                {users.length > 0 && users?.map((user, index) => {
                    return <li ref={(el) => (myRef.current[index] = el)} onClick={async () => {
                        onSelect(user);
                        setShowMenu(false);
                    }}><Avatar name={user.name} />{user.name}</li>
                })
                }</ul>}
        </div>

    </div>
}

export default AssigneeDropDown;