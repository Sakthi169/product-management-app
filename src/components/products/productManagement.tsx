import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useProducts } from "../../hooks/useProducts";
import ProductList from "../products/productList";
import ProductFormDialog from "../products/productForm";
import PaginationControls from "../../components/paginationControls";
import { ProductProps } from "../../interface/product";

const ProductManagement = () => {
    const {
        products,
        loading,
        error,
        page,
        hasNextPage,
        setPage,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useProducts(2);

    const toast = useRef<Toast>(null);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductProps | null>(null);

    const handleSave = async (product: Omit<ProductProps, "id"> | ProductProps) => {
        if ("id" in product) {
            await updateProduct(product);
        } else {
            await addProduct(product);
        }
        setDialogVisible(false);
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        if (toast.current) {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Product deleted successfully',
                life: 500,
            });
        }
    };

    return (
        <div className="product-root-container p-3">
            <Toast ref={toast} />
            <Button
                label="Add Product"
                onClick={() => {
                    setEditProduct(null);
                    setDialogVisible(true);
                }}
                disabled={products.length < 1}
                size="small"
            />

            {loading && <p>Loading...</p>}
            {error && <p><Message severity="error" text={error} /></p>}

            <ProductList
                products={products}
                onEdit={(p) => {
                    setEditProduct(p);
                    setDialogVisible(true);
                }}
                onDelete={handleDelete}
            />

            <PaginationControls page={page} setPage={setPage} hasNextPage={hasNextPage} />

            <ProductFormDialog
                visible={dialogVisible}
                productToEdit={editProduct}
                onHide={() => setDialogVisible(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default ProductManagement;
