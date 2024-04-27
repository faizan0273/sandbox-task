import React, { useState } from "react";
import "./index.css";

function Note() {
  const [tab, setTab] = useState<string>("all");
  const [note, setNote] = useState<{ noteName: string; noteStatus: string }>({
    noteName: "",
    noteStatus: "",
  });
  const [notes, setNotes] = useState<
    { noteName: string; noteStatus: string }[]
  >([]);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNote = () => {
    if (note?.noteName && note?.noteStatus) {
      setNotes([
        ...notes,
        { ...note, noteStatus: note?.noteStatus.toLowerCase() },
      ]);
      setNote({ noteName: "", noteStatus: "" });
    }
  };

  const filteredNotes = notes?.filter((note) => {
    if (tab === "all") {
      return true;
    } else if (tab === "active") {
      return note?.noteStatus === "active";
    } else if (tab === "completed") {
      return note?.noteStatus === "completed";
    }
    return false;
  });

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input
          data-testid="input-note-name"
          name="noteName"
          type="text"
          className="large mx-8"
          placeholder="Note Title"
          value={note?.noteName}
          onChange={handleEventChange}
        />
        <input
          data-testid="input-note-status"
          name="noteStatus"
          type="text"
          className="large mx-8"
          placeholder="Note Status"
          value={note?.noteStatus}
          onChange={handleEventChange}
        />
        <button className="" data-testid="submit-button" onClick={addNote}>
          Add Note
        </button>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li
            className={`tab-item slide-up-fade-in ${
              tab === "all" ? "active" : ""
            }`}
            data-testid="allButton"
            onClick={() => setTab("all")}
          >
            All
          </li>
          <li
            className={`tab-item slide-up-fade-in ${
              tab === "active" ? "active" : ""
            }`}
            data-testid="activeButton"
            onClick={() => setTab("active")}
          >
            Active
          </li>
          <li
            className={`tab-item slide-up-fade-in ${
              tab === "completed" ? "active" : ""
            }`}
            data-testid="completedButton"
            onClick={() => setTab("completed")}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {filteredNotes?.map((note, index) => (
              <tr key={index}>
                <td>{note.noteName}</td>
                <td>
                  {note.noteStatus.charAt(0).toUpperCase() +
                    note.noteStatus.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Note;
