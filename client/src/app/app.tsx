import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetails from './details/ticket-details';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const originalTickets = useRef<Ticket[]>([]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await (await fetch('/api/tickets').then()).json();
      setTickets(data);
      originalTickets.current = data;
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    } 
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles['app']}>
      <div className="app-header">
        <h1><span>Ticketing</span> <span><i>App</i></span></h1>
      </div>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} setTickets={setTickets} users={users} originalTickets={originalTickets.current} />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
