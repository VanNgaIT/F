import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import './UserList.css';

const UserList = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users/online')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Dữ liệu không phải là mảng:', response.data);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const columns = React.useMemo(() => [
    { Header: 'Name', accessor: 'name', disableSortBy: false },
    { Header: 'Email', accessor: 'email', disableSortBy: false },
    { Header: 'Status', accessor: 'status', disableSortBy: false },
    { Header: 'Location', accessor: 'location', disableSortBy: false },
    { Header: 'Role', accessor: 'role', disableSortBy: false },
    {
      Header: 'Activity', accessor: 'activity', disableSortBy: false, Cell: ({ value }) => (
        <span>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>)
    },
    {
      Header: 'Registration Date', accessor: 'registrationDate', disableSortBy: false, Cell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-GB'); // Định dạng DD/MM/YYYY
      }
    },
  ], []);

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
      const locationMatches = location ? user.location.toLowerCase().includes(location.toLowerCase()) : true;
      const roleMatches = role ? user.role.toLowerCase().includes(role.toLowerCase()) : true;
      return nameMatches && locationMatches && roleMatches;
    });
  }, [users, search, location, role]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data: filteredUsers,
      initialState: { sortBy: [{ id: 'name', desc: false }] },
    },
    useSortBy
  );

  return (
    <div>
      <h1>User List</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by role"
        value={role}
        onChange={e => setRole(e.target.value)}
      />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ cursor: 'pointer' }}
                  key={columnIndex}
                >
                  {column.render('Header')}
                  <span>
                    {sortBy.find(s => s.id === column.id)
                      ? (sortBy.find(s => s.id === column.id).desc ? ' 🔽' : ' 🔼')
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
