document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "3f2d1a932b5ac38a95b242dbbe46177e";
  const buscar = document.getElementById("buscar");
  const ciudadInput = document.getElementById("ciudad-input");

  const obtenerClima = async (ciudad) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === "404") {
        alert("Ciudad no encontrada. Intente nuevamente por favor.");
        return;
      }

      const tempElement = document.getElementById("temperatura");
      const ubicaElement = document.getElementById("ubicacion");
      const humeElement = document.getElementById("humedad");
      const veloElement = document.getElementById("velocidad");
      const climaIcon = document.getElementById("clima-icon");

      const roundedTemp = Math.round(data.main.temp);
      const roundedVelo = Math.round(data.wind.speed);

      tempElement.textContent = `${roundedTemp}°C`;
      ubicaElement.textContent = `${data.name}`;
      humeElement.textContent = `${data.main.humidity} %`;
      veloElement.textContent = `${roundedVelo} km/h`;
      climaIcon.src =
        roundedTemp <= 0
          ? "/assets/muchofrio.png"
          : roundedTemp > 0 && roundedTemp <= 15
          ? "/assets/templado.png"
          : roundedTemp > 15 && roundedTemp <= 30
          ? "/assets/calor.png"
          : "/assets/calorinte.png";
    } catch (error) {
      console.error("Error al obtener los datos del clima", error);
    }
  };

  const ciudadDefault = "Resistencia";
  obtenerClima(ciudadDefault);

  const resetInput = () => {
    ciudadInput.value = "";
  };

  buscar.addEventListener("click", async () => {
    const ciudad = ciudadInput.value;
    if (!ciudad) {
      alert("Por favor, ingrese el nombre de una ciudad");
      return;
    }
    await obtenerClima(ciudad);
    resetInput();
  });

  ciudadInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const ciudad = ciudadInput.value;
      if (!ciudad) {
        alert("Por favor, ingrese el nombre de una ciudad");
        return;
      }
      await obtenerClima(ciudad);
      resetInput();
    }
  });d
});
