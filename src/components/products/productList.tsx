import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProductListProps } from "../../interface/product";

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-card-container mt-4">
      {products.map((product) => (
        <div key={product.id} className="col">
          <Card
            title={product.title}
            subTitle={`Rs.${product.price}`}
            className="product-card"
          >
            <div className="product-card-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-card-image"
              />
            </div>
            <div className="product-actions">
              <Button
                label="Edit"
                onClick={() => onEdit(product)}
                size="small"
              />
              <Button
                label="Delete"
                onClick={() => onDelete(product.id)}
                className="p-button-danger"
                size="small"
              />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
