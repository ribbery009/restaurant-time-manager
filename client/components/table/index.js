import DataTable from 'react-data-table-component';


export default function Table({ data, columns, paginationProp }) {
console.log("data: ",data)

    return (
        <DataTable
            direction="auto"
            fixedHeaderScrollHeight="300px"
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            columns={columns}
            data={data}
            pagination={paginationProp ? (true) : (false)}
        />
    );
};