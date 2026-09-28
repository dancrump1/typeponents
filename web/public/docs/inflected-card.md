# Inflected Card

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/inflected-card/component`
- Inspiration: Namer UI (adaptation) — https://namer-ui.netlify.app/components

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/inflected-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@tabler/icons-react`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` *(required)* | `string` | — | — |
| `image` *(required)* | `string` | — | — |
| `title` *(required)* | `string` | — | — |
| `description` *(required)* | `string` | — | — |
| `tags` *(required)* | `Tag[]` | — | — |
| `parentBackgroundColor` *(required)* | `string` | — | — |
| `buttonIcon` *(required)* | `React.ReactElement<unknown, string | React.JSXElementCons…` | — | — |
| `onClick` | `((hoverTarget: string, id: string) => void)` | — | — |
| `onHover` | `((hoverTarget: string, id: string) => void)` | — | — |
| `cardRounding` | `number` | `20` | — |
| `fontSizes` | `{ title?: string; description?: string; tags?: string; pr…` | `{}` | — |
| `margins` | `{ title?: string; description?: string; tags?: string; }` | `{}` | — |
| `buttonIconSize` | `number` | `24` | — |
| `buttonIconColor` | `string` | `'#fff'` | — |
| `buttonIconHoverColor` | `string` | `'#fff'` | — |
| `buttonBackgroundColor` | `string` | `'#282828'` | — |
| `buttonBackgroundHoverColor` | `string` | `'#484848'` | — |
| `imageHoverZoom` | `number` | `1.1` | — |
| `titleColor` | `string` | `'#f7f7ff'` | — |
| `descriptionColor` | `string` | `'#c7c7cf'` | — |
| `mirrored` | `boolean` | `false` | — |
| `titleAlignment` | `"left" | "center" | "right"` | `'left'` | — |
| `descriptionAlignment` | `"left" | "center" | "right"` | `'left'` | — |
| `tagsAlignment` | `"left" | "center" | "right"` | `'left'` | — |
| `maxWidth` | `string` | `'100%'` | — |
| `price` | `string` | — | — |
| `priceTagTextColor` | `string` | `'#ffffff'` | — |
| `oldPrice` | `string` | — | — |
| `oldPriceOnTheRight` | `boolean` | `false` | — |
| `oldPriceTextColor` | `string` | `'#c1c1c7'` | — |
| `priceTagRounding` | `string` | `'5px'` | — |
| `priceTagBackgroundColor` | `string` | `'rgba(0,0,0,0.7)'` | — |

## Usage

```tsx
// Path to the "InflectedCard.tsx" file
import InflectedCard from './component';
import { IconCornerRightUp, IconFold } from '@tabler/icons-react';

export default function InflectedCardUsage() {
    return <div className="bg-[#050505] min-h-[300px] flex flex-wrap gap-8 items-center justify-center relative">
        <InflectedCard
            id="0"
            image="/itjustworks.jpg"
            title="iPhone 15 Pro"
            description="Titanium smartphone with an advanced camera system, offering stunning photography capabilities and a sleek design."
            tags={[
                { name: "Brand new", textColor: "#f7f7ff", backgroundColor: "#9F4EFF", rounding: 5 },
                { name: "10% off", textColor: "#242424", backgroundColor: "#f1f1f7", rounding: 5 },
            ]}
            parentBackgroundColor="#050505"
            cardRounding={15}
            fontSizes={{
                title: "1.8rem",
                description: "1rem",
                tags: "0.85rem",
                price: "0.84rem",
            }}
            margins={{
                title: "0 0 7px 0",
                description: "0 0 18px 0",
                tags: "10px 0 0 0",
            }}
            buttonIcon={<IconCornerRightUp />}
            buttonIconSize={32}
            buttonIconColor="#ffffff"
            buttonIconHoverColor="#EEEEEE"
            buttonBackgroundColor="#9F4EFF"
            buttonBackgroundHoverColor="#a960ff"
            maxWidth="500px"
            imageHoverZoom={1.1}
            price="$1,079"
            priceTagTextColor="#f7f7ff"
            oldPrice="$1,199"
            priceTagRounding="25px"
        />

        <InflectedCard
            id="1"
            image="/itjustworks.jpg"
            title="Samsung Galaxy Flip 6"
            description="Innovative foldable smartphone with a sleek design that enhances portability while providing a large display for immersive viewing experiences and multitasking."
            tags={[
                { name: "Pre-owned", textColor: "#f7f7ff", backgroundColor: "#00A6FB", rounding: 0 },
                { name: "50% off", textColor: "#242424", backgroundColor: "#f1f1f7", rounding: 0 },
            ]}
            parentBackgroundColor="#050505"
            cardRounding={15}
            fontSizes={{
                title: "1.8rem",
                description: "1rem",
                tags: "0.85rem",
                price: "1.12rem",
            }}
            margins={{
                title: "0 0 7px 0",
                description: "0 0 18px 0",
                tags: "10px 0 0 0",
            }}
            buttonIcon={<IconFold />}
            buttonIconSize={32}
            buttonIconColor="#ffffff"
            buttonIconHoverColor="#EEEEEE"
            buttonBackgroundColor="#00A6FB"
            buttonBackgroundHoverColor="#0582CA"
            maxWidth="500px"
            imageHoverZoom={1.1}
            price="$499"
            priceTagTextColor="#050505"
            oldPrice="$991"
            oldPriceTextColor="#565656"
            priceTagRounding="6px"
            priceTagBackgroundColor='rgba(255,255,255,0.78)'
        />

        <InflectedCard
            id="2"
            image="/itjustworks.jpg"
            title="iPhone 7"
            description="Classic iPhone model with 12MP camera and water resistance, offering reliable performance and essential features for everyday smartphone users."
            tags={[
                { name: "Refurbished", textColor: "#f7f7ff", backgroundColor: "#FF3900", rounding: 5 },
                { name: "20% off", textColor: "#242424", backgroundColor: "#f1f1f7", rounding: 5 },
            ]}
            parentBackgroundColor="#050505"
            cardRounding={14}
            fontSizes={{
                title: "1.8rem",
                description: "1rem",
                tags: "0.85rem",
                price: "1.12rem",
            }}
            margins={{
                title: "0 0 7px 0",
                description: "0 0 18px 0",
                tags: "10px 0 0 0",
            }}
            buttonIcon={<IconCornerRightUp />}
            buttonIconSize={32}
            buttonIconColor="#ffffff"
            buttonIconHoverColor="#EEEEEE"
            buttonBackgroundColor="#FF3900"
            buttonBackgroundHoverColor="#FF5733"
            maxWidth="392px"
            imageHoverZoom={1.35}
            price="$159"
            priceTagRounding="25px"
            priceTagBackgroundColor='#FF3900'
        />

        <InflectedCard
            id="3"
            image="/itjustworks.jpg"
            title="iPhone X"
            description="סמארטפון אייקוני עם תצוגת Super Retina בגודל 5.8 אינץ', טכנולוגיית Face ID מתקדמת, מצלמות כפולות של 12MP ועיצוב חדשני שמהפכני בצילום הסלולרי."
            tags={[
                { name: "40% הנחה", textColor: "#242424", backgroundColor: "#f1f1f7", rounding: 15 },
                { name: "משומש", textColor: "#f7f7ff", backgroundColor: "#00A6FB", rounding: 15 },
            ]}
            parentBackgroundColor="#050505"
            cardRounding={36}
            fontSizes={{
                title: "1.8rem",
                description: "1rem",
                tags: "0.85rem",
                price: "1.12rem",
            }}
            margins={{
                title: "0 0 7px 0",
                description: "0 0 18px 0",
                tags: "10px 0 0 0",
            }}
            buttonIcon={<IconCornerRightUp />}
            buttonIconSize={32}
            buttonIconColor="#ffffff"
            buttonIconHoverColor="#EEEEEE"
            buttonBackgroundColor="#00A6FB"
            buttonBackgroundHoverColor="#0582CA"
            maxWidth="330px"
            imageHoverZoom={1.61}
            price="₪599"
            priceTagTextColor="#f7f7ff"
            oldPrice="₪991"
            oldPriceOnTheRight={true}
            priceTagRounding="25px"
            mirrored={true}
            tagsAlignment="right"
            titleAlignment="center"
            descriptionAlignment="right"
        />
    </div>
}

// Note: The InflectedCard component accepts the following props:
// - id: string (required) - Unique identifier for the card.
// - image: string (required) - Source URL for the card image.
// - title: string (required) - Title or name of the product.
// - description: string (required) - Detailed description of the product.
// - tags: Tag[] (required) - Array of tag objects for the product.
// - parentBackgroundColor: string (required) - Background color of the parent container.
// - onClick: (hoverTarget: string, id: string) => void (optional) - Callback function for click events.
// - onHover: (hoverTarget: string, id: string) => void (optional) - Callback function for hover events.
// - cardRounding: number (optional) - Border radius of the card (default: 20).
// - fontSizes: object (optional) - Font sizes for title, description, tags, and price.
// - margins: object (optional) - Margin settings for title, description, and tags.
// - buttonIcon: React.ReactElement (required) - Icon element for the button.
// - buttonIconSize: number (optional) - Size of the button icon (default: 24).
// - buttonIconColor: string (optional) - Color of the button icon (default: '#fff').
// - buttonIconHoverColor: string (optional) - Color of the button icon on hover (default: '#fff').
// - buttonBackgroundColor: string (optional) - Background color of the button (default: '#282828').
// - buttonBackgroundHoverColor: string (optional) - Background color of the button on hover (default: '#484848').
// - imageHoverZoom: number (optional) - Zoom factor for the image on hover (default: 1.1).
// - titleColor: string (optional) - Color of the title text (default: '#f7f7ff').
// - descriptionColor: string (optional) - Color of the description text (default: '#c7c7cf').
// - mirrored: boolean (optional) - Flag to mirror the card layout (default: false).
// - titleAlignment: 'left' | 'center' | 'right' (optional) - Alignment of the title (default: 'left').
// - descriptionAlignment: 'left' | 'center' | 'right' (optional) - Alignment of the description (default: 'left').
// - tagsAlignment: 'left' | 'center' | 'right' (optional) - Alignment of the tags (default: 'left').
// - maxWidth: string (optional) - Maximum width of the card (default: '100%').
// - price: string (optional) - Price of the product.
// - priceTagTextColor: string (optional) - Text color of the price tag (default: '#ffffff').
// - oldPrice: string (optional) - Old price of the product (if applicable).
// - oldPriceOnTheRight: boolean (optional) - Flag to position old price on the right (default: false).
// - oldPriceTextColor: string (optional) - Text color of the old price (default: '#c1c1c7').
// - priceTagRounding: string (optional) - Border radius of the price tag (default: '5px').
// - priceTagBackgroundColor: string (optional) - Background color of the price tag (default: 'rgba(0,0,0,0.7)').
```

## Source

### `components/ui/inflected-card/component.tsx`

```tsx
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './inflected-card.module.css';

// Credit:
// https://namer-ui.netlify.app/components

// NECESSARY CSS
/*
.card {
    position: relative;
    border-radius: var(--card-rounding);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .cardInner {
    position: relative;
    width: 100%;
    height: 18.75rem;
    background: var(--parent-bg);
    border-radius: var(--card-rounding);
    border-bottom-right-radius: 0;
    overflow: hidden;
  }
  
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .imgBox {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .imgBox img {
    transition: transform 0.3s ease;
  }
  
  .imgBox img.hovered {
    transform: scale(var(--image-hover-zoom, 1.1));
  }  
  
  .icon {
    position: absolute;
    bottom: -0.375rem;
    right: -0.375rem;
    width: 6rem;
    height: 6rem;
    background: var(--parent-bg);
    border-top-left-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .icon:hover .iconBox {
    transform: scale(1.1);
    cursor: pointer;
  }
  
  .icon::before {
    position: absolute;
    content: "";
    bottom: 0.375rem;
    left: -1.25rem;
    background: transparent;
    width: 1.25rem;
    height: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
  }
  
  .icon::after {
    position: absolute;
    content: "";
    top: -1.25rem;
    right: 0.375rem;
    background: transparent;
    width: 1.25rem;
    height: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
  }
  
  .iconBox {
    position: absolute;
    inset: 0.625rem;
    background: var(--button-bg);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .iconBox:hover {
    background: var(--button-hover-bg);
  }
  
  .iconBox span {
    color: var(--icon-color);
    font-size: var(--icon-size);
    transition: color 0.3s ease;
  }
  
  .iconBox:hover span {
    color: var(--icon-hover-color);
  }
  
  .content {
    padding: 0.938rem 0.625rem;
  }
  
  .content h3 {
    transition: color 0.3s ease;
  }
  
  .content p {
    transition: color 0.3s ease;
  }
  
  .content ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.625rem;
  }
  
  .content ul li {
    background: var(--tag-bg);
    color: var(--tag-color);
    font-weight: 700;
    padding: 0.375rem 0.625rem;
    border-radius: var(--tag-rounding);
    transition: all 0.3s ease;
  }
  
  .content ul li:hover {
    opacity: 0.8;
  }
*/

interface Tag {
    name: string;
    textColor: string;
    backgroundColor: string;
    rounding?: number;
    alignment?: 'left' | 'center' | 'right';
}

interface InflectedCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    tags: Tag[];
    parentBackgroundColor: string;
    onClick?: (hoverTarget: string, id: string) => void;
    onHover?: (hoverTarget: string, id: string) => void;
    cardRounding?: number;
    fontSizes?: {
        title?: string;
        description?: string;
        tags?: string;
        price?: string;
    };
    margins?: {
        title?: string;
        description?: string;
        tags?: string;
    };
    buttonIcon: React.ReactElement;
    buttonIconSize?: number;
    buttonIconColor?: string;
    buttonIconHoverColor?: string;
    buttonBackgroundColor?: string;
    buttonBackgroundHoverColor?: string;
    imageHoverZoom?: number;
    titleColor?: string;
    descriptionColor?: string;
    mirrored?: boolean;
    titleAlignment?: 'left' | 'center' | 'right';
    descriptionAlignment?: 'left' | 'center' | 'right';
    tagsAlignment?: 'left' | 'center' | 'right';
    maxWidth?: string;
    price?: string;
    priceTagTextColor?: string;
    oldPrice?: string;
    oldPriceOnTheRight?: boolean;
    oldPriceTextColor?: string;
    priceTagRounding?: string;
    priceTagBackgroundColor?: string;
}

