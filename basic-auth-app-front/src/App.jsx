import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAPI = import.meta.env.VITE_SUPABASE_API;

const supabase = createClient(supabaseURL, supabaseAPI);

function App() {
  const [ session, setSession ] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  console.log(!session)
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "red",
                brandAccent: "darkred",
              },
            },
          },
        }}
      />
    );
  } else {
    return <div style={{color: 'black'}}>Logged in!</div>;
  }
}

export default App;
