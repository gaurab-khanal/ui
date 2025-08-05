const React = window.React;

function App({ pluginId, theme }) {
  const [clusters, setClusters] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentTheme, setCurrentTheme] = React.useState(theme);

  React.useEffect(() => {
    const onThemeChange = (e) => {
      const newTheme = e.detail?.theme;
      console.log("newTheme: ", newTheme);
      if (newTheme) {
        setCurrentTheme(newTheme);
      }
    };

    window.addEventListener("theme-toggle", onThemeChange);
    return () => window.removeEventListener("theme-toggle", onThemeChange);
  }, []);

  console.log("Plugin ID from host pluginloader: ", pluginId);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clusters", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const clusterData = await response.json();
        setIsLoading(false);
        setClusters(clusterData);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1
        style={{
          color: currentTheme === "dark" ? "white" : "black",
          marginBottom: "1rem",
        }}
      >
        Cluster Monitor Plugin
      </h1>

      {clusters && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: "12px",
              padding: "1.2rem",
              color: "#fff",
              background: "blue",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Total Clusters
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              {clusters.itsData?.length || 0}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: "12px",
              padding: "1.2rem",
              color: "white",
              background: "green",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Active Clusters
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              {clusters.itsData?.length || 0}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: "12px",
              padding: "1.2rem",
              color: "white",
              background: "orange",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              Current Context
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              {clusters.currentContext}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
