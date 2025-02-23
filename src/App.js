import Map from './components/Map'
import { useState, useEffect } from 'react'

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const { events } = await res.json();
        setEventData(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Updated eventData:", eventData);
  }, [eventData]);

  return (
    <div>
      {loading ? <h2>Loading...</h2> : <Map eventData={eventData} />}
    </div>
  );
}

export default App;
