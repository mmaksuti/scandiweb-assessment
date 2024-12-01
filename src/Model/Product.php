<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\Category;
use App\Model\GalleryItem;
use App\Model\Attribute;
use App\Model\AttributeSet;
use App\Model\Price;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\ManyToMany;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\InverseJoinColumn;
use Doctrine\Common\Collections\Collection;

#[Entity]
#[Table(name: 'Product')]
class Product extends BaseModel {
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(name: 'product_id')]
    private string $id;

    #[Column]
    private string $name;

    #[Column(name: 'in_stock')]
    private bool $inStock;

    #[OneToMany(targetEntity: GalleryItem::class, mappedBy: 'product')]
    private Collection $galleryItems;
    private array|null $gallery = null;

    #[Column]
    private string $description;

    #[ManyToOne(targetEntity: Category::class)]
    #[JoinColumn(name: 'category_id', referencedColumnName: 'id')]
    private Category $categoryObject;
    private string|null $category = null;

    #[JoinTable(name: 'Product_Attribute')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    #[InverseJoinColumn(name: 'attribute_id', referencedColumnName: 'id')]
    #[ManyToMany(targetEntity: Attribute::class)]
    private Collection $attributeCollection;
    private array|null $attributes = null;
    private array|null $attributeSetMap = null;

    #[JoinTable(name: 'Product_Price')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    #[InverseJoinColumn(name: 'price_id', referencedColumnName: 'id')]
    #[ManyToMany(targetEntity: Price::class)]
    private Collection $prices;

    #[Column]
    private string $brand;

    function getId(): string {
        return $this->id;
    }

    function getName(): string {
        return $this->name;
    }

    function getInStock(): bool {
        return $this->inStock;
    }

    function getGallery(): array {
        if ($this->gallery == null) {
            $this->gallery = [];
            foreach ($this->galleryItems as $galleryItem) {
                $this->gallery[] = $galleryItem->getImageUrl();
            }
        }
        return $this->gallery;
    }

    function getDescription(): string {
        return $this->description;
    }

    function getCategory(): string {
        if ($this->category == null) {
            $this->category = $this->categoryObject->getName();
        }
        return $this->category;
    }

    function getAttributes(): array {
        if ($this->attributes == null) {
            $this->attributes = [];
            $this->attributeSetMap = [];

            foreach ($this->attributeCollection as $attribute) {
                $attributeSetId = $attribute->getAttributeSet()->getId();

                if (!array_key_exists($attributeSetId, $this->attributeSetMap)) {
                    $this->attributes[] = [
                        'id' => $attributeSetId,
                        'name' => $attribute->getAttributeSet()->getName(),
                        'type' => $attribute->getAttributeSet()->getType(),
                        'items' => []
                    ];

                    $attributeSetIdx = count($this->attributes) - 1;
                    $this->attributeSetMap[$attributeSetId] = $attributeSetIdx;
                }
                else {
                    $attributeSetIdx = $this->attributeSetMap[$attributeSetId];
                }
                
                $this->attributes[$attributeSetIdx]['items'][] = [
                    'id' => $attribute->getId(),
                    'displayValue' => $attribute->getDisplayValue(),
                    'value' => $attribute->getValue()
                ];
            }
        }

        return $this->attributes;
    }

    function getPrices(): Collection {
        return $this->prices;
    }

    function getBrand(): string {
        return $this->brand;
    }
}

?>