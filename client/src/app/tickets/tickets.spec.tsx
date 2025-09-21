import { render, screen } from '@testing-library/react';

import Tickets from './tickets';
import { useRef, useState } from 'react';
import { Ticket, User } from '@acme/shared-models';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const TicketForTest = () => {
  const originalTickets = useRef<Ticket[]>([]);
  const ticketData: Ticket[] = [
    { id: 1, description: 'Ticket 1', completed: false, assigneeId: 1 },
    { id: 2, description: 'Ticket 2', completed: false, assigneeId: null },
    { id: 3, description: 'Ticket 3', completed: true, assigneeId: null },
  ];

  const [tickets, setTickets] = useState<Ticket[]>(ticketData);
  const users: User[] = [{ id: 1, name: 'Alice' }];
  originalTickets.current = ticketData;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Tickets
              tickets={tickets}
              users={users}
              setTickets={setTickets}
              originalTickets={originalTickets}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

describe('Tickets', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<TicketForTest />);
    expect(baseElement).toBeTruthy();
    const headingTitle = screen.getByRole('heading', { name: /tickets/i });
    const completeButton = screen.getAllByRole('button', { name: /completed/i })[0];
    const incompleteButton = screen.getAllByRole('button', { name: /incompleted/i })[0];
    const createButton = screen.getByRole('button', { name: /create ticket/i });
    const tableRows = screen.getAllByRole('row');
    expect(headingTitle).not.toBeNull();
    expect(completeButton).not.toBeNull();
    expect(incompleteButton).not.toBeNull();
    expect(createButton).not.toBeNull();
    expect(tableRows.length).toBe(4);

    await userEvent.click(createButton);

    const headingModal = screen.getByRole('heading', { name: /create ticket/i });
    const descriptionInput = screen.getByRole('textbox');
    expect(headingModal).not.toBeNull();
    expect(descriptionInput).not.toBeNull();
    await userEvent.click(descriptionInput);
    await userEvent.type(descriptionInput, 'Ticket 4');

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    await userEvent.click(completeButton);
    screen.logTestingPlaygroundURL();
    expect(screen.getAllByRole('row').length).toBe(2);
  });
});
