"use client";

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div
            className="
            max-w-[1200px]
            mx-auto
            xl:px-20
            md:px-10
            sm:px-2
            px-4
            mt-20
            min-h-screen
            h-auto
        "
        >
            {children}
        </div>
    )
}

export default Container