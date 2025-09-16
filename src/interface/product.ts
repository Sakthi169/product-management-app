export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductFormDialogProps {
  visible: boolean;
  productToEdit: ProductProps | null;
  onHide: () => void;
  onSave: (product: Omit<ProductProps, "id"> | ProductProps) => void;
}

export interface ProductListProps {
  products: ProductProps[];
  onEdit: (p: ProductProps) => void;
  onDelete: (id: number) => void;
}

export interface PaginationControlsProps {
  page: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
}