import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  // Sample inventory data
  const inventoryData = [
    { name: "Syringes", quantity: 10 },
    { name: "Gloves", quantity: 50 },
    { name: "Masks", quantity: 5 },
    { name: "Stethoscopes", quantity: 15 },
    { name: "Thermometers", quantity: 3 },
    { name: "Bandages", quantity: 7 },
    { name: "Wheelchairs", quantity: 12 },
  ];

  useEffect(() => {
    // Sorting inventory based on quantity in ascending order
    const sortedInventory = inventoryData.sort(
      (a, b) => a.quantity - b.quantity
    );
    setInventory(sortedInventory);
  }, []);

  return (
    <section className="page inventory">
      <h1>Inventory List</h1>
      <div className="inventory-list">
        {inventory && inventory.length > 0 ? (
          inventory.map((item, index) => (
            <div
              key={index}
              className={`inventory-card ${
                item.quantity < 10 ? "low-quantity" : ""
              }`}
            >
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <h1>No Inventory Data Available!</h1>
        )}
      </div>
    </section>
  );
};

export default Inventory;
