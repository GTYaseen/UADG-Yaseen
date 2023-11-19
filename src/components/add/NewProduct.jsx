import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

function NewProduct({ onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const showAdding = () => {
    setIsModalOpen(true);
  };

  const handleOK = () => {
    setIsModalOpen(false);
 // Trigger the callback to refresh the product list
    alert("Product added successfully");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addNewProduct = () => {
    setIsLoading(true);

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        // Handle success, e.g., show a success message or update the product list
        handleOK();
      })
      .catch((error) => {
        console.error("Error adding new product:", error);
        setIsLoading(false);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showAdding}>
        Add new product
      </Button>
      <Modal
        title="Add new product"
        visible={isModalOpen}
        onOk={addNewProduct}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <p>
          product name
          <Input
            placeholder="Ex: iphone X"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          description
          <TextArea
            rows={3}
            placeholder="Ex: An Apple mobile phone with..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </p>
        <p>
          price
          <Input
            addonAfter={<DollarOutlined />}
            placeholder="Ex: 1,200 $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </p>
      </Modal>
    </div>
  );
}

export default NewProduct;
