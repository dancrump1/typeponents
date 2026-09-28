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