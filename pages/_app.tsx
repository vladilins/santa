import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Home() {
  const [childId, setChildId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (childId === "" || message === "") {
      return alert("Please fill all fields");
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/submit", { childId, message });

      if (response.status === 200) {
        alert("Success! Your request has been received.");
      }
    } catch (error: any) {
      alert(error.response.data);
      console.error("Error submitting form:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what do you want for Christmas?</p>
        Who are you?
        <input
          name="userid"
          placeholder="charlie.brown"
          onChange={(e) => setChildId(e.target.value)}
        />
        <form onSubmit={handleSubmit}>
          What do you want for Christmas?
          <textarea
            name="wish"
            rows={10}
            cols={45}
            placeholder="Gifts!"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" id="submit-letter" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
