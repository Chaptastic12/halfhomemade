import { Pagination } from "react-bootstrap";


const PaginationComponent = props => {

    const { active, number, changePage } = props;

    let items = [];
    for(let i=1; i <= number; i++){
        items.push(
            <Pagination.Item key={i} active={i === active} onClick={() => changePage(i)}>{ i }</Pagination.Item>
        )
    }

    return (
        <Pagination size='sm' style={{marginTop: '20px'}}>
            <Pagination.First onClick={() => changePage(1)} />
            { ( number !== 1 && active !== 1 ) && <Pagination.Prev onClick={() => changePage(prevState => prevState - 1)} /> }
                { items }
            { ( number !== 1 && number !== active ) &&  <Pagination.Next onClick={() => changePage(prevState => prevState + 1)} /> }
            <Pagination.Last onClick={() => changePage(number)} />
        </Pagination>
    )
}

export default PaginationComponent;