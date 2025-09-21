import useFetchApis from 'client/src/hooks/useFetchApis';
import { useEffect, useRef, useState } from 'react';
import UserBadge from './user-badge';
import Avatar from 'client/src/components/avatar';
import useClickOutside from 'client/src/hooks/useClickOutSide';
import './index.scss';
import { User } from '@acme/shared-models';

const AssigneeDropDown = ({ assigneeId, onSelect }: { assigneeId: number; onSelect: (user: User) => void }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchUsers] = useFetchApis('/api/users/');
  const [showMenu, setShowMenu] = useState(false);
  const { myRef } = useClickOutside(() => setShowMenu(false));

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchUsers({});
      setUsers(data as User[]);
    };
    fetchDetails();
  }, []);
  const selectedUser: User = users?.find?.((user: User) => user.id === assigneeId) || { id: -1, name: '' };
  return (
    <div style={{ position: 'relative' }}>
      <div className="assignee-dropdown">
        <UserBadge name={selectedUser?.name} onClick={() => setShowMenu(!showMenu)} />
        {
          <ul style={{ position: 'absolute', top: 20, display: showMenu ? 'block' : 'none' }}>
            <li
              ref={(el) => (myRef.current[users.length + 1] = el)}
              onClick={() => {
                onSelect({ id: -1, name: '' });
                setShowMenu(false);
              }}
            >
              <Avatar /> Unassigned
            </li>
            {users.length > 0 &&
              users?.map((user, index) => {
                return (
                  <li
                    ref={(el) => (myRef.current[index] = el)}
                    onClick={async () => {
                      onSelect(user);
                      setShowMenu(false);
                    }}
                  >
                    <Avatar name={user.name} />
                    {user.name}
                  </li>
                );
              })}
          </ul>
        }
      </div>
    </div>
  );
};

export default AssigneeDropDown;
