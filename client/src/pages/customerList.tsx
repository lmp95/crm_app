import React, { useEffect, useState } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import InputField from '../components/InputField';
import ModalBox from '../components/Modal';
import { customerInterface } from '../interface/customer.interface';

function CustomerList() {
  const [customers, setCustomers] = useState({ content: [], total: 0 });
  const [selectedCustomer, setSelectedCustomer] = useState(
    {} as customerInterface
  );
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const onDelete = (customer: customerInterface) => {
    setSelectedCustomer(customer);
    showModalHandler();
  };

  const showModalHandler = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  const fetchCustomers = async () => {
    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PORT}/v1/customer/?page=${currentPage}&limit=${limit}&search=${search}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fail to fetch customers');
        } else return response.json();
      })
      .then((result) => {
        setCustomers(result);
      })
      .catch((error) => console.log(error));
    paginationList();
  };

  useEffect(() => {
    fetchCustomers();
  }, [limit, currentPage, search]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginationList = () => {
    let i = 1;
    let page = 1;
    const result = [];
    while (i <= customers.total) {
      result.push(page);
      page++;
      i += limit;
    }
    return result;
  };

  const searchDate = () => {
    fetchCustomers();
  };

  const onDeleteCustomer = async (customerId: string | null | undefined) => {
    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}customer/${customerId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fail to delete customer');
        } else return response.json();
      })
      .then(() => {
        showModalHandler();
        fetchCustomers();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='card'>
      <div className='card-title'>
        <p>Customers</p>
      </div>
      <div className='filter-section'>
        <div className='date-filter'>
          <InputField
            name='startDate'
            type='date'
            placeholder='Start Date'
            value={dateRange.startDate}
            onChange={(event) =>
              setDateRange({ ...dateRange, startDate: event.target.value })
            }
          />
          <InputField
            name='endDate'
            type='date'
            placeholder='End Date'
            value={dateRange.endDate}
            onChange={(event) =>
              setDateRange({ ...dateRange, endDate: event.target.value })
            }
          />
          <button className='btn-primary' onClick={searchDate}>
            Search
          </button>
        </div>
        <button className='btn-primary'>Export CSV</button>
        <div className='item-option'>
          <div className='options'>
            <select
              name='items'
              defaultValue={5}
              id='items'
              onChange={(event) => setLimit(parseInt(event.target.value))}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
            <label htmlFor='items'>entries per page</label>
          </div>
          <InputField
            name='search'
            placeholder='Search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className='data-table'>
        <table className='data-grid'>
          <thead className='data-header'>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Gender</th>
              <th>NRC</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.content.map((customer: customerInterface, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' />
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.nrc}</td>
                  <td>{customer.createdDate}</td>
                  <td>
                    <button className='edit-btn'>Edit</button>
                    <button
                      className='delete-btn'
                      onClick={() => onDelete(customer)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {customers?.content.length <= 0 && (
          <div className='no-data'>
            <p>No Data</p>
            <AiOutlineInbox />
          </div>
        )}
      </div>
      <div className='data-footer'>
        <p>
          Showing entries {(currentPage - 1) * limit + 1} to{' '}
          {currentPage * limit} of {customers.total} entries
        </p>
        <div className='page-list'>
          {paginationList().map((item, i) => {
            return (
              <li
                key={i}
                className={`pagination-box ${
                  currentPage === item ? 'active' : ''
                }`}
                onClick={() => changePage(item)}
              >
                {item}
              </li>
            );
          })}
        </div>
      </div>
      <br></br>
      {showModal && (
        <ModalBox
          title='Delete Customer'
          message={`Are you sure to delete customer ${
            selectedCustomer && selectedCustomer.name
          }?`}
          onClose={showModalHandler}
          onConfirm={() => onDeleteCustomer(selectedCustomer._id)}
        />
      )}
    </div>
  );
}

export default CustomerList;
