import React from 'react';
import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { dateDiffrence } from './Utile';


function ListingContent({
  properties,
  pagination,
  propertyLoading,
  handlePagination,
}) {
  const columns = [
    {
      name: 'Location',
      selector: '',
      sortable: true,
      minWidth: '200px',
      cell: (row) => (
        <Link to={`/propertydetail/${row.PropertyID}`}>
          {row.AreaLabel ? `${row.AreaLabel}, ` : ''}
          {row.CityLabel},{row.CountyLabel}
        </Link>
      ),
    },
    {
      name: 'Price',
      selector: 'LastPriceEur',
      sortable: true,
      cell: (row) => (
        <p className='text-bold-500 text-truncate mb-0'>
          {row.LastPriceEur
            ? `${row.LastPriceEur} EUR`
            : row.LastUnitarPriceEur
            ? `${row.LastUnitarPriceEur} EUR/m`
            : 'Sale'}
          {row.LastUnitarPriceEur && <sup>2</sup>}
        </p>
      ),
    },
    {
      name: 'Imobil',
      selector: 'PropertyTypeLabel',
      sortable: true,
    },
    {
      name: 'Nr. Camere',
      selector: 'RoomCount',
      sortable: true,
      // cell: (row) => <p className='text-bold-500 mb-0'>{row.revenue}</p>,
    },
    {
      name: 'SQM',
      selector: 'LotSizeSqm',
      sortable: true,
    },
    {
      name: 'Contact',
      selector: 'ListedByLabel',
      sortable: true,
    },
    {
      name: 'Vechime',
      selector: '',
      sortable: true,
      cell: (row) => <p>{dateDiffrence(row.FirstDate, 'vechime')}</p>,
    },
    {
      name: 'Date',
      sortable: true,
      selector: '',
      cell: (row) => <p>{dateDiffrence(row.LastDate)}</p>,
    },
  ];

  return (
    <div>
      
          <DataTable
            data={properties}
            columns={columns}
            noHeader
            pagination
            paginationServer
            progressPending={propertyLoading}
           
            paginationPerPage={25}
            paginationResetDefaultPage={false}
            paginationTotalRows={pagination && pagination.TotalCount}
            onChangePage={(page, totalRows) => handlePagination(page)}
            paginationComponentOptions={{
              noRowsPerPage: true,
              selectAllRowsItem: false,
            }}
            subHeader
          />
     
    </div>
  );
}

export default ListingContent;
