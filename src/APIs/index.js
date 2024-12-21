const tasks = [
    {
        title: "Interview with developer",
        description: "Schedule and conduct an interview with a potential developer candidate.",
        dueDate: "Due today",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        owner: "Admin"
    },
    {
        title: "Reflection time for interns",
        description: "A dedicated session for interns to reflect on their weekly progress and challenges.",
        dueDate: "Tomorrow",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        owner: "Admin"
    },
    {
        title: "Task preparation for interns",
        description: "Prepare and assign tasks for interns to enhance their project-related skills.",
        dueDate: "Due today",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        owner: "HR"
    }
];

const calendarItems = [
    {
        id: "05",
        title: "InternHub workshop",
        subtitle: "8 of 12 sessions, Instructor",
        time: "14:00-14:45",
    },
    {
        id: "06",
        title: "InternHub design session",
        subtitle: "8 of 12 sessions, Instructor",
        time: "11:00-14:45",
    },
    {
        id: "07",
        title: "Team meeting",
        subtitle: "4 of 20 meetings, Design Team",
        time: "12:00-12:35",
    },
    {
        id: "08",
        title: "User interview",
        subtitle: "1 of 2, Zoom meeting",
        time: "16:00-17:00",
    },
    {
        id: "09",
        title: "User interview",
        subtitle: "2 of 2, Zoom meeting",
        time: "16:00-16:30",
    },
];

const reportData = [
    {
        id: 1,
        name: "Alice Johnson",
        attendance: 92,
        taskUpdate: "Completed front-end tasks; optimizing UI.",
        taskCompletion: 85,
        department: "Development",
        joiningDate: "2024-01-05",
        email: "alice.johnson@example.com",
        phone: "+91-1234567890",
        taskStatus: "Completed",
        performance: 88,
        comments: "Strong problem-solving and task execution."
    },
    {
        id: 2,
        name: "Bob Smith",
        attendance: 78,
        taskUpdate: "Completed research; creating content.",
        taskCompletion: 60,
        department: "Marketing",
        joiningDate: "2024-03-12",
        email: "bob.smith@example.com",
        phone: "+91-2345678901",
        taskStatus: "Pending",
        performance: 70,
        comments: "Needs improvement in meeting deadlines."
    },
    {
        id: 3,
        name: "Charlie Brown",
        attendance: 85,
        taskUpdate: "Completed onboarding; improving portal.",
        taskCompletion: 90,
        department: "HR",
        joiningDate: "2024-02-10",
        email: "charlie.brown@example.com",
        phone: "+91-3456789012",
        taskStatus: "Completed",
        performance: 80,
        comments: "Efficient, but needs better collaboration."
    },
    {
        id: 4,
        name: "David Williams",
        attendance: 88,
        taskUpdate: "Completed audit; working on budget.",
        taskCompletion: 75,
        department: "Finance",
        joiningDate: "2024-04-15",
        email: "david.williams@example.com",
        phone: "+91-4567890123",
        taskStatus: "Pending",
        performance: 85,
        comments: "Good analytical skills, needs better time management."
    },
    {
        id: 5,
        name: "Eva Parker",
        attendance: 95,
        taskUpdate: "Launched strategy; optimizing resources.",
        taskCompletion: 100,
        department: "Operations",
        joiningDate: "2024-05-18",
        email: "eva.parker@example.com",
        phone: "+91-5678901234",
        taskStatus: "Completed",
        performance: 93,
        comments: "Exceeds expectations and leads improvements."
    }
];



export { tasks, calendarItems, reportData }