import { faCheck, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssigneeToggle from "./assignee-toggle";

const TicketDetails = () => {
    const params = useParams();
    const [details, setDetails] = useState({});
    useEffect(() => {
        const fetchDetails = async () => {
            await fetch(`/api/tickets/${params.id}`).then((res) => {
                return res.json();
            }).then(async (data) => {
                const user = await (await fetch(`/api/users/${data.assigneeId}`).then()).json();
                setDetails({ ...data, assignee: user.name });
            });
        }
        fetchDetails();
    }, [params.id])
    return <div className="ticket-details" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="details-content"> <h2>Ticket ID: {details.id} <span style={{fontSize: 14}}>{details.completed ? 'Completed' : 'Incompleted'}</span></h2>
            <div>
                <div>
                    <h3>Description: {details.description}</h3>
                </div>
            </div>
        </div>
        <AssigneeToggle details={details} setDetails={setDetails}/>
    </div>
}

export default TicketDetails;