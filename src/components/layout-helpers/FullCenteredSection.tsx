type Props = { children: React.ReactNode };

const FullCenteredSection: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col h-[calc(100%-92px)] justify-center items-center">
            {children}
        </div>
    );
};

export default FullCenteredSection;
