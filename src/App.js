import { useState, useEffect } from 'react'
import Map from './components/Map'
import Loader from './components/Loader'

function App() {
  const [eventData, setEventData] = useState([]); // Ensure default empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://data.api.xweather.com/fires/');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
        const { events } = await res.json();
        setEventData(events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchEvents();
  }, []);

  return (
    <div>
      
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;
