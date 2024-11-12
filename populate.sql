-- Insert Categories
INSERT INTO Category (name) VALUES 
('all'),
('clothes'),
('tech');

-- Insert Currency
INSERT INTO Currency (label, symbol) VALUES 
('USD', '$');

-- Insert Products
INSERT INTO Product (product_id, name, inStock, description, brand, category_id) VALUES
('huarache-x-stussy-le', 'Nike Air Huarache Le', true, '<p>Great sneakers for everyday use!</p>', 'Nike x Stussy', (SELECT id FROM Category WHERE name = 'clothes')),
('jacket-canada-goosee', 'Jacket', true, '<p>Awesome winter jacket</p>', 'Canada Goose', (SELECT id FROM Category WHERE name = 'clothes')),
('ps-5', 'PlayStation 5', true, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'Sony', (SELECT id FROM Category WHERE name = 'tech')),
('xbox-series-s', 'Xbox Series S 512GB', false, '<div><ul><li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li><li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li><li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li><li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li><li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li><li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li><li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li><li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li><li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li><li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li></ul></div>', 'Microsoft', (SELECT id FROM Category WHERE name = 'tech')),
('apple-imac-2021', 'iMac 2021', true, 'The new iMac!', 'Apple', (SELECT id FROM Category WHERE name = 'tech')),
('apple-iphone-12-pro', 'iPhone 12 Pro', true, 'This is iPhone 12. Nothing else to say.', 'Apple', (SELECT id FROM Category WHERE name = 'tech')),
('apple-airpods-pro', 'AirPods Pro', false, '<h3>Magic like you''ve never heard</h3><p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they''re ready to use right out of the case.</p>', 'Apple', (SELECT id FROM Category WHERE name = 'tech')),
('apple-airtag', 'AirTag', true, '<h1>Lose your knack for losing things.</h1><p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they''re on your radar in the Find My app. AirTag has your back.</p>', 'Apple', (SELECT id FROM Category WHERE name = 'tech'));

-- Insert Prices
INSERT INTO Price (amount, currency_id) VALUES
(144.69, (SELECT id FROM Currency WHERE label = 'USD')),
(518.47, (SELECT id FROM Currency WHERE label = 'USD')),
(844.02, (SELECT id FROM Currency WHERE label = 'USD')),
(333.99, (SELECT id FROM Currency WHERE label = 'USD')),
(1688.03, (SELECT id FROM Currency WHERE label = 'USD')),
(1000.76, (SELECT id FROM Currency WHERE label = 'USD')),
(300.23, (SELECT id FROM Currency WHERE label = 'USD')),
(120.57, (SELECT id FROM Currency WHERE label = 'USD'));

-- Link Products with Prices
INSERT INTO Product_Price (product_id, price_id) VALUES
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Price WHERE amount = 144.69)),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Price WHERE amount = 518.47)),
((SELECT id FROM Product WHERE product_id = 'ps-5'), (SELECT id FROM Price WHERE amount = 844.02)),
((SELECT id FROM Product WHERE product_id = 'xbox-series-s'), (SELECT id FROM Price WHERE amount = 333.99)),
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM Price WHERE amount = 1688.03)),
((SELECT id FROM Product WHERE product_id = 'apple-iphone-12-pro'), (SELECT id FROM Price WHERE amount = 1000.76)),
((SELECT id FROM Product WHERE product_id = 'apple-airpods-pro'), (SELECT id FROM Price WHERE amount = 300.23)),
((SELECT id FROM Product WHERE product_id = 'apple-airtag'), (SELECT id FROM Price WHERE amount = 120.57));

-- Insert AttributeSets
INSERT INTO AttributeSet (attribute_set_id, name, type) VALUES
('Size', 'Size', 'text'),
('Color', 'Color', 'swatch'),
('Capacity', 'Capacity', 'text'),
('With USB 3 ports', 'With USB 3 ports', 'text'),
('Touch ID in keyboard', 'Touch ID in keyboard', 'text');

