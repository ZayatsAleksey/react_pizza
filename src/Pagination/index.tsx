import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPage } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/filter/slice';
import styles from "./Pagination.module.scss"

const Pagination: React.FC = () => {

  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  }

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      pageRangeDisplayed={4}
      forcePage={currentPage - 1}
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageCount={3}
    />
  )

}

export default Pagination;
