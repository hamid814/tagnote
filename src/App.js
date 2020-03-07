import React from 'react';

import Navbar from './components/layout/Navbar';
import Modal from './components/layout/Modal';
import Alert from './components/layout/Alert';

function App() {
  return (
    <div>
      <Modal />
      <Alert />
      <Navbar />
      from app.js
    </div>
  );
}

export default App;
