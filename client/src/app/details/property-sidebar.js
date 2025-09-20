import useFetchApis from "client/src/hooks/useFetchApis";
import AssigneeDropDown from "../components/assignee-dropdown";

const PropertySidebar = ({ details, setDetails }) => {
    const [unassignUser] = useFetchApis('/api/tickets/:ticketId/unassign');
    const [assignUser] = useFetchApis('/api/tickets/:ticketId/assign/:userId');
    const [markTicket] = useFetchApis(`/api/tickets/:id/complete`)
    return <div className="property-sidebar sidebar" style={{ width: "30%" }}>
        <h3>Status</h3>
        {(details.completed === true || details.completed === false) &&
            <div>
                <input type="checkbox" defaultChecked={details.completed} onChange={async (e) => {
                    const method = e.target.checked ? 'PUT' : 'DELETE'
                    await markTicket({ params: { id: row.id }, method: method });
                    setDetails((prev) => ({ ...prev, completed: e.target.checked }))
                }} />
                {!details.completed ? 'Mark completed' : 'Mark incompleted'}
            </div>}
        <h3>Assignee</h3>
        {
            details?.id && <AssigneeDropDown assigneeId={details.assigneeId}
                onSelect={async (user) => {
                    user.id != -1 ? await assignUser({ method: 'PUT', params: { ticketId: details.id, userId: user.id } })
                        : await unassignUser({ method: 'PUT', params: { userId: user.id } });
                    setDetails((prev) => ({ ...prev, assigneeId: user.id }))
                }}
            />
        }
    </div>
}

export default PropertySidebar;