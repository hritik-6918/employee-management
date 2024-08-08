import React from 'react';
import './styles.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const handleEmployeeAdded = () => {
    // Trigger an update on the EmployeeList component after a new employee is added
    window.location.reload();
  };

  return (
    <div>
      <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      <EmployeeList />
    </div>
  );
};

export default App;
