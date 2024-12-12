CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Currency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL UNIQUE,
    symbol VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Price (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    currency_id INT NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES Currency(id)
);

CREATE TABLE IF NOT EXISTS AttributeSet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_set_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Attribute (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_id VARCHAR(255) NOT NULL,
    attribute_set_id INT NOT NULL,
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (attribute_set_id) REFERENCES AttributeSet(id)
);

CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE IF NOT EXISTS Product_Attribute (
    product_id INT NOT NULL,
    attribute_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (attribute_id) REFERENCES Attribute(id)
);

CREATE TABLE IF NOT EXISTS GalleryItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE IF NOT EXISTS Product_Price (
    product_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (price_id) REFERENCES Price(id)
);

-- Order is a reserved keyword
CREATE TABLE IF NOT EXISTS OrderTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_time DATETIME NOT NULL,
    currency_id INT NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES Currency(id)
);

CREATE TABLE IF NOT EXISTS OrderItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES OrderTable(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE IF NOT EXISTS ChosenAttribute (
    order_item_id INT NOT NULL,
    attribute_set_id INT NOT NULL,
    attribute_id INT NOT NULL,
    FOREIGN KEY (order_item_id) REFERENCES OrderItem(id),
    FOREIGN KEY (attribute_set_id) REFERENCES AttributeSet(id),
    FOREIGN KEY (attribute_id) REFERENCES Attribute(id),
    PRIMARY KEY (order_item_id, attribute_set_id, attribute_id)
);