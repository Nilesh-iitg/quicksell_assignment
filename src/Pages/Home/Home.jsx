import React, { useState, useEffect } from "react";
import TodoFilter from "../../Component/TodoFilter/TodoFilter";
import TodoList from "../../Component/TodoList/TodoList";
import ApiService from "../../Services/ApiService";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayOption, setDisplayOption] = useState("status");
  const [sortOption, setSortOption] = useState("title");
  const [groupedTickets, setGroupedTickets] = useState([]);
  useEffect(() => {
    // Fetch tickets from the API when the component mounts.
    ApiService.fetchData()
      .then((response) => {
        setTickets(response.tickets);
        setUsers(response.users);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        // Handle error as needed.
      });
  }, []);

  useEffect(() => {
    groupTickets(displayOption);
  }, [displayOption, sortOption, tickets, users]);

  const groupTickets = (displayOption) => {
    const groupedTickets = {};

    for (const ticket of tickets) {
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
    setGroupedTickets(groupedTickets);
  };

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <div>
      <div style={{ background: "#fff", padding: "1rem 2rem" }}>
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
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "2rem",
          gridColumnGap: "1rem",
        }}
      >
        {Object.entries(groupedTickets).map(([groupKey, groupTickets]) => (
          <TodoList
            key={groupKey}
            displayOption={displayOption}
            groupName={groupKey}
            tickets={groupTickets}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
