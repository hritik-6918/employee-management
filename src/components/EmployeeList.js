import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const updateEmployee = async (employee) => {
    try {
      await axios.put(`https://dummy.restapiexample.com/api/v1/update/${employee.id}`, employee);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({ ...editingEmployee, [name]: value });
  };

  const handleUpdate = () => {
    updateEmployee(editingEmployee);
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {editingEmployee && editingEmployee.id === employee.id ? (
              <>
                <input
                  type="text"
                  name="employee_name"
                  value={editingEmployee.employee_name}
                  onChange={handleInputChange}
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            ) : (
              <>
                {employee.employee_name} - {employee.employee_salary} - {employee.employee_age}
                <button onClick={() => handleEditClick(employee)}>Edit</button>
                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
