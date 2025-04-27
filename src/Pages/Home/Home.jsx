// Home.jsx
import React, { useEffect } from 'react';
import './Home.css';
import CabIcon from '../../Assets/cab-icon.png'; // Import the icon
import Cards from '../../Modules/Cards,jsx';


const Home = () => {
  
  useEffect(() => {
    fetchCards();
    readRecommendations();
    getCurrentLocation();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/cards');
      const data = await response.json();
      const container = document.getElementById('cards-container');
      if (container) {
        container.innerHTML = ''; // Clear any existing content
        data.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.className = 'card';
          cardElement.innerHTML = `
            <h3>${card.mode}</h3>
            <p>Emissions: ${card.emissions}</p>
            <p>${card.description}</p>
          `;
          container.appendChild(cardElement);
        });
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleRevert = (event) => {
    event.preventDefault();
    window.location.href = 'reserve.html';
  };

  const readRecommendations = () => {
    const recommendations = document.querySelectorAll('.Home-recommendation-card');
    let text = 'Here are the available options and their descriptions: ';
    recommendations.forEach(card => {
      const title = card.querySelector('h4').innerText;
      const description = card.querySelector('p').innerText;
      text += `${title}: ${description}. `;
    });
    text += 'Select any option to continue.';
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=e4b2abe298e14c68b83e7625aef69b80`);
          const data = await response.json();
          const address = data.results[0].formatted;
          document.getElementById('current-location').innerText = `📍 Current Location: ${address}`;
        } catch {
          alert('Failed to fetch address.');
        }
      }, () => {
        alert('Geolocation failed');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const readCard = (card) => {
    const title = card.querySelector('h4').innerText;
    const text = `You have chosen ${title}. Click on 'Book Now' to proceed.`;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };



  useEffect(() => {
    const cards = document.querySelectorAll('.Home-recommendation-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        readCard(card);
      });
    });
  }, []);

  return (
    <div className="Home-container">

      <div className="Home-map-section">
        <input type="text" placeholder="VR Mall" />
      </div>

      <div className="Home-location-info">
        <div id="current-location">📍 Current Location: Fetching...</div>
        <div>📍 Destination: 67, AR road, Chennai</div>
      </div>

      

      <div className="Home-recommendations">

        

        <div className="Home-recommendation-card Home-green-bg">
          <img src={CabIcon} alt="Chennai Metro" />
          <div className="Home-recommendation-info">
            <h4>Chennai Metro</h4>
            <p>Air Conditioned, Fast Trains</p>
          </div>
          <div className="Home-co2-info">3-5 g CO2/km</div>
        </div>

        <div className="Home-recommendation-card Home-green-bg">
          <img src={CabIcon} alt="Local Bus" />
          <div className="Home-recommendation-info">
            <h4>Local Bus</h4>
            <p>Frequent, Cheap and Reliable</p>
          </div>
          <div className="Home-co2-info">40-80 g CO2/km</div>
        </div>

        <div className="Home-recommendation-card Home-yellow-bg">
          <img src={CabIcon} alt="Bike" />
          <div className="Home-recommendation-info">
            <h4>Bike</h4>
            <p>Fast through Traffic</p>
          </div>
          <div className="Home-co2-info">60-90 g CO2/km</div>
        </div>

        <div className="Home-recommendation-card Home-orange-bg">
          <img src={CabIcon} alt="Auto" />
          <div className="Home-recommendation-info">
            <h4>Auto</h4>
            <p>Private and on Time</p>
          </div>
          <div className="Home-co2-info">70-100 g CO2/km</div>
        </div>

        <div className="Home-recommendation-card Home-red-bg">
          <img src={CabIcon} alt="Cab" />
          <div className="Home-recommendation-info">
            <h4>Cab</h4>
            <p>Comfortable and Luxurious</p>
          </div>
          <div className="Home-co2-info">120-180 g CO2/km</div>
        </div>
      </div>

      <button className="Home-book-now" onClick={handleRevert}>Book Now</button>
    </div>
  );
};

export default Home;
