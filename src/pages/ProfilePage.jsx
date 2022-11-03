import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

export default function ProfilePage() {
  return (
    <div>
      <Header title="Profile" hasSearchIcon={ false } />
      <Profile />
      <Footer />
    </div>
  );
}
