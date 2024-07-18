import React from "react";

import Card from "./Card";

const CashierItems = ({ products, showDialog }) => {
    return (
        <div className="w-full grid lg:grid-cols-3 mt-4 gap-6">
            {products.map((product) => (
                <Card
                    product={product}
                    showDialog={showDialog}
                    key={product.id}
                />
            ))}
        </div>
    );
};

export default CashierItems;
