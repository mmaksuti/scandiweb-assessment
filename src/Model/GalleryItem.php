<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\Category;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

#[Entity]
#[Table(name: 'GalleryItem')]
class GalleryItem extends BaseModel
{
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(name: 'image_url')]
    private string $imageUrl;

    #[ManyToOne(targetEntity: Product::class, inversedBy: 'galleryItems')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    public function getImageUrl(): string
    {
        return $this->imageUrl;
    }
}
