import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storageEmail = JSON.parse(localStorage.getItem('user'));
    if (storageEmail !== null) {
      setEmail(storageEmail.email);
    }
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
    <div>
      <Header title="Profile" showSearchIcon={ false } />

      <h3 data-testid="profile-email">{email}</h3>

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
      <Footer />
    </div>
  );
};
export default Profile;
