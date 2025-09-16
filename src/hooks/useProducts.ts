import { useState, useEffect } from "react";
import axios from "axios";
import { ProductProps } from "../interface/product";

export const useProducts = (limit: number = 2) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [localProducts, setLocalProducts] = useState<ProductProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductProps[]>("https://fakestoreapi.com/products");
      setProducts(response.data);
      setLocalProducts(response.data)
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const allProducts = [...localProducts, ...products];
  const paginatedProducts = allProducts.slice((page - 1) * limit, page * limit);
  const hasNextPage = page * limit < allProducts.length;

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct: Omit<ProductProps, "id">) => {
    const response = await axios.post<ProductProps>(
      "https://fakestoreapi.com/products",
      newProduct
    );

    const withId = { ...response.data, id: Date.now() };
    setLocalProducts((prev) => [withId, ...prev]);
  };

  const updateProduct = async (updatedProduct: ProductProps) => {
    const response = await axios.put<ProductProps>(
      `https://fakestoreapi.com/products/${updatedProduct.id}`,
      updatedProduct
    );
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? response.data : p))
    );
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setLocalProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  return {
    products: paginatedProducts,
    loading,
    error,
    page,
    hasNextPage,
    setPage,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
