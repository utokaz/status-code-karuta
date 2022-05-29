import { useRouter } from 'next/router';
import { Footer } from '../components/Footer';
import { PrimaryButton } from '../components/PrimaryButton';
import styles from '../styles/Landing.module.css';
import { storageManager } from '../utils/storageManager';
import { NextPageWithLayout } from './_app';

const Landing: NextPageWithLayout = () => {
  const router = useRouter();
  const storedUser = storageManager.getUserFromStorage();
  const onStartClick = () => {
    if (storedUser) {
      router.push('/roomSelect');
    } else {
      router.push('/userRegister');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <p className={styles.app_name}>Status Code Karuta</p>
        <PrimaryButton onClick={onStartClick}>はじめる</PrimaryButton>
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
