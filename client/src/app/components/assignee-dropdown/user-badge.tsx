import Avatar from 'client/src/components/avatar';

const UserBadge = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div className="user-badge" onClick={onClick}>
      <span style={{ display: 'flex' }}>
        <Avatar name={name} />
        <span className="">{name || 'Unassigned'}</span>
      </span>
    </div>
  );
};

export default UserBadge;
