import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const onSubmit = () => {
    toast.success('OTP Sent Successfully');
  };

  return (
    <div>
      <button onClick={onSubmit}>Submit</button>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '1px solid #4caf50',
              padding: '16px',
              color: '#4caf50',
            },
          },
          error: {
            style: {
              border: '1px solid #f44336',
              padding: '16px',
              color: '#f44336',
            },
          },
        }}
      />
    </div>
  );
};

export default App;
