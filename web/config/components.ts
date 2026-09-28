export function getCategory(slug: string): ComponentCategory | undefined {
	return simpleCategories.find((category) => category.slug === slug) || animatedCategories.find((category) => category.slug === slug);
}

export interface ComponentCategory {
	slug: string;
	name: string;
	components: { name: string }[];
}

export const simpleCategories: ComponentCategory[] = [
	{
		slug: "accordion",
		name: "Accordion",
		components: [

		],
	},
	{
		slug: "alert",
		name: "Alert",
		components: [

		],
	},
	{
		slug: "avatar",
		name: "Avatar",
		components: [

		],
	},
	{
		slug: "badge",
		name: "Badge",
		components: [

		],
	},
	{
		slug: "banner",
		name: "Banner",
		components: [

		],
	},
	{
		slug: "breadcrumb",
		name: "Breadcrumb",
		components: [

		],
	},
	{
		slug: "button",
		name: "Button",
		components: [

		],
	},
	{
		slug: "calendar-date-picker",
		name: "Calendar & Date picker",
		components: [

		],
	},
	{
		slug: "checkbox",
		name: "Checkbox",
		components: [

		],
	},
	{
		slug: "image-cropper",
		name: "Image Cropper",
		components: [

		],
	},
	{
		slug: "dialog",
		name: "Dialog",
		components: [

		],
	},
	{
		slug: "dropdown",
		name: "Dropdown",
		components: [

		],
	},
	{
		slug: "file-upload",
		name: "File upload",
		components: [

		],
	},
	{
		slug: "event-calendar",
		name: "Event calendar",
		components: [],
	},
	{
		slug: "input",
		name: "Input",
		components: [

		],
	},
	{
		slug: "navbar",
		name: "Navbar",
		components: [

		],
	},
	{
		slug: "notification",
		name: "Notification",
		components: [

		],
	},
	{
		slug: "pagination",
		name: "Pagination",
		components: [

		],
	},
	{
		slug: "popover",
		name: "Popover",
		components: [

		],
	},
	{
		slug: "radio",
		name: "Radio",
		components: [

		],
	},
	{
		slug: "select",
		name: "Select",
		components: [

		],
	},
	{
		slug: "slider",
		name: "Slider",
		components: [

		],
	},
	{
		slug: "stepper",
		name: "Stepper",
		components: [

		],
	},
	{
		slug: "switch",
		name: "Switch",
		components: [

		],
	},
	{
		slug: "table",
		name: "Table",
		components: [

		],
	},
	{
		slug: "tabs",
		name: "Tabs",
		components: [

		],
	},
	{
		slug: "textarea",
		name: "Textarea",
		components: [

		],
	},
	{
		slug: "timeline",
		name: "Timeline",
		components: [

		],
	},
	{
		slug: "tooltip",
		name: "Tooltip",
		components: [

		],
	},
	{
		slug: "tree",
		name: "Tree",
		components: [

		],
	},
];

