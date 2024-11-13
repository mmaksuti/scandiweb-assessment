CREATE TABLE IF NOT EXISTS Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Currency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    symbol VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Price (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    currency_id INT,
    FOREIGN KEY (currency_id) REFERENCES Currency(id)
);

CREATE TABLE IF NOT EXISTS AttributeSet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_set_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Attribute (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_id VARCHAR(255),
    attribute_set_id INT,
    display_value VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (attribute_set_id) REFERENCES AttributeSet(id)
);

CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    description TEXT NOT NULL,
    category_id INT,
    brand VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE IF NOT EXISTS Product_Attribute (
    product_id INT,
    attribute_id INT,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (attribute_id) REFERENCES Attribute(id)
);

CREATE TABLE IF NOT EXISTS GalleryItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE IF NOT EXISTS Product_Price (
    product_id INT,
    price_id INT,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (price_id) REFERENCES Price(id)
);