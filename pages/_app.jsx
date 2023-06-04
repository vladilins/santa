import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Home() {
  const [childId, setChildId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (childId === "" || message === "") {
      return alert("Please fill all fields");
    }

    try {
      const response = await axios.post("/api/submit", { childId, message });

      if (response.status === 200) {
        alert("Success! Your request has been received.");
      }
    } catch (error) {
      alert(error.response.data);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>
        who are you?
        <input
          name="userid"
          placeholder="charlie.brown"
          onChange={(e) => setChildId(e.target.value)}
        />
        <form onSubmit={handleSubmit}>
          what do you want for christmas?
          <textarea
            name="wish"
            rows="10"
            cols="45"
            placeholder="Gifts!"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" id="submit-letter">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
