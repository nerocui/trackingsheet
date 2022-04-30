import './App.css';
import { fetchTrackables } from './hooks/useFirebase';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import './hooks/useFirebase';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [trackables, setTrackables] = useState<DocumentData[]>([]);
  // const getTrackables = useCallback(async () => {
  //   setTrackables(await fetchTrackables());
  // }, []);
  // useEffect(() => {
  //   getTrackables();
  // }, []);
  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!email || email === '' || !password || password === '') {
      return;
    }
    const auth = getAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    console.log(user);
    setEmail('');
    setPassword('');
  }, [setEmail, setPassword]);
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type='email' onChange={e => {
          e.preventDefault();
          setEmail(e.target.value);
        }}/>
        <input type='password' onChange={e => {
          e.preventDefault();
          setPassword(e.target.value);
        }}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