export const animatedCategories = [
	{
		slug: "backgrounds-effects",
		name: "Backgrounds & Effects",
		components: [
			{ name: "aurora-background" },
			{ name: "background-beams" },
			{ name: "background-boxes" },
			{ name: "background-gradient" },
			
			{ name: "ballpit" },
			{ name: "blur-vignette" },
			{ name: "bottom-blur" },
			{ name: "circuit-board" },
			
			{ name: "dither" },
			{ name: "dot-background" },
			{ name: "fractal-grid" },
			{ name: "fuzzy-overlay" },
			{ name: "glowing-background" },
			{ name: "gradient-background" },
			{ name: "gradient-blinds" },
			{ name: "grainient" },
			{ name: "laser-flow" },
			{ name: "light-pillar" },
			{ name: "light-rays" },
			{ name: "line-background" },
			{ name: "matrix-background" },
			{ name: "meteors" },
			{ name: "particle-background" },
			{ name: "pixel-snow" },
			{ name: "progressive-blur" },
			{ name: "shape-blur" },
			
			{ name: "sparkles" },
			{ name: "spotlight" },
			{ name: "starfield-wrapper" },
			{ name: "tiles-background" },
			{ name: "trippy" },
			
		],
	},
	{
		slug: "cards",
		name: "Cards",
		components: [
			{ name: "3d-card" },
			{ name: "animated-hover-card" },
			{ name: "card-deck" },
			{ name: "card-hover" },
			{ name: "card-rotation" },
			{ name: "card-stack" },
			{ name: "card-swap" },
			
			{ name: "color-change-cards" },
			{ name: "flip-card" },
			{ name: "focus-cards" },
			{ name: "hover-card" },
			{ name: "hover-cards" },
			{ name: "info-card" },
			
			{ name: "magic-bento" },
			{ name: "scrollable-card-stack" },
			{ name: "stacking-cards" },
			{ name: "wobble-card" },
			{ name: "zoom-blur-card" },
		],
	},
	{
		slug: "carousels-sliders",
		name: "Carousels & Sliders",
		components: [
			{ name: "award-carousel" },
			{ name: "box-carousel" },
			{ name: "carousel-circle" },
			{ name: "carousel-stack" },
			{ name: "cursor-carousel" },
			{ name: "infinite-carousel" },
			{ name: "infinite-moving-cards" },
			{ name: "logo-carousel" },
			{ name: "parallax-carousel" },
			{ name: "progress-carousel" },
			{ name: "smooth-slider" },
			{ name: "stacked-carousel" },
		],
	},
	{
		slug: "navigation",
		name: "Navigation",
		components: [
			{ name: "3d-nav-bar" },
			{ name: "curved-navbar" },
			{ name: "floating-dock" },
			{ name: "floating-nav" },
			{ name: "flowing-nav" },
			{ name: "glass-nav" },

			{ name: "scroll-island" },
			
		],
	},
	{
		slug: "menus",
		name: "Menus",
		components: [
			{ name: "bubble-menu" },
			{ name: "flipped-menu" },
			{ name: "flower-menu" },
			{ name: "infinite-menu" },
		],
	},
	{
		slug: "text-typography",
		name: "Text & Typography",
		components: [
			{ name: "bubble-text" },
			{ name: "circle-text" },
			{ name: "colorful-text" },
			{ name: "falling-text" },
			{ name: "flipping-text" },
			{ name: "fuzzy-text" },
			{ name: "gif-text" },
			
			{ name: "letter-hover" },
			{ name: "letter3d-swap" },
			{ name: "number-ticker" },
			{ name: "random-letter-swap-hover" },
			{ name: "scroll-reveal-paragraph" },
			{ name: "sliding-numbers" },
			{ name: "text-along-path" },
			{ name: "text-animate" },
			{ name: "text-cursor" },
			{ name: "text-curve" },
			{ name: "text-enhanced" },
			{ name: "text-focus" },
			{ name: "text-gradient" },
			{ name: "text-highlighter" },
			{ name: "text-hover" },
			{ name: "text-morph" },
			
			{ name: "text-proximity" },
			{ name: "text-reveal" },
			{ name: "text-roll" },
			{ name: "text-rotate" },
			{ name: "text-split" },
			{ name: "text-trail" },
			{ name: "text-type" },
			{ name: "text-underline" },
			{ name: "underline-to-background" },
			{ name: "word-tornado" },
		],
	},
	{
		slug: "scroll-parallax",
		name: "Scroll & Parallax",
		components: [
			{ name: "container-scroll" },
			{ name: "hero-parallax" },
			{ name: "horizontal-scroll-gallery" },
			{ name: "opposite-scroll" },
			{ name: "opposite-scroll-links" },
			{ name: "parallax-floating" },
			{ name: "parallax-scroll" },
			{ name: "scroll-float" },
			{ name: "scroll-horizontal" },
			{ name: "scroll-horizontal-2" },
			{ name: "scroll-reveal" },
			{ name: "scroll-velocity" },
			{ name: "sticky-scroll-reveal" },
		],
	},
	{
		slug: "accordions-tabs",
		name: "Accordions & Tabs",
		components: [
			{ name: "accordion-slices" },
			{ name: "animated-accordion" },
			{ name: "circle-accordion" },
			{ name: "expanding-tabs" },
			{ name: "gooey-tabs" },
			{ name: "slice-accordion" },
			{ name: "spring-faq" },
			{ name: "stripe-accordion" },
			{ name: "tabs" },
			{ name: "tabs-transition-panel" },
		],
	},
	{
		slug: "buttons",
		name: "Buttons",
		components: [
			{ name: "btn08" },
			{ name: "button-text-slide" },
			
			{ name: "fold-hover-button" },
			{ name: "galaxy-button" },

			{ name: "scaling-button" },
			{ name: "share-button" },
			{ name: "slide-button" },
			{ name: "video-button" },
		],
	},
	{
		slug: "loaders-spinners",
		name: "Loaders & Spinners",
		components: [
			
			{ name: "dual-ring-loader" },
			
			{ name: "preloader" },

			{ name: "stripes-preloader" },

		],
	},
	{
		slug: "galleries-images",
		name: "Galleries & Images",
		components: [
			{ name: "ascii-converter" },
			{ name: "diamond-gallery" },
			{ name: "dome-gallery" },
			{ name: "film-reel" },
			{ name: "fullscreen-image" },
			{ name: "hover-gallery" },
			{ name: "image-reveal" },
			{ name: "image-ripple" },
			{ name: "image-wheel" },
			{ name: "image-zoom" },

			{ name: "pixel-image" },
		],
	},
	{
		slug: "cursors-pointers",
		name: "Cursors & Pointers",
		components: [
			{ name: "attractor" },
			{ name: "cursor-follow" },
			{ name: "cursor-mask" },
			{ name: "follow-cursor" },
			{ name: "following-eyes" },
			{ name: "following-pointer" },
			{ name: "mouse-image-trail" },
			{ name: "pointer" },
			{ name: "smokey-cursor" },
			{ name: "smooth-cursor" },
			{ name: "target-cursor" },
		],
	},
	{
		slug: "hero-landing",
		name: "Hero & Landing Sections",
		components: [
			{ name: "bento" },
			{ name: "canvas-reveal" },
			{ name: "chroma-grid" },
			{ name: "cielia-replication" },
			{ name: "content-with-image" },
			
			{ name: "grid-content" },
			{ name: "hero-highlight" },
			{ name: "horizontal-cta" },
			
			{ name: "shuffle-hero" },
			{ name: "swap-column-features" },
		],
	},
	{
		slug: "forms-inputs",
		name: "Forms & Inputs",
		components: [
			{ name: "action-search-bar" },
			{ name: "checkbox-animated" },
			{ name: "color-picker" },
			
			{ name: "fancy-input" },
			{ name: "gradient-checkbox" },
			{ name: "input-animated" },
			{ name: "searchbar" },
		],
	},
	{
		slug: "dialogs-modals",
		name: "Dialogs & Modals",
		components: [
			{ name: "dialog-stack" },
			{ name: "family-drawer" },
			{ name: "linear-dialog" },
			{ name: "rich-popover" },
			{ name: "select-modal" },
			{ name: "spring-modal" },
		],
	},
	{
		slug: "footers",
		name: "Footers",
		components: [
			{ name: "business-footer" },
			{ name: "hover-footer" },
			{ name: "simple-footer" },
		],
	},
	{
		slug: "pricing-commerce",
		name: "Pricing & Commerce",
		components: [
			{ name: "popular-price-card" },
			{ name: "price-card" },
			{ name: "pricing-table" },
		],
	},
	{
		slug: "testimonials",
		name: "Testimonials & Social Proof",
		components: [
			{ name: "book-testimonials" },
			{ name: "gradient-testimonials" },
			{ name: "testimonial-grid" },
			{ name: "typewriter-testimonials" },
		],
	},
	{
		slug: "video",
		name: "Video",
		components: [
			
			{ name: "video-hero" },
			{ name: "video-player" },
			
			{ name: "video-viewer" },
		],
	},
	{
		slug: "animation-physics",
		name: "Animation & Physics",
		components: [
			{ name: "elastic-line" },
			{ name: "fluid-glass" },
			{ name: "fluid-morph" },
			{ name: "gravity" },
			{ name: "lanyard" },
			{ name: "magnet-lines" },
			
			{ name: "prismatic-burst" },
			{ name: "spring-element" },
			
		],
	},
	{
		slug: "layout-structure",
		name: "Layout & Structure",
		components: [
			{ name: "animated-list" },
			{ name: "css-box" },
			{ name: "expandable-screen" },
			{ name: "faq-section" },
			{ name: "following-headers" },

			{ name: "layout-grid" },
			{ name: "list-rotator" },
			{ name: "page-transitions" },
			{ name: "peel-reveal" },
			{ name: "pin" },
			{ name: "pipeline" },
			{ name: "simple-grid" },
			{ name: "sticker-peel" },
			{ name: "table" },
			{ name: "timeline" },
			{ name: "tour" },
			{ name: "tracing-beam" },
			{ name: "vertical-cut-reveal" },
			
		],
	},
	{
		slug: "ui-widgets-utilities",
		name: "UI Widgets & Utilities",
		components: [
			{ name: "browser-window" },
			
			{ name: "codeblock3" },
			{ name: "compare" },
			{ name: "cubes" },
			{ name: "dynamic-island" },
			{ name: "dynamic-theme" },
			{ name: "electric-border" },
			{ name: "faulty-terminal" },
			{ name: "folder" },
			
			{ name: "galaxy" },
			{ name: "game-237" },
			{ name: "ghost-label" },
			{ name: "ghost-svg" },
			{ name: "globe" },
			{ name: "glowing-effect" },
			{ name: "hover" },
			{ name: "hover-border" },
			{ name: "hover-squares" },
			{ name: "icons" },
			{ name: "inner-glow" },
			{ name: "ksier" },
			{ name: "lamp" },
			{ name: "lens" },
			{ name: "link-preview" },
			{ name: "logo-loop" },
			{ name: "logo-particles" },
			{ name: "macbook" },
			{ name: "marquee-along-svg" },
			{ name: "mask-effect" },
			{ name: "media-between-text" },
			{ name: "model-viewer" },

			{ name: "screen-saver" },
			{ name: "services" },
			{ name: "social-links" },
			
			{ name: "theme-animations" },
			{ name: "tool-tip" },
		],
	},
]