function Greeting() {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12)
    greeting = "Good Morning";

  else if (hour < 18)
    greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <div className="greeting-card">

      <h1>
        {greeting} 👋
      </h1>

      <p>
        {today}
      </p>

    </div>

  );

}

export default Greeting;