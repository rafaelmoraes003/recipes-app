import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import exploreImg from '../images/explore.svg';
import '../style/Explore.css';

const Explore = () => {
  const history = useHistory();
  return (
    <div>
      <Header title="Explore" showSearchIcon={ false } />
      <div className="explore-container">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
          className="style-btn"
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => { history.push('/explore/drinks'); } }
          className="style-btn"
        >
          Explore Drinks
        </button>
        <img src={ exploreImg } alt="Explore" />
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
