<?php
// app/Enums/DiscountType.php
namespace App\Enums;

use BenSampo\Enum\Enum;

final class DiscountType extends Enum
{
    const Exact = 'Exact';
    const Minimum = 'Minimum';
}
