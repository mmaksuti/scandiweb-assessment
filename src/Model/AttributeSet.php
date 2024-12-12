<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\Attribute;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\Common\Collections\Collection;

#[Entity]
#[Table(name: 'AttributeSet')]
class AttributeSet extends BaseModel
{
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(name: 'attribute_set_id')]
    private string $id;

    #[Column]
    private string $name;

    #[Column]
    private string $type;

    #[OneToMany(targetEntity: Attribute::class, mappedBy: 'attributeSet')]
    private Collection $attributes;

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getAttributes(): Collection
    {
        return $this->attributes;
    }
}