-- Insert Attributes
INSERT INTO Attribute (attribute_id, attribute_set_id, displayValue, value) VALUES
-- Size attributes
('40', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), '40', '40'),
('41', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), '41', '41'),
('42', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), '42', '42'),
('43', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), '43', '43'),
('Small', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), 'Small', 'S'),
('Medium', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), 'Medium', 'M'),
('Large', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), 'Large', 'L'),
('Extra Large', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size'), 'Extra Large', 'XL'),

-- Color attributes
('Green', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'), 'Green', '#44FF03'),
('Cyan', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'), 'Cyan', '#03FFF7'),
('Blue', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'), 'Blue', '#030BFF'),
('Black', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'), 'Black', '#000000'),
('White', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'), 'White', '#FFFFFF'),

-- Capacity attributes
('256GB', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity'), '256GB', '256GB'),
('512GB', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity'), '512GB', '512GB'),
('512G', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity'), '512G', '512G'),
('1T', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity'), '1T', '1T'),

-- USB ports attributes
('Yes', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'With USB 3 ports'), 'Yes', 'Yes'),
('No', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'With USB 3 ports'), 'No', 'No'),

-- Touch ID attributes
('Yes_Touch', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Touch ID in keyboard'), 'Yes', 'Yes'),
('No_Touch', (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Touch ID in keyboard'), 'No', 'No');

-- Link Products with AttributeSets
INSERT INTO Product_AttributeSet (product_id, attribute_set_id) VALUES
-- Nike Air Huarache
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size')),
-- Jacket
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Size')),
-- PS5
((SELECT id FROM Product WHERE product_id = 'ps-5'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color')),
((SELECT id FROM Product WHERE product_id = 'ps-5'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity')),
-- Xbox
((SELECT id FROM Product WHERE product_id = 'xbox-series-s'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color')),
((SELECT id FROM Product WHERE product_id = 'xbox-series-s'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity')),
-- iMac
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity')),
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'With USB 3 ports')),
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Touch ID in keyboard')),
-- iPhone
((SELECT id FROM Product WHERE product_id = 'apple-iphone-12-pro'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Capacity')),
((SELECT id FROM Product WHERE product_id = 'apple-iphone-12-pro'), (SELECT id FROM AttributeSet WHERE attribute_set_id = 'Color'));

-- Link Products with Attributes
INSERT INTO Product_Attribute (product_id, attribute_id) VALUES
-- Nike Air Huarache
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = '40')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = '41')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = '42')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = '43')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = 'Green')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = 'Cyan')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = 'Blue')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = 'Black')),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), (SELECT id FROM Attribute WHERE attribute_id = 'White')),
-- Jacket
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'Small')),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'Medium')),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'Large')),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'Extra Large')),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'Black')),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), (SELECT id FROM Attribute WHERE attribute_id = 'White')),
-- PS5
((SELECT id FROM Product WHERE product_id = 'ps-5'), (SELECT id FROM Attribute WHERE attribute_id = 'Black')),
((SELECT id FROM Product WHERE product_id = 'ps-5'), (SELECT id FROM Attribute WHERE attribute_id = '256GB')),
-- Xbox
((SELECT id FROM Product WHERE product_id = 'xbox-series-s'), (SELECT id FROM Attribute WHERE attribute_id = 'White')),
((SELECT id FROM Product WHERE product_id = 'xbox-series-s'), (SELECT id FROM Attribute WHERE attribute_id = '512GB')),
-- iMac
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM Attribute WHERE attribute_id = '512G')),
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM Attribute WHERE attribute_id = 'Yes')),
((SELECT id FROM Product WHERE product_id = 'apple-imac-2021'), (SELECT id FROM Attribute WHERE attribute_id = 'Yes_Touch')),
-- iPhone
((SELECT id FROM Product WHERE product_id = 'apple-iphone-12-pro'), (SELECT id FROM Attribute WHERE attribute_id = '256GB')),
((SELECT id FROM Product WHERE product_id = 'apple-iphone-12-pro'), (SELECT id FROM Attribute WHERE attribute_id = 'Black'));

-- Insert Gallery Items
INSERT INTO GalleryItem (product_id, image_url) VALUES
-- Nike Air Huarache
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'),
((SELECT id FROM Product WHERE product_id = 'huarache-x-stussy-le'), 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'),
-- Jacket
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'),
((SELECT id FROM Product WHERE product_id = 'jacket-canada-goosee'), 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'),
-- PS 5
((SELECT id FROM Product WHERE id = 'ps-5'), 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),
((SELECT id FROM Product WHERE id = 'ps-5'), 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'ps-5'), 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'),
((SELECT id FROM Product WHERE id = 'ps-5'), 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'ps-5'), 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'),
-- XBOX
((SELECT id FROM Product WHERE id = 'xbox-series-s'), 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'xbox-series-s'), 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'xbox-series-s'), 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'xbox-series-s'), 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'),
((SELECT id FROM Product WHERE id = 'xbox-series-s'), 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'),
-- IMAC
((SELECT id FROM Product WHERE id = 'apple-imac-2021'), 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'),
-- IPHONE
((SELECT id FROM Product WHERE id = 'apple-iphone-12-pro'), 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000'),
-- AIRPODS
((SELECT id FROM Product WHERE id = 'apple-airpods-pro'), 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000'),
-- AIRTAG
((SELECT id FROM Product WHERE id = 'apple-airtag'), 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');