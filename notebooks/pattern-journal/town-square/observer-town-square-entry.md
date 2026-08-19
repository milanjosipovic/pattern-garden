# Observer in a Town Square

## Entry title

Town square as a living notification system

- Place: Central town square
- Date: [Add date]
- Weather / time of day: [Add context]
- Photographer: [Your name]

## Photo(s)

![Town square scene](./assets/town-square-scene.jpg)

Optional:
- Photo 1: central plaza with benches and people moving through
- Photo 2: notice board or city information screen
- Photo 3: street edge where activity changes and gathers

## What I notice

The square is not just an open space. It is a place where many different systems meet and respond to each other.

- People gather, pause, meet, and move through in waves.
- The central square acts as a shared point of attention.
- Notices, updates, and events affect many people at once.
- The space is dynamic because several actors depend on the same public information.

A notice board, a festival schedule, a street closure, or a sudden weather alert can change what everyone does in a short moment.

## Pattern-language reflection

This feels very close to the idea of a public center and a shared threshold.

- The square acts as a center of public life.
- Different edges connect it to cafés, streets, shops, and walkways.
- The people in the square are not isolated; they are part of a larger network of movement and decision-making.
- The place works because many local systems are informed by one shared condition.

This aligns with Alexander's concern for living structure: the quality of a place depends not only on form, but also on the relationships and activities that gather around it.

## Christopher Alexander connection

This reminds me of a pattern that creates a living public center:

- a space where many paths meet
- where people can pause and read the environment
- where information is shared naturally
- where the city communicates in a visible, human way

Possible pattern qualities:

- threshold
- gathering place
- public center
- edge and connection
- shared attention

## Real-world Observer mapping

### Subject
The town square announcement system or city information source.

Examples:

- central notice board
- city app feed
- public event calendar
- local authority communication channel

### Observers
The parties that care about the city's update.

Examples:

- shop owners
- tourists
- commuters
- café staff
- local residents
- event organizers

### Trigger
Something changes in the public state.

Examples:

- a festival time is moved
- a road is closed
- an event is canceled
- a message is posted about safety or weather

### Notification
The change is communicated to those affected.

Examples:

- sign updates
- app notifications
- spoken announcements
- posted notices on nearby boards
- social media or local radio alerts

## Why this matters

The square works because many interested parties listen to the same source of truth.

If the schedule changes, everyone who depends on it must know quickly. If the update is delayed, confusion spreads. If the signal is clear, people adjust smoothly and the public space stays coherent.

This is exactly the sort of situation where Observer is useful: one source of change, many dependent systems, shared state changes, and automatic updates.

## Software translation

- Subject: central event controller or city state manager
- Observers: display panels, apps, shops, tourist screens, staff dashboards
- attach(): register interest in updates
- detach(): unsubscribe when no longer relevant
- notify(): broadcast the new state to all observers
- update(): react to the event or schedule change

In software terms, the town square is a metaphor for a central data source that many components depend on.

## Summary

A town square is a good real-world example of Observer because it contains a shared source of changing information and many different people or systems that need to respond to it.

The pattern is not just about code objects. It is about a structure of dependence:

- one thing changes
- many other things care
- updates spread automatically
- the system stays aligned

## Follow-up question

What other public locations could teach the same lesson?

- a park notice board
- a train station departure board
- a market square
- a school bulletin system
- an apartment building notice wall
