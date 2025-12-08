import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());


const sampleTasks = [
    { id: 0, label: "sample Task", done: false },
    { id: 1, label: "do Thing", done: false },
    { id: 2, label: "complete Thing", done: false },
  ];
  const sampleTasksAlt = [
    { id: 3, label: "sample Task", done: false },
    { id: 4, label: "do Thing", done: false },
    { id: 5, label: "complete Thing", done: false },
  ];
  const tempTasks = [
    { id: 1, title: "tasks from API", tasks: [...sampleTasks] },
    { id: 2, title: "tasks 2", tasks: [...sampleTasksAlt] }
  ];

const tempNotes = [
    { id: 1, title: 'API MD Header Note', content: '# H1\n## H2\n### H3' },
    { id: 2, title: 'API MD Stylized', content: 'none\n*italics*\n**bold**\n***bolditalics***' },
    { id: 3, title: 'API MD Specials', content: '### ---\n---\n### *empty*\n' },
    { id: 4, title: 'API MD ulist Note', content: '- l1 \n  - l2' },
];


app.get("/api/tasks", (_req, res) => {
    res.json(tempTasks);
});

app.get("/api/notes", (_req, res) => {
    res.json(tempNotes);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
