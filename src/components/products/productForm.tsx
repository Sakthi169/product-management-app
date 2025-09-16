import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { ProductProps, ProductFormDialogProps } from "../../interface/product";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  visible,
  productToEdit,
  onHide,
  onSave,
}) => {
  const [form, setForm] = useState<Omit<ProductProps, "id">>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (productToEdit) {
      setForm(productToEdit);
    }
  }, [productToEdit]);

  useEffect(() => {
    if (visible && !productToEdit) {
      setForm({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
    }
  }, [visible, productToEdit]);

  const handleSave = () => {
    if (!form.title.trim() || form.price <= 0) {
      // Show a toast message for the error
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Title and valid price are required.',
          life: 1000,
        });
      }
      return;
    }
    if (productToEdit) {
      onSave({ ...form, id: productToEdit.id });
    } else {
      onSave(form);
    }
  };


  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={productToEdit ? "Edit Product" : "Add Product"}
        visible={visible}
        onHide={onHide}
      >
        <div className="flex flex-col gap-10">
          <InputText
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <InputText
            placeholder="Price"
            type="number"
            value={form.price.toString()}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
          <InputText
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <InputText
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <InputText
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Button label="Save" onClick={handleSave} size="small" />
        </div>
      </Dialog>
    </>
  );
};

export default ProductFormDialog;
