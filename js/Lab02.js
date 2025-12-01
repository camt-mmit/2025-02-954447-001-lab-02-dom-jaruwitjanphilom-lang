import React, { useState } from "react";
import "./App.css";

const Section = ({ id, onDelete }) => {
  const [inputs, setInputs] = useState([{ id: 1, value: 0 }]);

  const addInput = () => {
    const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
    setInputs([...inputs, { id: newId, value: 0 }]);
  };

  const deleteInput = (inputId) => {
    setInputs(inputs.filter((item) => item.id !== inputId));
  };

  const handleChange = (id, newValue) => {
    setInputs(
      inputs.map((item) =>
        item.id === id ? { ...item, value: Number(newValue) } : item
      )
    );
  };

  const total = inputs.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="section-container">
      <div className="section-header">
        <button className="btn-input" onClick={addInput}>
          + Input
        </button>
        <h2 className="section-title">Section {id}</h2>
        <button className="btn-delete-section" onClick={() => onDelete(id)}>
          ☒
        </button>
      </div>

      <hr className="divider" />

      <div className="input-list">
        {inputs.map((item, index) => (
          <div key={item.id} className="input-row">
            <label className="input-label">
              Number <span className="blue-colon">{index + 1} ::</span>
            </label>
            <input
              type="number"
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="number-input"
            />
            <button
              className="btn-delete-input"
              onClick={() => deleteInput(item.id)}
            >
              ☒
            </button>
          </div>
        ))}
      </div>

      <div className="result-row">
        <span className="result-label">
          Result <span className="blue-colon">::</span>
        </span>
        <span className="result-value">{total}</span>
      </div>
    </div>
  );
};

export default function App() {
  const [sections, setSections] = useState([{ id: 1 }]);

  const addSection = () => {
    const newId =
      sections.length > 0 ? sections[sections.length - 1].id + 1 : 1;
    setSections([...sections, { id: newId }]);
  };

  const deleteSection = (id) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  return (
    <div className="app">
      <div className="top-controls">
        <button className="btn-section" onClick={addSection}></button>
      </div>

      {sections.map((sec) => (
        <Section key={sec.id} id={sec.id} onDelete={deleteSection} />
      ))}
    </div>
  );
}
