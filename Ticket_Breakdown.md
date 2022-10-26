# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.


## Your Breakdown Here

### Ticket 1:

As a facility manager over seeing a facility, I want to be to assign agents to our facility by proving id for specific agents in the system.

Acceptance Criteria:

1. As a facility manager, I should be able to see all agents and their metadata (name, email, e.t.c)
2. As a facility manager, I should be able to assign an id to a particular agent in the system. This ID is should be unique accros the facility
3. As a facility manager, I should be able to unassign/remove an id attached to a particular agent

Implementation Details:

- Develop API that returns the list of all agents in the system

  ```
  [{
    name: "Agent Name",
    email: "agent@system.com"
    internal_id: "agent-1",
  }]
  ```
- Develop API that assigns a particular id to an agent

  ```
    Request Body: 
    {
       agent_facility_id: "12345",
       facility_id: "facility-1",
       internal_id: "agent-1"
    }

  ```
 This API would write to a new table that saves the mapping of the agent facility id, assigned agent id, and the internal agent id
 
 
- Develop API that unassigns a particular id to an agent

  ```
    Request Body: 
    {
       agent_facility_id: "12345",
       facility_id: "facility-1",
    }

  ```
 This API would write to a new table that saves the mapping of the agent facility id, assigned agent id, and the internal agent id


Time Effort: 6 - 8 hours



### Ticket 2:

Write a new function `getAgentShiftsByFacilityId` which would take the agent id and facility id as paramenter and be return all the shifts of the specific agent.

Acceptance Criteria:

1. Takes facility_agent_id and facillity_id as parameters and return and array of shifts along side the assigned agent id and their meta data

Implementation Details:

- Do a find of the facility id and facility_agent_id in the new table to get the agent internal id. 
- Do a join to the shift table using the internal agent id to get the shifts of the specific agent
- Do a join to the agent table to get their meta
- Return the joined data


Time Effort: 4 - 5  hours


### Ticket 3:

Modify function `generateReport` include the agent facility id in the generated report.

Acceptance Criteria:

1. A column `agent_facility_id` should be present in the pdf showing the facility id of the agent

Implementation Details:

- Add a column `agent_facility_id` to the generated pdf


Time Effort: 3 - 5  hours

