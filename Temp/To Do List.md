## Daily
```dataview
TASK
FROM "Utils/task-calendar"
WHERE !completed AND due <= date(today)
```

## No Deadline
```dataview
TASK
FROM "Utils/task-calendar"
WHERE !completed AND due = "None"
```

## Done
```dataview
TASK
FROM "Utils/task-calendar"
WHERE completed
```
