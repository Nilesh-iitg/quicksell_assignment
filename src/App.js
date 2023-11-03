import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoFilter from "./Component/Select/TodoFilter";
import TodoList from "./Component/List/TodoList";

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayOption, setDisplayOption] = useState("status");
  const [sortOption, setSortOption] = useState("title");
  const [sortedData, setSortedData] = useState([]);

  const ApiService = {
    fetchData: async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
  };

  useEffect(() => {
    // Fetch tickets from the API when the component mounts.
    ApiService.fetchData()
      .then((response) => {
        setTodos(response.tickets);
        setUsers(response.users);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        // Handle error as needed.
      });
  }, []);

  useEffect(() => {
    groupTickets(displayOption);
  }, [displayOption, sortOption, todos, users]);

  const groupTickets = (displayOption) => {
    const groupedTickets = {};

    for (const ticket of todos) {
      // Determine the key to use for grouping based on the selected `displayOption`.
      const groupKey =
        displayOption === "user"
          ? findUserName(ticket.userId)
          : ticket[displayOption];

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      // Add the user data to the ticket object
      const user = users.find((user) => user.id === ticket.userId);
      const ticketWithUser = { ...ticket, user };
      groupedTickets[groupKey].push(ticketWithUser);
    }
    // Sort the grouped tickets based on the selected sort option
    for (const key in groupedTickets) {
      if (sortOption === "priority") {
        groupedTickets[key].sort((a, b) => b.priority - a.priority);
      } else if (sortOption === "title") {
        groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    console.log(groupedTickets);
    setSortedData(groupedTickets);
  };

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div>
              <div style={{ background: "#fff", padding: "1rem 4rem" }}>
                <TodoFilter
                  displayOption={displayOption}
                  sortOption={sortOption}
                  setDisplayOption={setDisplayOption}
                  setSortOption={setSortOption}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "2rem",
                  gridColumnGap: "1rem",
                }}
              >
                {Object.entries(sortedData).map(([groupKey, groupTickets]) => (
                  <TodoList
                    key={groupKey}
                    displayOption={displayOption}
                    groupName={groupKey}
                    tickets={groupTickets}
                  />
                ))}
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
