const HeadLabel = ({ display, id }) => {
    return (
        <div className="text-center ">
            <h4 className="font-semibold  md:text-2xl">{display}</h4>
            <p className="md:text-sm text-xs">
                <span>Sale ID: </span>
                <span className="font-medium">#{id}</span>
            </p>
        </div>
    );
};

export default HeadLabel;
