import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import profileLogo from '../images/profile_logo.svg';
import '../style/Profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MAX_TIME = 1500;
    const storageEmail = JSON.parse(localStorage.getItem('user'));
    if (storageEmail !== null) {
      setEmail(storageEmail.email);
    }
    const interval = setTimeout(() => {
      setLoading(false);
    }, MAX_TIME);

    return () => clearInterval(interval);
  }, []);

  const goToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const goToFavotiteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-page-container">
      <Header title="Profile" showSearchIcon={ false } />

      {loading ? <Loading /> : (
        <div className="profile-container">
          <div className="user-container">
            <i className="fa-solid fa-user" />
            <h4 data-testid="profile-email">{email}</h4>
          </div>
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ goToDoneRecipes }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ goToFavotiteRecipes }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </button>
          <img src={ profileLogo } alt="Barbecue logo" />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Profile;