const InflectedCard: React.FC<InflectedCardProps> = ({
    id,
    image,
    title,
    description,
    tags,
    parentBackgroundColor,
    onClick,
    onHover,
    cardRounding = 20,
    fontSizes = {},
    margins = {},
    buttonIcon,
    buttonIconSize = 24,
    buttonIconColor = '#fff',
    buttonIconHoverColor = '#fff',
    buttonBackgroundColor = '#282828',
    buttonBackgroundHoverColor = '#484848',
    imageHoverZoom = 1.1,
    titleColor = '#f7f7ff',
    descriptionColor = '#c7c7cf',
    mirrored = false,
    titleAlignment = 'left',
    descriptionAlignment = 'left',
    tagsAlignment = 'left',
    maxWidth = '100%',
    price,
    priceTagTextColor = '#ffffff',
    oldPrice,
    oldPriceOnTheRight = false,
    oldPriceTextColor = '#c1c1c7',
    priceTagRounding = '5px',
    priceTagBackgroundColor = 'rgba(0,0,0,0.7)',
}) => {
    const [hoveredElement, setHoveredElement] = useState<string | null>(null);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isCardHovered, setIsCardHovered] = useState(false);

    const handleCardMouseEnter = () => {
        setIsCardHovered(true);
        onHover && onHover('card', id);
    };

    const handleCardMouseLeave = () => {
        setIsCardHovered(false);
    };

    const handleMouseEnter = (element: string) => {
        setHoveredElement(element);
        onHover && onHover(element, id);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onClick && onClick(hoveredElement || 'card', id);
    };

    const handleButtonMouseEnter = () => {
        setIsButtonHovered(true);
        handleMouseEnter('button');
    };

    const handleButtonMouseLeave = () => {
        setIsButtonHovered(false);
    };

    const isRTLCheck = (text: string): boolean => {
        return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text); // Hebrew, Arabic, and Persian ranges in Unicode
    };

    const mirroredStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};
    const reverseMirrorStyle: React.CSSProperties = mirrored ? { transform: 'scaleX(-1)' } : {};

    return (
        <div
            className={styles.card}
            style={{
                '--card-rounding': `${cardRounding}px`,
                maxWidth: maxWidth,
                ...mirroredStyle
            } as React.CSSProperties}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            onClick={handleClick}
        >
            <div
                className={styles.cardInner}
                style={{ '--parent-bg': parentBackgroundColor } as React.CSSProperties}
            >
                <div className={styles.box}>
                    <div
                        className={styles.imgBox}
                        style={{
                            '--image-hover-zoom': imageHoverZoom,
                            ...reverseMirrorStyle
                        } as React.CSSProperties}
                    >
                        <Image
                            src={image}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            className={isCardHovered ? styles.hovered : ''}
                        />
                        {price && (
                            <div className={styles.priceTag}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    [mirrored ? 'right' : 'left']: '12px',
                                    backgroundColor: priceTagBackgroundColor,
                                    color: priceTagTextColor,
                                    padding: '9px 15px',
                                    borderRadius: priceTagRounding,
                                    fontSize: fontSizes.price || '1rem',
                                }}
                                onMouseEnter={() => handleMouseEnter('priceTag')}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClick && onClick('priceTag', id);
                                }}
                            >
                                {oldPriceOnTheRight ? (
                                    <>
                                        <span className={styles['new-price']} style={{ fontWeight: 'bold' }}>{price}</span>
                                        {oldPrice && <span className={styles['old-price']} style={{ marginLeft: '8px', textDecoration: 'line-through', opacity: 0.7, fontWeight: 'bold', color: oldPriceTextColor }}>{oldPrice}</span>}
                                    </>
                                ) : (
                                    <>
                                        {oldPrice && <span className={styles['old-price']} style={{ textDecoration: 'line-through', opacity: 0.7, marginRight: '8px', fontWeight: 'bold', color: oldPriceTextColor }}>{oldPrice}</span>}
                                        <span className={styles['new-price']} style={{ fontWeight: 'bold' }}>{price}</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.icon}
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                    >
                        <a className={styles.iconBox}
                            style={{
                                '--button-bg': buttonBackgroundColor,
                                '--button-hover-bg': buttonBackgroundHoverColor,
                                '--icon-color': buttonIconColor,
                                '--icon-hover-color': buttonIconHoverColor,
                                '--icon-size': `${buttonIconSize}px`,
                            } as React.CSSProperties}
                        >
                            {React.cloneElement(buttonIcon, {
                                size: buttonIconSize,
                                color: isButtonHovered ? buttonIconHoverColor : buttonIconColor
                            })}
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <h3
                    style={{
                        fontSize: fontSizes.title,
                        color: titleColor,
                        margin: margins.title,
                        fontWeight: 'bold',
                        direction: isRTLCheck(title) ? 'rtl' : 'ltr',
                        textAlign: titleAlignment,
                        ...reverseMirrorStyle
                    }}
                    onMouseEnter={() => handleMouseEnter('title')}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: fontSizes.description,
                        color: descriptionColor,
                        margin: margins.description,
                        direction: isRTLCheck(description) ? 'rtl' : 'ltr',
                        textAlign: descriptionAlignment,
                        ...reverseMirrorStyle
                    }}
                    onMouseEnter={() => handleMouseEnter('description')}
                >
                    {description}
                </p>
                <ul style={{
                    margin: margins.tags,
                    display: 'flex',
                    justifyContent: tagsAlignment,
                    flexWrap: 'wrap',
                    gap: '0.625rem',
                    ...reverseMirrorStyle
                }}>
                    {tags.map((tag, index) => (
                        <li
                            key={index}
                            style={{
                                '--tag-bg': tag.backgroundColor,
                                '--tag-color': tag.textColor,
                                '--tag-rounding': `${tag.rounding}px`,
                                fontSize: fontSizes.tags,
                                direction: isRTLCheck(tag.name) ? 'rtl' : 'ltr',
                                textAlign: tag.alignment || 'left',
                                display: 'inline-block',
                            } as React.CSSProperties}
                            onMouseEnter={() => handleMouseEnter(`tag-${tag.name}`)}
                        >
                            {tag.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InflectedCard;
```

### `components/ui/inflected-card/inflected-card.module.css`

```css
.card {
  position: relative;
  border-radius: var(--card-rounding);
  overflow: hidden;
  transition: all 0.3s ease;
}

.cardInner {
  position: relative;
  width: 100%;
  height: 18.75rem;
  background: var(--parent-bg);
  border-radius: var(--card-rounding);
  border-bottom-right-radius: 0;
  overflow: hidden;
}

.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.imgBox {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.imgBox img {
  transition: transform 0.3s ease;
}

.imgBox img.hovered {
  transform: scale(var(--image-hover-zoom, 1.1));
}

/* Hooks for optional styling; visual styles are mostly inline in the component */
.priceTag {
}

.new-price {
}

.old-price {
}

.icon {
  position: absolute;
  bottom: -0.375rem;
  right: -0.375rem;
  width: 6rem;
  height: 6rem;
  background: var(--parent-bg);
  border-top-left-radius: 50%;
  transition: all 0.3s ease;
}

.icon:hover .iconBox {
  transform: scale(1.1);
  cursor: pointer;
}

.icon::before {
  position: absolute;
  content: "";
  bottom: 0.375rem;
  left: -1.25rem;
  background: transparent;
  width: 1.25rem;
  height: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
}

.icon::after {
  position: absolute;
  content: "";
  top: -1.25rem;
  right: 0.375rem;
  background: transparent;
  width: 1.25rem;
  height: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  box-shadow: 0.313rem 0.313rem 0 0.313rem var(--parent-bg);
}

.iconBox {
  position: absolute;
  inset: 0.625rem;
  background: var(--button-bg);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.iconBox:hover {
  background: var(--button-hover-bg);
}

.iconBox span {
  color: var(--icon-color);
  font-size: var(--icon-size);
  transition: color 0.3s ease;
}

.iconBox:hover span {
  color: var(--icon-hover-color);
}

.content {
  padding: 0.938rem 0.625rem;
}

.content h3 {
  transition: color 0.3s ease;
}

.content p {
  transition: color 0.3s ease;
}

.content ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.content ul li {
  background: var(--tag-bg);
  color: var(--tag-color);
  font-weight: 700;
  padding: 0.375rem 0.625rem;
  border-radius: var(--tag-rounding);
  transition: all 0.3s ease;
}

.content ul li:hover {
  opacity: 0.8;
}
```

## Attribution

Source: Namer UI · Original: https://namer-ui.netlify.app/components

Adapted from the original. Credit the original author when you ship this.
