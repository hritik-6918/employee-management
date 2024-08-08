import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [employee, setEmployee] = useState({
    employee_name: '',
    employee_salary: '',
    employee_age: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const addEmployee = async () => {
    try {
      await axios.post('https://dummy.restapiexample.com/api/v1/create', employee);
      onEmployeeAdded();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <input
        type="text"
        name="employee_name"
        placeholder="Name"
        value={employee.employee_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="employee_salary"
        placeholder="Salary"
        value={employee.employee_salary}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="employee_age"
        placeholder="Age"
        value={employee.employee_age}
        onChange={handleInputChange}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
