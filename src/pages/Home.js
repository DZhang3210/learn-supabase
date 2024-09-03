import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("Could not fetch smoothies");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
        console.log(data);
      }
    };

    fetchSmoothies();
  }, []);
  return (
    <div className="page home">
      {fetchError && <p className="text-black">{fetchError}</p>}

      {smoothies && (
        <div className="smoothies text-black">
          {smoothies.map((smoothie) => (
            <p>{smoothie.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
