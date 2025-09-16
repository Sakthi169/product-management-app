import { Button } from "primereact/button";
import { PaginationControlsProps } from "../interface/product"

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, setPage, hasNextPage }) => {
    return (
        <div className="pagination-container">
            <Button
                label="Previous"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                size = "small"
            />
            <p>Page {page}</p>
            <Button label="Next" onClick={() => setPage(page + 1)} disabled={!hasNextPage} size = "small"/>
        </div>
    );
};

export default PaginationControls;
