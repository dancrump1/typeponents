import CurvedInput from "./component";

export default function CurvedInputUsage() {
    return (
        <>

            <CurvedInput

                placeholder="david@reactbits.dev"
                buttonText="Get Started"
                theme="dark"
                bend={28}
                height={64}
                width={450}
                onSubmit={value => console.log(value)}
            />

            <CurvedInput
                showButton
                showIcon
                placeholder="Search components..."
                type="text"
                cornerRadius={18}
                borderWidth={1.5}
                fontSize={16}
                backgroundColor="#1B1722"
                textColor="#f5f5f5"
                borderColor="#392e4e"
                buttonColor="#A855F7"
                buttonTextColor="#ffffff"
                shadowSize="md"
            />
        </>
    );
}