import { ShowcaseCard } from "./component"

export default function Example() {
    return <ShowcaseCard
        tagline="Work fast. Live slow."
        heading="Create your digital reality."
        description="From nothing to everything, let's bring your vision to life."
        imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        ctaText="Send a message"
        onCtaClick={() => console.log("CTA clicked")}
        brandName="studio.design"
        services={["web", "product", "brand"]}
    />
}